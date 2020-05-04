import { DesignerService } from './../../_services/designer.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as io from 'socket.io-client';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.page.html',
  styleUrls: ['./add-product.page.scss'],
})
export class AddProductPage implements OnInit {
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

secondProduct: boolean = true;
thirdProduct: boolean = true;

cloth1: any = {
  color: '',
  info: [
    {size: 'xsmall', quantity: 0},
    {size: 'small', quantity: 0},
    {size: 'medium', quantity: 0},
    {size: 'large', quantity: 0},
    {size: 'xlarge', quantity: 0},
  ]
}

cloth2: any = {
  color: '',
  info: [
    {size: 'xsmall', quantity: 0},
    {size: 'small', quantity: 0},
    {size: 'medium', quantity: 0},
    {size: 'large', quantity: 0},
    {size: 'xlarge', quantity: 0},
  ]
}

cloth3: any = {
  color: '',
  info: [
    {size: 'xsmall', quantity: 0},
    {size: 'small', quantity: 0},
    {size: 'medium', quantity: 0},
    {size: 'large', quantity: 0},
    {size: 'xlarge', quantity: 0},
  ]
}

shoe1: any = {
  color: '',
  info: [
    {size: 4, quantity: 0},
    {size: 4.5, quantity: 0},
    {size: 5, quantity: 0},
    {size: 5.5, quantity: 0},
    {size: 6, quantity: 0},
    {size: 6.5, quantity: 0},
    {size: 7, quantity: 0},
    {size: 7.5, quantity: 0},
    {size: 8, quantity: 0},
    {size: 8.5, quantity: 0},
    {size: 9, quantity: 0},
    {size: 9.5, quantity: 0},
    {size: 10, quantity: 0},
    {size: 10.5, quantity: 0},
    {size: 11, quantity: 0},
    {size: 11.5, quantity: 0},
    {size: 12, quantity: 0},
    {size: 12.5, quantity: 0},
    {size: 13, quantity: 0},
    {size: 13.5, quantity: 0},
    {size: 14, quantity: 0},
    {size: 14.5, quantity: 0},
    {size: 15, quantity: 0},
    {size: 16, quantity: 0},
  ]
}

shoe2: any = {
  color: '',
  info: [
    {size: 4, quantity: 0},
    {size: 4.5, quantity: 0},
    {size: 5, quantity: 0},
    {size: 5.5, quantity: 0},
    {size: 6, quantity: 0},
    {size: 6.5, quantity: 0},
    {size: 7, quantity: 0},
    {size: 7.5, quantity: 0},
    {size: 8, quantity: 0},
    {size: 8.5, quantity: 0},
    {size: 9, quantity: 0},
    {size: 9.5, quantity: 0},
    {size: 10, quantity: 0},
    {size: 10.5, quantity: 0},
    {size: 11, quantity: 0},
    {size: 11.5, quantity: 0},
    {size: 12, quantity: 0},
    {size: 12.5, quantity: 0},
    {size: 13, quantity: 0},
    {size: 13.5, quantity: 0},
    {size: 14, quantity: 0},
    {size: 14.5, quantity: 0},
    {size: 15, quantity: 0},
    {size: 16, quantity: 0},
  ]
}

shoe3: any = {
  color: '',
  info: [
    {size: 4, quantity: 0},
    {size: 4.5, quantity: 0},
    {size: 5, quantity: 0},
    {size: 5.5, quantity: 0},
    {size: 6, quantity: 0},
    {size: 6.5, quantity: 0},
    {size: 7, quantity: 0},
    {size: 7.5, quantity: 0},
    {size: 8, quantity: 0},
    {size: 8.5, quantity: 0},
    {size: 9, quantity: 0},
    {size: 9.5, quantity: 0},
    {size: 10, quantity: 0},
    {size: 10.5, quantity: 0},
    {size: 11, quantity: 0},
    {size: 11.5, quantity: 0},
    {size: 12, quantity: 0},
    {size: 12.5, quantity: 0},
    {size: 13, quantity: 0},
    {size: 13.5, quantity: 0},
    {size: 14, quantity: 0},
    {size: 14.5, quantity: 0},
    {size: 15, quantity: 0},
    {size: 16, quantity: 0},
  ]
}

base64Image: string;
imgOne: string;
imgTwo: string;
imgThree: string;

type: any[] = [
  {name: 'clothing'},
  {name: 'shoe'},
]

  constructor(private camera: Camera,
    private alertCtrl: AlertController,
    private designerService: DesignerService,
    private toastCtrl: ToastController) {
      this.socket = io('http://www.thestylehint.com')
     }

  ngOnInit() {
  }

  viewSecond () {
    this.secondProduct = !this.secondProduct;
  }

  viewThird () {
    this.thirdProduct = !this.thirdProduct;
  }

  getMainImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      this.presentAlert('Sorry, an error occured while trying to get an image')
     });
    
  }

  getImageOne() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imgOne = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      this.presentAlert('Sorry, an error occured while trying to get an image')
     });
    
  }

  getImageTwo() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imgTwo = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      this.presentAlert('Sorry, an error occured while trying to get an image')
     });
    
  }

  getImageThree() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.imgThree = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      this.presentAlert('Sorry, an error occured while trying to get an image')
     });
    
  }

  processProduct() {
    if (this.product.type == 'clothing') {
      this.product.cloth.push(this.cloth1);
      if (this.cloth2.color !== '') {
        this.product.cloth.push(this.cloth2);
      }
      if (this.cloth3.color !== '') {
        this.product.cloth.push(this.cloth3);
      }
      this.product.cloth = JSON.stringify(this.product.cloth);
    } else {
      this.product.shoe.push(this.shoe1);
      if (this.shoe2.color !== '') {
        this.product.shoe.push(this.shoe2);
      }
      if (this.shoe3.color !== '') {
        this.product.shoe.push(this.shoe3);
      }
      this.product.shoe = JSON.stringify(this.product.shoe);
    }
  }

  async addProduct() {
    this.processProduct();
    if (this.base64Image) {
      if (this.imgOne) {
        if (this.imgTwo) {
          if (this.imgThree) {
            try {
              const form = new FormData();
              for(const key in this.product) {
               if (this.product.hasOwnProperty(key)) {
                 this.product.mainImage = this.base64Image;
                 this.product.imgOne = this.imgOne;
                 this.product.imgTwo = this.imgTwo;
                 this.product.imgThree = this.imgThree;
                form.append(key, this.product[key])
               }
             }
             const productInfo = await this.designerService.addProduct(form);
             if (productInfo['success']) {
                 this.presentToast(productInfo['message']);
                 this.socket.emit('designReview', {});
             } else {
                 this.presentAlert(productInfo['message']);
             } 
             } catch (error) {
                 this.presentAlert('Sorry, an error occured while trying to add a product.')
             }
          } else {
            this.presentAlert('Please upload at least three supporting images for this product.')
          }
        } else {
          this.presentAlert('Please upload at least three supporting images for this product.')
        }
      } else {
        this.presentAlert('Please upload at least three supporting images for this product.')
      }
    } else {
      this.presentAlert('Please upload the main image for this product.')
    }
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

  //alert ctrl
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Product Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
