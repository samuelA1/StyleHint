import { Component } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { WeatherService } from '../_services/weather.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  location: any = {};
  weather: any = {};
  date = Date.now();
  icon: any;
  season: any;

  constructor(private toastCtrl: ToastController,
    private geolocation: Geolocation,
     private alertCtrl: AlertController,
     private weatherService: WeatherService) {
      this.getGeolocation();
      this.watchPosition();
      this.getSeason();
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
    {name: 'church', icon: 'home', isChosen: false},
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
    this.occasions.map(occasion => {
      occasion.isChosen =  occasion.icon === iconName ? true : false
    });

    await this.presentToastWithOptions();
  }

  //choose season
  chooseSeason(name: any) {
    this.seasons.map(season => {
      season.isChosen =  season.name === name ? true : false
    });
  }

  //choosse weather
  chooseWeather(name: any) {
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
      } else {
        this.presentAlert('Sorry, an error occured while trying to get your location');
      }
      this.weather.temp = Math.round(weather['main'].temp);
      this.weather.main = weather['weather'][0].main;
      this.chooseWeather(weather['weather'][0].main.toLowerCase())
      this.weather.icon = `http://openweathermap.org/img/w/${weather['weather'][0].icon}.png`;
      // console.log(weather);
     }).catch((error) => {
       this.presentAlert('Sorry, an error occured while trying to get your location');
     });
  }

  watchPosition() {
    this.geolocation.watchPosition().toPromise()
    .then( async (resp) => {
      // get weather
      const weather = await this.weatherService.getWeather(resp.coords.latitude, resp.coords.longitude);
      // get city 
      this.location.city = weather['name'];
      this.location.country = weather['sys'].country;
      this.weather.temp = weather['main'].temp;
      this.weather.main = weather['weather'][0].main;
      // console.log(weather);
     }).catch((error) => {
       this.presentAlert('Sorry, an error occured while trying to get your location');
     });
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
            console.log('Favorite clicked');
          }
        }, {
          side: 'start',
          icon: 'thumbs-down',
          text: 'No',
          role: 'cancel'
        }
      ]
    });
    toast.present();
  }
}
