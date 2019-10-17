import { AdminService } from './../../_services/admin.service';
import { AuthService } from './../../_services/auth.service';
import { WeatherService } from './../../_services/weather.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { TitleService } from './../../_services/title.service';
import { Component, OnInit } from '@angular/core';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import * as io from 'socket.io-client';
import { NotificationService } from 'src/app/_services/notification.service';
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
  totalUsersCount: number = 0; //total number of registered users
  totalHintsCount: number = 0; //total number of hints
  loggedIn: number = 0; //number of curently logged in users
  dailyTotal: number = 0; // number of users who logged in for the day
  weeklyTotal: number = 0; // number of users who logged in for the week
  monthlyTotal: number = 0; // number of users who logged in for the month
  yearlyTotal: number = 0; // number of users who logged in for the year

  constructor(public titleService: TitleService,
    private menuCtrl: MenuController,
    private geolocation: Geolocation,
    private weatherService: WeatherService,
    public notificationService: NotificationService,
    public authService: AuthService,
    private adminService: AdminService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
    ) { 
      this.geocoder = new google.maps.Geocoder();
      setTimeout(() => {
        this.getGeolocation();
       }, 3000);
      this.watchPosition();
      this.getSeason();
      this.getStatistics();
      this.totalUsers();
      this.totalHints();
      this.weekStatistics();
      this.monthStatistics();
      this.yearStatistics();
      this.socket = io('http://www.thestylehint.com')
    }

  ngOnInit() {
    this.menuCtrl.enable(true, 'first');
    this.menuCtrl.open('first');

    //logged in
    this.socket.emit('logIn', {});
    this.socket.on('loggedIn', total => {
      this.loggedIn = total['activeUsers'];
      if (this.titleService.isAdmin) {
        this.weekStatistics();
        this.monthStatistics();
        this.yearStatistics();
        this.getStatistics();
        this.totalUsers();
        this.totalHints();
      }
    });

    //logged out
    this.socket.on('loggedOut', total => {
      this.loggedIn = total['activeUsers'];
    });
  }

  //get total users
  async totalUsers() {
    try {
      const statisticsInfo = await this.adminService.totalUsers();
      if (statisticsInfo['success']) {
        this.totalUsersCount = statisticsInfo['totalUsers'];
      } else {
        this.presentAlert('Sorry, an error occured while getting stats info');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting stats info');
    }
  }

    //get total Hints
    async totalHints() {
      try {
        const statisticsInfo = await this.adminService.totalHints();
        if (statisticsInfo['success']) {
          this.totalHintsCount = statisticsInfo['totalHints'];
        } else {
          this.presentAlert('Sorry, an error occured while getting stats info');
        }
      } catch (error) {
        this.presentAlert('Sorry, an error occured while getting stats info');
      }
    }

  //get statistics
  async getStatistics() {
    try {
      const statisticsInfo = await this.adminService.getStatistics();
      if (statisticsInfo['success']) {
        this.dailyTotal = statisticsInfo['dailyUsers'];
      } else {
        this.presentAlert('Sorry, an error occured while getting stats info');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting stats info');
    }
  }

  //week stats
  async weekStatistics() {
    try {
      const statisticsInfo = await this.adminService.weekStatistics();
      if (statisticsInfo['success']) {
        this.weeklyTotal = statisticsInfo['weeklyUsers'];
      } else {
        this.presentAlert('Sorry, an error occured while getting stats info');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting stats info');
    }
  }

  //month stats
  async monthStatistics() {
    try {
      const statisticsInfo = await this.adminService.monthStatistics({year: new Date().getFullYear(), month: new Date().getMonth()});
      if (statisticsInfo['success']) {
        this.monthlyTotal = statisticsInfo['monthlyUsers'];
      } else {
        this.presentAlert('Sorry, an error occured while getting stats info');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting stats info');
    }
  }

  //year stats
  async yearStatistics() {
    try {
      const statisticsInfo = await this.adminService.yearStatistics({year: new Date().getFullYear()});
      if (statisticsInfo['success']) {
        this.yearlyTotal = statisticsInfo['yearlyUsers'];
      } else {
        this.presentAlert('Sorry, an error occured while getting stats info');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting stats info');
    }
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
