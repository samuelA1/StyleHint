import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { CustomizeService } from '../_services/customize.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss'],
})
export class AddressPage implements OnInit {
addresses: any[];
  constructor(private navCtrl: NavController,
    private customizeService: CustomizeService,
     private alertCtrl: AlertController,
     private toastCtrl: ToastController) {
       this.getAddress();
      }

  ngOnInit() {
  }

  navigateBack() {
    this.navCtrl.navigateBack('profile');
  }

  toAddress() {
    this.navCtrl.navigateRoot('add-address', {animationDirection: 'forward'});
  }

  //nav to update address
  toUpdate(id: any) {
    this.customizeService.addressId = id;
    this.navCtrl.navigateRoot('update-address', {animationDirection: 'forward'});
  }

  //get address
  async getAddress() {
    try {
      const adressInfo = await this.customizeService.getCardsAddresses();
      if (adressInfo['success']) {
        this.addresses = adressInfo['addresses'];
      } else {
        this.presentAlert('Sorry, an error occured while trying to get your address');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to get your address');
    }
  }

  //get address
  async removeAddress(id: any) {
    try {
      const adressInfo = await this.customizeService.removeAdress(id);
      if (adressInfo['success']) {
        this.getAddress();
        this.presentToast(adressInfo['message']);
      } else {
        this.presentAlert('Sorry, an error occured while trying to remove an address');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to remove an address');
    }
  }

  async deleteAddress(id: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm address delete',
      message: `Are you sure you want to remove this address?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'remove',
          cssClass: 'delete',
          handler: () => {
            this.removeAddress(id);
          }
        }
      ]
    });

    await alert.present();
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

}
