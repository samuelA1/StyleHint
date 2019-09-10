import { AuthService } from './../_services/auth.service';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { FriendService } from './../_services/friend.service';
import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import * as moment from 'moment';
import { NotificationService } from '../_services/notification.service';


@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {
  page: number = 1;
  query: string = '';
  socket: any;
  content: any[];  
  friends: any[];
  unFilteredFriends: any[];
  search: any = '';
  searched:boolean = false;
  modal: any = false;
  notifications: any;
  viewFriendRequests: boolean = false; //toggles view friend request

  constructor(private friendsService: FriendService,
    private notificationService: NotificationService,
    private friendService: FriendService,
    public authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController) { 
      this.getFriends();
      this.socket = io('http://www.thestylehint.com');
      this.getFriendRequests();
    }

  ngOnInit() {
    this.socket.on('friendDeleted', ownerId => {
      this.getFriends();
    });
    this.socket.on('requestAccepted', ownerId => {
      this.getFriends();
    });
    this.socket.on('friendRequested', friend => {
      if (friend === this.authService.userId) {
        this.getFriendRequests();
      }
    });
  }

  cancel() {
    this.query = ''
    // this.searched = true;
    this.modal = !this.modal;
  }

  navigateBack() {
    this.navCtrl.back();
  }

  GetPostTime(time) {
    return moment(time).fromNow();
  }

  //toggles view friend request
  viewRequests() {
    this.viewFriendRequests = !this.viewFriendRequests;
  }

  //for new friends
  async searchAddFriend() {
    try {
      if (this.query !== '') {
        const data = await this.friendsService.search(this.query, this.page-1);
        if (data['success']) {
            this.content = []
            data['content'].hits.forEach(user => {
            if (this.friends.some(friend => friend._id === user.objectID)) {
              this.content.push({isFriend: true, username: user.username, objectID: user.objectID, sent: false})
            } else {
              this.content.push({isFriend: false, username: user.username, objectID: user.objectID, sent: false})
            }
          });
        } else {
          this.presentAlert('Sorry, an error occured while searching for a user.');
        }
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while searching for a user.')
    }
  }

    //search friends
    searchFriends() {
      this.searched = true;
      this.friends = (this.search) ?  this.friends.filter(u => u.username.toLowerCase()
      .includes(this.search.toLowerCase()) ) : this.unFilteredFriends;
    }

  //get friends
  async getFriends() {
    try {
      const friendsInfo = await this.friendsService.getFriends();
      if (friendsInfo['success']) {
        this.friends = friendsInfo['friends'];
        this.unFilteredFriends = friendsInfo['friends'];
      } else {
        this.presentAlert('Sorry, an error occured while trying to get your friends.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to get your friends.')
    }
  }

  //get friend requests
  async getFriendRequests() {
    try {
      const notificationInfo = await this.notificationService.getFriendRequests();
      if (notificationInfo['success']) {
        this.notifications = notificationInfo['notifications'];
      } else {
        this.presentAlert('Sorry, an error occured while getting your friend requests');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting your friend requests');
    }
  }

  async acceptRequest(notifyId: any, friendId: any) {
    try {
      const acceptInfo = await this.friendService.acceptRequest(friendId);
      if (acceptInfo['success']) {
        const notifyInfo = await this.friendService.deleteFriendNotification(notifyId);
        if (notifyInfo['success']) {
          this.presentToast(acceptInfo['message'], 'dark');
          this.socket.emit('acceptRequest', friendId);
          this.notifications.splice(this.notifications.findIndex(t => t._id === notifyId), 1)
        } else {
          this.presentAlert('Sorry, an error occured while accepting a request');
        }
  
      } else {
        this.presentAlert('Sorry, an error occured while accepting a request');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while accepting a request');
    }
  }
  
  async denyRequest(notifyId: any) {
    try {
      const notifyInfo = await this.friendService.deleteFriendNotification(notifyId);
      if (notifyInfo['success']) {
        this.presentToast('friend request denied', 'danger');
        this.socket.emit('acceptRequest', {});
        this.notifications.splice(this.notifications.findIndex(t => t._id === notifyId), 1)
      } else {
        this.presentAlert('Sorry, an error occured while denying a request');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while denying a request');
    }
  }

  //send friend request
  async friendRequest(friendId: any) {
    try {
      const requestInfo = await this.friendsService.friendRequest(friendId);
      if (requestInfo['success']) {
        this.presentToast(requestInfo['message'], 'dark');
        this.socket.emit('friendRequest', friendId);
        this.content.map(user => {
          user.sent =  user.objectID === friendId ? true : user.sent
        });
      } else {
        this.presentAlert('Sorry, an error occured while sending a friend request. Please try again')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while sending a friend request. Please try again')
    }
  }

  //get friends
  async removeFriend(friendId: any) {
    try {
      const friendInfo = await this.friendsService.removeFriend(friendId);
      if (friendInfo['success']) {
        this.presentToast(friendInfo['message'], 'danger');
        this.socket.emit('deleteFriend', {});
      } else {
        this.presentAlert('Sorry, an error occured while trying to remove a friend.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to remove a friend.')
    }
  }

  async deleteFriend(friendId: any, username: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm friend delete',
      message: `Are you sure you want to remove ${username} as a friend?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'remove',
          cssClass: 'delete',
          handler: () => {
            this.removeFriend(friendId);
          }
        }
      ]
    });

    await alert.present();
  }

  //alertCtrl
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Friend Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  //toast
  async presentToast(message, color) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: color,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }


  doRefresh(event){
    setTimeout(() => {
      this.getFriends();
      event.target.complete();
    }, 1000);
  }
}