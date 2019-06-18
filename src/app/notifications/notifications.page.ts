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
  page: Number = 1;
  notifications: any[];

  constructor(private navCtrl: NavController,
    private notificationService: NotificationService,
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

  //alertCtrl
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Notification Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
