import { AlertController, ToastController, NavController } from '@ionic/angular';
import { AdminService } from './../../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-decision',
  templateUrl: './decision.page.html',
  styleUrls: ['./decision.page.scss'],
})
export class DecisionPage implements OnInit {
product: any;
socket: any;
hint: any = {
  occasion: '',
  season: '',
  weather: '',
  size: '',
  country: '',
  gender: '',
  interest: '',
  image: '',
  review: '',
  reason: ''
};
//seasons array
seasons: any[] = [
  {name: 'winter'},
  {name: 'spring'},
  {name: 'summer'},
  {name: 'fall'},
]

decisions: any[] = [
  {name: 'ok'},
  {name: 'denied'},
]

// weather array
weathers: any[] =[
  {name: 'clear'},
  {name: 'rain'},
  {name: 'smoke'},
  {name: 'fog'},
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
  constructor(private adminService: AdminService,
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
      } else {
        this.presentAlert('Sorry, an error occured while getting a product');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting a product');
    }
  }

  async reviewDecision() {
    try {
    const decisionInfo = await this.adminService.reviewDecision(this.hint);
    if (decisionInfo['success']) {
        this.presentToast(decisionInfo['message']);
        this.socket.emit('logIn', {});
        this.socket.emit('reviewDecide', this.product.owner._id);
        this.navCtrl.navigateRoot('menu').then(() => {
          this.navCtrl.navigateRoot('all-reviews');
        })
    } else {
        this.presentAlert('Sorry, an error occured while making a decision on a product.');
    } 
    } catch (error) {
        this.presentAlert('Sorry, an error occured while making a decision on a product.')
    }
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