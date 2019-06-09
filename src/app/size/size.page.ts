import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController, ToastController } from '@ionic/angular';
import { TitleService } from '../_services/title.service';
import { CustomizeService } from '../_services/customize.service';

@Component({
  selector: 'app-size',
  templateUrl: './size.page.html',
  styleUrls: ['./size.page.scss'],
})
export class SizePage implements OnInit {

  constructor(private navCtrl: NavController,
    private menu: MenuController,
    public titleService: TitleService,
    private customizeService: CustomizeService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) { }


 async selectSize(val: any) {
  let user = {
    size: val
  }
  try {
    const sizeInfo = await this.customizeService.updateSize(user);
    if (sizeInfo['success']) {
      
      this.titleService.appPages.map(p => {
        p.value =  p.title === 'size' ? val : p.value
      });
      this.titleService.sizes.map(p => {
        p.isChecked =  p.val == val ? true : false;
      });
      this.presentToast(sizeInfo['message'])
      this.navCtrl.navigateRoot('home');
      this.openCustom();
    } else {
      this.presentAlert(sizeInfo['message']);
    }
  } catch (error) {
    this.presentAlert('Sorry, an error occured while trying to update your size');
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
    header: 'Size update error',
    message: message,
    buttons: ['OK']
  });

  await alert.present();
}

//toast for rating confirmation
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
