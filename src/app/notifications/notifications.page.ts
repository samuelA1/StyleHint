import { TipService } from './../_services/tip.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { NotificationService } from '../_services/notification.service';
import * as moment from 'moment';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  page: number = 1;
  notifications: any[];
  totalNotifications: any;

  constructor(private navCtrl: NavController,
    private notificationService: NotificationService,
    private tipService: TipService,
    private alertCtrl: AlertController) { 
      this.getNotifications();
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

  navigateBack() {
    this.navCtrl.navigateBack('home');
  }

  GetPostTime(time) {
    return moment(time).fromNow();
  }

  toTip(tipId: any) {
    this.tipService.tipToView = tipId;
    this.navCtrl.navigateForward('tip');
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
