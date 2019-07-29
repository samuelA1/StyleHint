import { AuthService } from './../../_services/auth.service';
import { WeatherService } from './../../_services/weather.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TitleService } from './../../_services/title.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import * as io from 'socket.io-client';
declare var google;


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  location: any = {
    city: '',
    state: '',
    country: ''
  };
  weather: any = {};
  date = Date.now();
  geocoder: any;
  latlng: any;
  season: any;
  socket: any;
  loggedIn: number = 0; //number of curently logged in users
  dailyTotal: number = 0; // number of users who logged in for the day

  constructor(public titleService: TitleService,
    private menuCtrl: MenuController,
    private geolocation: Geolocation,
    private weatherService: WeatherService,
    public authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
    ) { 
      this.geocoder = new google.maps.Geocoder();
      setTimeout(() => {
        this.getGeolocation();
       }, 3000);
      this.watchPosition();
      this.getSeason();
      this.socket = io('http://www.thestylehint.com')
    }

  ngOnInit() {
    this.menuCtrl.enable(true, 'first');
    this.menuCtrl.open('first');

    //logged in
    this.socket.on('loggedIn', total => {
      this.loggedIn = total.currentTotal;
      this.dailyTotal = total.dayTotal;
    });

    //logged out
    this.socket.on('loggedOut', total => {
      this.loggedIn = total.currentTotal;
    });
  }

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
}

    //get latitude and longitude
    getGeolocation(){
      this.geolocation.getCurrentPosition().then( async (resp) => {
        // location
        this.latlng 	 = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        this.geocoder.geocode({'latLng': this.latlng}, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              for (var i = 0; i < results.length; i++) {
                if (results[i].types[0] === "locality") {
                  var city = results[i].address_components[0].long_name;
                  var state = results[i].address_components[2].long_name;
                  var country = results[i].address_components[3].long_name;
                  this.location.city = city;
                  this.location.country = country;
                  this.location.state = state;
              
                }
              }
            } else {
              this.presentAlert('Sorry, an error occured while trying to get your location');
              this.presentToast('No internet connection. Please connect to the internet', 'danger');
            }
          } else {
            this.presentAlert('Sorry, an error occured while trying to get your location');
            this.presentToast('No internet connection. Please connect to the internet', 'danger');
          }
        });
    
  
        //weather
        const weather = await this.weatherService.getWeather(resp.coords.latitude, resp.coords.longitude);
        this.weather.temp = Math.round(weather['main'].temp);
        this.weather.main = weather['weather'][0].main;
        this.weather.icon = `http://openweathermap.org/img/w/${weather['weather'][0].icon}.png`;
       }).catch((error) => {
         this.presentAlert('Sorry, an error occured while trying to get your location');
         this.presentToast('No internet connection. Please connect to the internet', 'danger');
  
       });
    }
  
    watchPosition() {
      this.geolocation.watchPosition().toPromise()
      .then( async (resp) => {
        this.latlng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        this.geocoder.geocode({'latLng': this.latlng}, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              for (var i = 0; i < results.length; i++) {
                if (results[i].types[0] === "locality") {
                  var city = results[i].address_components[0].long_name;
                  var state = results[i].address_components[2].long_name;
                  var country = results[i].address_components[3].long_name;
                  this.location.city = city;
                  this.location.country = country;
                  this.location.state = state;
                }
              }
            }
            this.presentAlert('Sorry, an error occured while trying to get your location');
            this.presentToast('No internet connection. Please connect to the internet', 'danger');
  
          }
          this.presentAlert('Sorry, an error occured while trying to get your location');
          this.presentToast('No internet connection. Please connect to the internet', 'danger');
  
        });
    
  
        //weather
        const weather = await this.weatherService.getWeather(resp.coords.latitude, resp.coords.longitude);
        this.weather.temp = Math.round(weather['main'].temp);
        this.weather.main = weather['weather'][0].main;
        this.weather.icon = `http://openweathermap.org/img/w/${weather['weather'][0].icon}.png`;
       }).catch((error) => {
         this.presentAlert('Sorry, an error occured while trying to get your location');
         this.presentToast('No internet connection. Please connect to the internet', 'danger');
       });
    }

    //alert
   async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

   //toast
   async presentToast(message, color) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: color,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

}
