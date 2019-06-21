import { AuthService } from './../_services/auth.service';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { FriendService } from './../_services/friend.service';
import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';


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

  constructor(private friendsService: FriendService,
    public authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController) { 
      this.getFriends();
      this.socket = io('http://www.thestylehint.com');
    }

  ngOnInit() {
    this.socket.on('friendDeleted', ownerId => {
      this.getFriends();
    });
    this.socket.on('requestAccepted', ownerId => {
      this.getFriends();
    });
  }

  cancel() {
    this.query = ''
    this.searched = true;
    this.modal = !this.modal;
  }

  navigateBack() {
    this.navCtrl.back();
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
              this.content.push({isFriend: true, username: user.username, objectID: user.objectID})
            } else {
              this.content.push({isFriend: false, username: user.username, objectID: user.objectID})
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

  //send friend request
  async friendRequest(friendId: any) {
    try {
      const requestInfo = await this.friendsService.friendRequest(friendId);
      if (requestInfo['success']) {
        this.presentToast(requestInfo['message'], 'dark');
        this.socket.emit('friendRequest', friendId);
        this.content.splice(this.content.findIndex(t => t.objectID === friendId), 1)
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


}
