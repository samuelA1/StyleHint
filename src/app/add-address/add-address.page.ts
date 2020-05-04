import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { TitleService } from '../_services/title.service';
import { CustomizeService } from '../_services/customize.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {
  address: any = {
    country: `${this.titleService.appPages[7].value}`.toUpperCase()
  }; // address object to be sent to the database
  loading: boolean = false; //loader on the page after the address clicks the create account button
  constructor(private navCtrl: NavController,
     private titleService: TitleService,
     public customizeService: CustomizeService,
     private alertCtrl: AlertController,
     private toastCtrl: ToastController) { }

     navigateBack() {
      this.navCtrl.navigateBack(this.customizeService.navTo);
    }

   //add address
   addAdress() {
    this.loading = true;
    setTimeout(async () => {
      try {
        const adressInfo = await this.customizeService.addAdress(this.address);
        if (adressInfo['success']) {
          this.presentToast(adressInfo['message']);
          this.loading = false;
          this.navCtrl.navigateBack(this.customizeService.navTo);
        } else {
          this.loading = false;
          this.presentAlert('Sorry, an error occured while trying to add a new adress');
        }
      } catch (error) {
        this.presentAlert('Sorry, an error occured while trying to add a new address');
      }
    }, 1000);
  }

  //alert
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'add address error',
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
