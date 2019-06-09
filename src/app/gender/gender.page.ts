import { CustomizeService } from './../_services/customize.service';
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController, ToastController } from '@ionic/angular';
import { TitleService } from '../_services/title.service';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.page.html',
  styleUrls: ['./gender.page.scss'],
})
export class GenderPage implements OnInit {

  constructor(private navCtrl: NavController,
    private menu: MenuController,
    public titleService: TitleService,
    private customizeService: CustomizeService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController)
     { }

 async selectSize(val: any) {
  let user = {
    gender: val
  }
  try {
    const genderInfo = await this.customizeService.updateGender(user);
    if (genderInfo['success']) {
      this.titleService.appPages.map(p => {
        p.value =  p.title === 'gender' ? val : p.value
      });
      this.titleService.genders.map(p => {
        p.isChecked =  p.val == val ? true : false;
      });
      this.presentToast(genderInfo['message'])
      this.navCtrl.navigateRoot('home');
      this.openCustom();
    } else {
      this.presentAlert(genderInfo['message']);
    }
  } catch (error) {
    this.presentAlert('Sorry, an error occured while trying to update your gender');
  }
 }

 //open side menu
 openCustom() {
   this.menu.enable(true, 'custom');
   this.menu.open('custom');
 }

 //alert
 async presentAlert(message: any) {
  const alert = await this.alertCtrl.create({
    header: 'Gender update error',
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
