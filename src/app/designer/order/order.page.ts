import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/_services/business.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {

  order: any;
  constructor(private businessService: BusinessService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
    ) {
    if (this.businessService.orderId !== '') {
      this.getOrder();
    }
   }


  ngOnInit() {
  }


  //get orders
  async getOrder() {
    try {
      const ordersInfo = await this.businessService.getSingleDorder();
      if (ordersInfo['success']) {
        this.order = ordersInfo['orders'];
      } else {
        this.presentAlert('Sorry, an error occured while trying to get your order');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to get your order');
    }
  }

  //alert
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Order error',
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
