import { FriendService } from './../_services/friend.service';
import { TipService } from './../_services/tip.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { NotificationService } from '../_services/notification.service';
import * as moment from 'moment';
import * as io from 'socket.io-client';



@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  page: number = 1;
  socket: any;
  notifications: any[];
  totalNotifications: any;

  constructor(private navCtrl: NavController,
    private notificationService: NotificationService,
    private friendService: FriendService,
    private tipService: TipService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) { 
      this.getNotifications();
      this.socket = io('http://www.thestylehint.com');
    }

  ngOnInit() {
  }

async getNotifications() {
  try {
    const notificationInfo = await this.notificationService.getNotifications(this.page);
    if (notificationInfo['success']) {
      this.notifications = notificationInfo['notifications'];
      this.totalNotifications = notificationInfo['totalNotifications'];
    } else {
      this.presentAlert('Sorry, an error occured while getting notifications');
    }
  } catch (error) {
    this.presentAlert('Sorry, an error occured while getting notifications');
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

  navigateBack() {
    this.navCtrl.navigateBack('home');
  }

  GetPostTime(time) {
    return moment(time).fromNow();
  }

  toTip(tipId: any, isMyTip: any) {
    this.tipService.isMyTip = isMyTip; 
    this.tipService.tipToView = tipId;
    this.navCtrl.navigateForward('tip');
  }

   //navigations
   toTips() {
    this.navCtrl.navigateForward('tips');
  }

  toFriends() {
    this.navCtrl.navigateForward('friends');
  }

  toCloset() {
    this.navCtrl.navigateForward('closet');
  }

  //alertCtrl
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Notification Error',
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

  loadData(event: any) {
    this.page++
    setTimeout(() => {
      this.notificationService.getNotifications(this.page).then((notificationsInfo) => {
        notificationsInfo['notifications'].forEach((notification: any) => {
          this.notifications.push(notification)
        });
        event.target.complete();
      });
  
      if (this.notifications.length == this.totalNotifications) {
        event.target.disabled = true;
      }
    }, 800);
  }

}
