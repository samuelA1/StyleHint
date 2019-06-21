import { TipService } from './../_services/tip.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import * as moment from 'moment';
import * as _ from 'lodash';


@Component({
  selector: 'app-tips',
  templateUrl: './tips.page.html',
  styleUrls: ['./tips.page.scss'],
})
export class TipsPage implements OnInit {
myTips: any[];
tips: any[];
  constructor(private navCtrl: NavController,
    private tipService: TipService,
    private alertCtrl: AlertController) { 
      this.getAllTips();
    }

  navigateBack() {
    this.navCtrl.navigateBack('home');
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

  GetPostTime(time) {
    return moment(time).fromNow();
  }

  toTip(tipId: any, isMyTip: any) {
    this.tipService.isMyTip = isMyTip; 
    this.tipService.tipToView = tipId;
    this.navCtrl.navigateForward('tip');
  }

  async getAllTips() {
    try {
      const tipsInfo = await this.tipService.getTips();
      if (tipsInfo['success']) {
        this.tips =_.orderBy(tipsInfo['allTips'].tips, ['createdAt'],['desc']);
        this.myTips = _.orderBy(tipsInfo['allTips'].myTips, ['createdAt'],['desc']);;
      } else {
        this.presentAlert('Sorry, an error occured while trying to get tips.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to get tips.')
    }
  }

  //alertCtrl
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Tips Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }


  ngOnInit() {
  }

}
