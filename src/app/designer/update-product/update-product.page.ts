import { DesignerService } from 'src/app/_services/designer.service';
import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage implements OnInit {
  socket: any;
  product: any = {};

  constructor(private adminService: AdminService,
    private designerService: DesignerService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController) { 
      if (this.adminService.productId !== '') {
        this.getProduct();
        this.socket = io('http://www.thestylehint.com');
      }
    }

  ngOnInit() {
  }

  async getProduct() {
    try {
      const productInfo = await this.adminService.getSingleProduct();
      if (productInfo['success']) {
        this.product = Object.assign({}, {small: productInfo['product'].info[0].quantity,
                                          medium: productInfo['product'].info[1].quantity,
                                          large: productInfo['product'].info[0].quantity,
                                          price: productInfo['product'].price,
                                          whatYouSell: productInfo['product'].whatYouSell,
                                          reason: productInfo['product'].reason,
                                          isPublished: productInfo['product'].isPublished,
                                          mainImage: productInfo['product'].mainImage,
                                          imgOne: productInfo['product'].imgOne,
                                          imgTwo: productInfo['product'].imgTwo,
                                          imgThree: productInfo['product'].imgThree,
                                          createdAt: productInfo['product'].createdAt});
      } else {
        this.presentAlert('Sorry, an error occured while getting a product');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting a product');
    }
  }

  async updateProduct() {
    try {
      const productInfo = await this.designerService.updateProduct(this.product);
      if (productInfo['success']) {
        this.presentToast(productInfo['message']);
      } else {
        this.presentAlert('Sorry, an error occured while trying to update a product.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to update a product.')
    }
  }

  async removeProduct() {
    try {
      const productInfo = await this.designerService.deleteProduct();
      if (productInfo['success']) {
        this.presentToast(productInfo['message']);
        this.socket.emit('logIn', {});
        this.navCtrl.navigateRoot('designer').then(() => {
          this.navCtrl.navigateRoot('all-products');
        })
      } else {
        this.presentAlert('Sorry, an error occured while trying to remove a product.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to remove a product.')
    }
  }

  async deleteProduct() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm product delete',
      message: `Are you sure you want to remove this product?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'remove',
          cssClass: 'delete',
          handler: () => {
            this.removeProduct();
          }
        }
      ]
    });

    await alert.present();
  }

   //alert ctrl
   async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

   //toast
async presentToast(message) {
  const toast = await this.toastCtrl.create({
    message: message,
    color: 'dark',
    position: 'bottom',
    duration: 2000
  });
  toast.present();
}

}
