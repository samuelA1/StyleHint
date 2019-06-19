import { HintsService } from './../_services/hints.service';
import { TipService } from './../_services/tip.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import * as moment from 'moment';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.page.html',
  styleUrls: ['./tip.page.scss'],
})
export class TipPage implements OnInit {
tip: any;
modal: any = false;
comment: any;
  constructor(public tipService: TipService,
    private hintService: HintsService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) { 
      this.getTip();
    }

  ngOnInit() {
  }

  viewHint(id: any) {
    this.hintService.id = id;
    this.navCtrl.navigateForward('reference');
  }

  navigateBack() {
    this.navCtrl.navigateBack('tips');
  }

  GetPostTime(time) {
    return moment(time).fromNow();
  }

  sharedWith () {
    this.modal = !this.modal;
  }

  async getTip() {
    try {
      const tipInfo = await this.tipService.getTip();
      console.log(tipInfo)
      if (tipInfo['success']) {
        this.tip = tipInfo['tip'];
      } else {
        this.presentAlert('Sorry, an error occured while getting tip.');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting tip.');
    }
  }

  async deleteTip(tipId: any) {
    try {
      const deleteInfo = await this.tipService.deleteTip(tipId);
      if (deleteInfo['success']) {
        this.presentToast(deleteInfo['message'])
      } else {
        this.presentAlert('Sorry, an error occured while trying to delete a tip.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to delete a tip.')
    }
  }

   //alertCtrl
   async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Tip Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async confirmDelete() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Are you sure you want to remove this tip?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Okay',
          cssClass: 'danger',
          handler: () => {
            this.deleteTip(this.tip._id).then(() => {
              this.navCtrl.back();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  //toast
  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
