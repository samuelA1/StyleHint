import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../_services/business.service';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {
  orders: any[];
  totalItems: number = 0;
  constructor(
    private businessService: BusinessService,
    private alertCtrl: AlertController,
    private navCtrl: NavController) { 
      this.getOrders();
    }

  ngOnInit() {
  }

  toOrder(orderId: any) {
    this.businessService.orderId = orderId;
    this.navCtrl.navigateForward('my-single-order');
  }

  //get orders
  async getOrders() {
    try {
      const ordersInfo = await this.businessService.getUserOrders();
      if (ordersInfo['success']) {
        this.orders = ordersInfo['orders'];
      } else {
        this.presentAlert('Sorry, an error occured while trying to get your orders');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to get your orders');
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

}
