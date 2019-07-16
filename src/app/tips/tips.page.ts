import { Storage } from '@ionic/storage';
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
loading: boolean = false;

  constructor(private navCtrl: NavController,
    private tipService: TipService,
    private alertCtrl: AlertController,
    private storage: Storage) { 
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
    this.storage.set('tipId', tipId);
    this.seenBy(tipId);
  }

  async getAllTips() {
    const autoTips = await this.tipService.getAutoTips();
    if (autoTips['success']) {
      autoTips['allTips'].myTips.forEach(tip => {
        this.tipService.autoDelete(tip);
      });
    }
    try {
      const tipsInfo = await this.tipService.getTips();
      if (tipsInfo['success']) {
        this.tips = _.orderBy(tipsInfo['tipsToSee'], ['createdAt'],['desc'])
        this.myTips = _.orderBy(tipsInfo['allTips'].myTips, ['createdAt'],['desc']);
      } else {
        this.presentAlert('Sorry, an error occured while trying to get tips.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to get tips.')
    }
  }

  async seenBy(tipId: any) {
    try {
      const seenInfo = await this.tipService.seenBy(tipId);
      if (seenInfo['success']) {
        this.navCtrl.navigateRoot('tip', {animationDirection: 'forward'});
        this.tipService.backRoute = 'tips'
      } else {
        this.presentAlert('Sorry, an error occured while trying to view a tip.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to view a tip.')
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

  //refresh closet
  doRefresh(event){
    setTimeout(() => {
      this.getAllTips();
      event.target.complete();
    }, 1000);
  }


  ngOnInit() {
  }

}
