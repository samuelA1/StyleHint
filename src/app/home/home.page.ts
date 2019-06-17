import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastController, AlertController, NavController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { WeatherService } from '../_services/weather.service';
import { TitleService } from '../_services/title.service';
import { Storage } from '@ionic/storage';
import * as io from 'socket.io-client';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  location: any = {};
  weather: any = {};
  date = Date.now();
  finalData: any = {};
  icon: any;
  season: any;
  socket: any;
  notifications: number = 0;
  itemSelected: boolean = false; //triggers overlay on occasion selected

  constructor(private toastCtrl: ToastController,
    private geolocation: Geolocation,
     private alertCtrl: AlertController,
     private weatherService: WeatherService,
     public titleService: TitleService,
     private authService: AuthService,
     private navCtrl: NavController,
     private storage: Storage) {
       setTimeout(() => {
        this.getGeolocation();
       }, 5000);
      this.watchPosition();
      this.getSeason();
      this.socket = io('http://www.thestylehint.com')
     }

     ngOnInit() {
       this.socket.on('share', friend => {
         if (friend === this.authService.userId) {
           this.notifications++
           this.storage.set('notifications', this.notifications);
           this.toastShareNotification();
         }
       });
       this.getNotifications();
    }

  //seasons array
  seasons: any[] = [
    {name: 'winter', icon: 'snow', isChosen: false},
    {name: 'spring', icon: 'rose', isChosen: false},
    {name: 'summer', icon: 'flower', isChosen: false},
    {name: 'fall', icon: 'partly-sunny', isChosen: false},
  ]

  // weather array
  weathers: any[] =[
    {name: 'clear', icon: 'sunny', isChosen: false},
    {name: 'rain', icon: 'rainy', isChosen: false},
    {name: 'clouds', icon: 'cloud', isChosen: false},
    {name: 'haze', icon: 'nuclear', isChosen: false},
    {name: 'mist', icon: 'list', isChosen: false},
  ]

  //occasion/event array
  occasions: any[] = [
    {name: 'school', icon: 'school', isChosen: false},
    {name: 'sport', icon: 'american-football', isChosen: false},
    {name: 'birthday party', icon: 'color-wand', isChosen: false},
    {name: 'halloween', icon: 'outlet', isChosen: false},
    {name: 'christmas', icon: 'gift', isChosen: false},
    {name: 'National day', extension: 'independence', icon: 'flag', isChosen: false},
    {name: 'date night', icon: 'contacts', isChosen: false},
    {name: 'job interview', icon: 'person-add', isChosen: false},
    {name: 'culture', icon: 'home', isChosen: false},
  ]

  getSeason() {
    let month = new Date().getMonth();
    let monthToCheck = `${month+1}`
    let season = '';
    switch(monthToCheck) {
        case '12':
        case '1':
        case '2':
            season = 'winter';
        break;
        case '3':
        case '4':
        case '5':
            season = 'spring';
        break;
        case '6':
        case '7':
        case '8':
            season = 'summer';
        break;
        case '9':
        case '10': 
        case '11':
            season = 'fall';
        break;
    }
    this.season = season;
    this.chooseSeason(season)
}

  //choose option
  async chooseOccasion(iconName: any) {
    this.itemSelected = true;
    this.occasions.map(occasion => {
      occasion.isChosen =  occasion.icon === iconName ? (true) : false
    });
    await this.presentToastWithOptions();
  }

  //choose season
  chooseSeason(name: any) {
    this.finalData.season = name;
    this.seasons.map(season => {
      season.isChosen =  season.name === name ? true : false
    });
  }

  //choosse weather
  chooseWeather(name: any) {
    this.finalData.weather = name;
    this.weathers.map(weather => {
      weather.isChosen =  weather.name === name ? true : false
    });
  }

  //get latitude and longitude
  getGeolocation(){
    this.geolocation.getCurrentPosition().then( async (resp) => {
      // get weather
      const weather = await this.weatherService.getWeather(resp.coords.latitude, resp.coords.longitude);
      //location
      const locate = await this.weatherService.getLocation();
      if (locate['status'] == 'success') {
        this.location.city = locate['city'];
        this.location.country = locate['country'];
        this.location.state = locate['region'];
        this.finalData.city = locate['city'];
        this.finalData.state = locate['region']
      } else {
        this.presentAlert('Sorry, an error occured while trying to get your location');
      }
      this.weather.temp = Math.round(weather['main'].temp);
      this.weather.main = weather['weather'][0].main;
      this.chooseWeather(weather['weather'][0].main.toLowerCase())
      this.weather.icon = `http://openweathermap.org/img/w/${weather['weather'][0].icon}.png`;
     }).catch((error) => {
       this.presentAlert('Sorry, an error occured while trying to get your location');
     });
  }

  watchPosition() {
    this.geolocation.watchPosition().toPromise()
    .then( async (resp) => {
      // get weather
      const weather = await this.weatherService.getWeather(resp.coords.latitude, resp.coords.longitude);
      //location
      const locate = await this.weatherService.getLocation();
      if (locate['status'] == 'success') {
        this.location.city = locate['city'];
        this.location.country = locate['country'];
        this.location.state = locate['region'];
        this.finalData.city = locate['city'];
        this.finalData.state = locate['region']
      } else {
        this.presentAlert('Sorry, an error occured while trying to get your location');
      }
      this.weather.temp = Math.round(weather['main'].temp);
      this.weather.main = weather['weather'][0].main;
      this.chooseWeather(weather['weather'][0].main.toLowerCase())
      this.weather.icon = `http://openweathermap.org/img/w/${weather['weather'][0].icon}.png`;
     }).catch((error) => {
       this.presentAlert('Sorry, an error occured while trying to get your location');
     });
  }

  //clear notifications
  clearNotifications() {
    this.notifications = 0;
    this.navCtrl.navigateForward('notifications').then(() => {
      this.storage.set('notifications', this.notifications);
    });
  }

  //get notifications
  getNotifications() {
    this.storage.get('notifications').then(notify => this.notifications = notify);
  }

  //alert
   async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Location error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  //toast notification
  async toastShareNotification() {
    const toast = await this.toastCtrl.create({
      header: 'Someone just shared a hint with you',
      position: 'bottom',
      duration: 7000,
      color: 'dark',
      buttons: [
        {
          side: 'end',
          text: 'view hint',
          handler: () => {
            this.navCtrl.navigateForward('fashion');
          }
        }
      ]
    });
    toast.present();
  }

  //toast
  async presentToastWithOptions() {
    const toast = await this.toastCtrl.create({
      header: 'Are you set and ready to go?',
      position: 'bottom',
      color: 'dark',
      buttons: [
        {
          side: 'end',
          icon: 'thumbs-up',
          text: 'Yes',
          handler: () => {
            this.itemSelected = false;
            this.occasions.forEach(o => {
              if (o.isChosen) {
                this.finalData.occasion = o.name;
              }
            })
            this.titleService.finalData = this.finalData;
            this.navCtrl.navigateForward('fashion');
            this.storage.set('finalData', JSON.stringify(this.finalData));
          }
        }, {
          side: 'start',
          icon: 'thumbs-down',
          text: 'No',
          handler: () => {
            this.itemSelected = false;
          }
        }
      ]
    });
    toast.present();
  }
}
