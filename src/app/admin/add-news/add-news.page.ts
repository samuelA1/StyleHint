import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as io from 'socket.io-client';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.page.html',
  styleUrls: ['./add-news.page.scss'],
})
export class AddNewsPage implements OnInit {
  socket: any;
  news: any = {image: ''};
  base64Image: string;

  constructor(private camera: Camera,
    private alertCtrl: AlertController,
    private adminService: AdminService,
    private toastCtrl: ToastController,
    private navCtrl: NavController) {
      this.socket = io('http://www.thestylehint.com')
     }

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
     }, (err) => {
      this.presentAlert('Sorry, an error occured while trying to get an image')
     });
    
  }
  async addNews() {
    try {
     const form = new FormData();
     for(const key in this.news) {
      if (this.news.hasOwnProperty(key)) {
        if(key == 'image') {
          form.append(
            'image',
            this.base64Image,
          );
          
        } else {
          form.append(key, this.news[key])
        }
      }
    }
    const newsInfo = await this.adminService.addNews(form);
    if (newsInfo['success']) {
        this.presentToast(newsInfo['message']);
        this.socket.emit('logIn', {});
        this.navCtrl.navigateRoot('menu').then(() => {
          this.navCtrl.navigateRoot('all-news');
        })
    } else {
        this.presentAlert(newsInfo['message']);
    } 
    } catch (error) {
        this.presentAlert('Sorry, an error occured while trying to add a news.')
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
      header: 'News Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
