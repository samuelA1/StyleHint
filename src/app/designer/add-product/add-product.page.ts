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
  small: '',
  medium: '',
  large: '',
  mainImage: '',
  imgOne: '',
  imgTwo: '',
  imgThree: '',
}

base64Image: string;
imgOne: string;
imgTwo: string;
imgThree: string;

  constructor(private camera: Camera,
    private alertCtrl: AlertController,
    private designerService: DesignerService,
    private toastCtrl: ToastController) {
      this.socket = io('http://www.thestylehint.com')
     }

  ngOnInit() {
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

  async addProduct() {
    if (this.base64Image) {
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
