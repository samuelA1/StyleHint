import { CustomizeService } from './../_services/customize.service';
import { TitleService } from './../_services/title.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.page.html',
  styleUrls: ['./interest.page.scss'],
})
export class InterestPage implements OnInit {
  constructor(private navCtrl: NavController,
     public titleService: TitleService,
     private customizeService: CustomizeService,
     private alertCtrl: AlertController,
     private toastCtrl: ToastController)
      { }

      navigateBack() {
        this.navCtrl.back();
      }

  async selectInterest(val: any) {
    let user = {
      interest: val
    }
    try {
      const InterestInfo = await this.customizeService.updateInterest(user);
      if (InterestInfo['success']) {
        this.titleService.appPages.map(p => {
          p.value =  p.title === 'interest' ? val : p.value
        });
        this.titleService.interest.map(p => {
          p.isChecked =  p.val == val ? true : false;
        });
        this.presentToast(InterestInfo['message'])
        this.navCtrl.back();
      } else {
        this.presentAlert(InterestInfo['message']);
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to update your interest');
    }
  }

    //alert
    async presentAlert(message: any) {
      const alert = await this.alertCtrl.create({
        header: 'Interest update error',
        message: message,
        buttons: ['OK']
      });
  
      await alert.present();
    }
  
    //toast 
    async presentToast(message: any) {
      const toast = await this.toastCtrl.create({
        message: message,
        duration: 2000,
        color: 'dark',
      });
      toast.present();
    }

  ngOnInit() {
  }

}
