import { AdminService } from './../../_services/admin.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import * as io from 'socket.io-client';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './add-hint.page.html',
  styleUrls: ['./add-hint.page.scss'],
})
export class AddHintPage implements OnInit {
socket: any;
hint: any = {
  occasion: '',
  season: '',
  weather: '',
  size: '',
  country: '',
  gender: '',
  interest: '',
  image: ''
};
base64Image: string;
//seasons array
seasons: any[] = [
  {name: 'winter'},
  {name: 'spring'},
  {name: 'summer'},
  {name: 'fall'},
]

// weather array
weathers: any[] =[
  {name: 'clear'},
  {name: 'rain'},
  {name: 'smoke'},
  {name: 'clouds'},
  {name: 'haze'},
  {name: 'mist'},
  {name: 'thunderstorm'},
  {name: 'snow'},
]

//occasion/event array
occasions: any[] = [
  {name: 'school'},
  {name: 'sport'},
  {name: 'birthday party'},
  {name: 'halloween'},
  {name: 'christmas'},
  {name: 'church'},
  {name: 'date night'},
  {name: 'job interview'},
  {name: 'culture'},
]

//list of sizes
sizes: any = [
  { name: 'Small'},
  { name: 'Medium' },
  { name: 'Large' },
];

 //list of genders
 genders: any = [
    { name: 'male adult' },
    { name: 'male kid' },
    { name: 'female adult'},
    { name: 'female kid'},
  ];

  //list of interest
  interests: any = [
    { name: 'expensive'},
    { name: 'casual' },
  ];
  constructor(private camera: Camera,
    private alertCtrl: AlertController,
    private adminService: AdminService,
    private toastCtrl: ToastController) {
      this.socket = io('http://www.thestylehint.com')
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
  async addHint() {
    try {
     const form = new FormData();
     for(const key in this.hint) {
      if (this.hint.hasOwnProperty(key)) {
        if(key == 'image') {
          form.append(
            'image',
            this.base64Image,
          );
          
        } else {
          form.append(key, this.hint[key])
        }
      }
    }
    const hintInfo = await this.adminService.addHint(form);
    if (hintInfo['success']) {
        this.presentToast(hintInfo['message']);
        this.socket.emit('logIn', {});
    } else {
        this.presentAlert(hintInfo['message']);
    } 
    } catch (error) {
        this.presentAlert('Sorry, an error occured while trying to add a hint.')
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
      header: 'Hint Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  ngOnInit() {
  }

}