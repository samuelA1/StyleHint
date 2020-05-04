import { AdminService } from './../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../_services/business.service';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-my-single-order',
  templateUrl: './my-single-order.page.html',
  styleUrls: ['./my-single-order.page.scss'],
})
export class MySingleOrderPage implements OnInit {
order: any;
visaRegex = RegExp('^4\\d{0,15}');
amexRegex = RegExp('^3[47]\\d{0,13}');
discoverRegex = RegExp('^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}');
dinersRegex = RegExp('^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}');
masterRegex = RegExp('^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}');
jcbRegex = RegExp('^(?:35\\d{0,2})\\d{0,12}');
maestroRegex = RegExp('^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}');
unionRegex = RegExp('^62\\d{0,14}');
  constructor(private businessService: BusinessService,
    private alertCtrl: AlertController,
    private adminService: AdminService,
    private navCtrl: NavController) {
    if (this.businessService.orderId !== '') {
      this.getOrder();
    }
   }

  ngOnInit() {
  }

  //nav to product
  toProduct(productId: any) {
    this.adminService.productId = productId;
    this.adminService.navFromProduct = 'my-single-order'
    this.navCtrl.navigateForward('product');
  }

  //get orders
  async getOrder() {
    try {
      const ordersInfo = await this.businessService.getSingleOrder();
      if (ordersInfo['success']) {
        this.order = ordersInfo['orders'];
        if (this.visaRegex.test(this.order['cardNumber'])) {
          this.order = Object.assign({visa: true, num: `${this.order['cardNumber']}`.substr(`${this.order['cardNumber']}`.length - 4)}, this.order);
         } 
         else if(this.amexRegex.test(this.order['cardNumber'])) {
          this.order = Object.assign({amex: true, num: `${this.order['cardNumber']}`.substr(`${this.order['cardNumber']}`.length - 4)}, this.order);      }
         else if(this.discoverRegex.test(this.order['cardNumber'])) {
          this.order = Object.assign({discover: true, num: `${this.order['cardNumber']}`.substr(`${this.order['cardNumber']}`.length - 4)}, this.order);      }
         else if(this.dinersRegex.test(this.order['cardNumber'])) {
          this.order = Object.assign({diners: true, num: `${this.order['cardNumber']}`.substr(`${this.order['cardNumber']}`.length - 4)}, this.order);      }
         else if(this.masterRegex.test(this.order['cardNumber'])) {
          this.order = Object.assign({master: true, num: `${this.order['cardNumber']}`.substr(`${this.order['cardNumber']}`.length - 4)}, this.order);      }
         else if(this.maestroRegex.test(this.order['cardNumber'])) {
          this.order = Object.assign({maestro: true, num: `${this.order['cardNumber']}`.substr(`${this.order['cardNumber']}`.length - 4)}, this.order);      }
         else if(this.jcbRegex.test(this.order['cardNumber'])) {
          this.order = Object.assign({jcb: true, num: `${this.order['cardNumber']}`.substr(`${this.order['cardNumber']}`.length - 4)}, this.order);      }
         else if(this.unionRegex.test(this.order['cardNumber'])) {
          this.order = Object.assign({union: true, num: `${this.order['cardNumber']}`.substr(`${this.order['cardNumber']}`.length - 4)}, this.order);     }
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

}
