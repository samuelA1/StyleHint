import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { AlertController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { TitleService } from './../_services/title.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  base64Image: string;

  constructor(public titleService: TitleService,
    private camera: Camera,
    private alertCtrl: AlertController,
    private crop: Crop) { }

  ngOnInit() {
  }

  getImage() {
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
      this.cropImage();
     }, (err) => {
      this.presentAlert('Sorry, an error occured while trying to get an image')
     });
    
  }

  //cropping img
  cropImage() {
    const options: CropOptions = {
      quality: 100,
      targetHeight: 100,
      targetWidth: 100
    }

    this.crop.crop(this.base64Image, options)
      .then(
        newImage => this.base64Image = newImage,
        error => this.presentAlert(`Error cropping image ${error}`)
      );
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

}
