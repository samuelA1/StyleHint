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
  product: any = {
    price: '',
    whatYouSell: '',
    shoe: [],
    cloth: [],
    mainImage: '',
    imgOne: '',
    imgTwo: '',
    imgThree: '',
    type: ''
  }
  cloth1: any = {
    color: ''
  };
  cloth2: any = {
    color: ''
  };
  cloth3: any = {
    color: ''
  };
  shoe1: any = {
    color: ''
  };
  shoe2: any = {
    color: ''
  };
  shoe3: any = {
    color: ''
  };

  constructor(private adminService: AdminService,
    private designerService: DesignerService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController) { 
      if (this.adminService.productId !== '') {
        this.getProduct();
      }
      this.socket = io('http://www.thestylehint.com');
    }

  ngOnInit() {
  }

  async getProduct() {
    try {
      const productInfo = await this.adminService.getSingleProduct();
      if (productInfo['success']) {
        this.product = productInfo['product'];
        if (productInfo['product'].type == 'clothing') {
          this.cloth1 = productInfo['product'].cloth[0];
          this.cloth2 = productInfo['product'].cloth[1];
          this.cloth3 = productInfo['product'].cloth[2];
        } else if(productInfo['product'].type == 'shoe') {
          this.shoe1 = productInfo['product'].shoe[0];
          this.shoe2 = productInfo['product'].shoe[1];
          this.shoe3 = productInfo['product'].shoe[2];
        }
      } else {
        this.presentAlert('Sorry, an error occured while getting a product');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting a product');
    }
  }

  processProduct() {
    if (this.product.type == 'clothing') {
      this.product.cloth = [];
      this.product.cloth.push(this.cloth1);
      if (this.cloth2.color !== '') {
        this.product.cloth.push(this.cloth2);
      }
      if (this.cloth3.color !== '') {
        this.product.cloth.push(this.cloth3);
      }
    } else {
      this.product.shoe = [];
      this.product.shoe.push(this.shoe1);
      if (this.shoe2 && this.shoe2.color !== '') {
        this.product.shoe.push(this.shoe2);
      }
      if (this.shoe3 && this.shoe3.color !== '') {
        this.product.shoe.push(this.shoe3);
      }
    }
  }

  async updateProduct() {
    this.processProduct();
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
