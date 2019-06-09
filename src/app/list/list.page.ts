import { CustomizeService } from './../_services/customize.service';
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController, ToastController } from '@ionic/angular';
import { TitleService } from '../_services/title.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    constructor(private navCtrl: NavController,
       private menu: MenuController,
       public titleService: TitleService,
       private customizeService: CustomizeService,
       private alertCtrl: AlertController,
       private toastCtrl: ToastController) { }

    
  //open side menu
  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  //selects country
  async selectCountry(name: any) {
    let user = {
      country: name
    }
    try {
      const countryInfo = await this.customizeService.updateCountry(user);
      if (countryInfo['success']) {
        this.titleService.appPages.map(p => {
          p.value =  p.title === 'country' ? name : p.value;
        });
    
        this.titleService.countries.map(p => {
          p.selected =  p.name.toLowerCase() == name.toLowerCase() ? true : false;
        });
        this.presentToast(countryInfo['message'])
        this.navCtrl.navigateRoot('home');
        this.openCustom();
      } else {
        this.presentAlert(countryInfo['message']);
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to update your country');
    }
  }

  //alert
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Country update error',
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
