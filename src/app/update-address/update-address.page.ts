import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { CustomizeService } from '../_services/customize.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.page.html',
  styleUrls: ['./update-address.page.scss'],
})
export class UpdateAddressPage implements OnInit {

  address: any = {}; // address object to be sent to the database
  loading: boolean = false; //loader on the page after the address clicks the create account button
  constructor(private navCtrl: NavController,
     private customizeService: CustomizeService,
     private alertCtrl: AlertController,
     private toastCtrl: ToastController) {
      if (this.customizeService.addressId !== '') {
        this.getAddress();
      }
      }

     navigateBack() {
      this.navCtrl.navigateBack('address');
    }

    //get address
  async getAddress() {
    try {
      const adressInfo = await this.customizeService.getAddress();
      if (adressInfo['success']) {
        this.address = adressInfo['address'];
      } else {
        this.presentAlert('Sorry, an error occured while trying to get an address');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to get an address');
    }
  }


   //update address
   updateAdress() {
    this.loading = true;
    setTimeout(async () => {
      try {
        const adressInfo = await this.customizeService.updateAdress(this.address);
        if (adressInfo['success']) {
          this.presentToast(adressInfo['message'])
          this.loading = false;
          this.navCtrl.navigateBack('address');
        } else {
          this.loading = false;
          this.presentAlert('Sorry, an error occured while trying to update an address');
        }
      } catch (error) {
        this.presentAlert('Sorry, an error occured while trying to update an address');
      }
    }, 1000);
  }

  //alert
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'address error',
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
