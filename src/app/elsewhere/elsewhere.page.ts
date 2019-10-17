import { HintsService } from './../_services/hints.service';
import { Storage } from '@ionic/storage';
import { TitleService } from './../_services/title.service';
import { WeatherService } from './../_services/weather.service';
import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
declare var google;

@Component({
  selector: 'app-elsewhere',
  templateUrl: './elsewhere.page.html',
  styleUrls: ['./elsewhere.page.scss'],
})
export class ElsewherePage implements OnInit {
  imgIndex: number = 0;
  autocomplete: any;
  autocompleteItems: any;
  suggestions: any[];
  googleAutoComplete: any
  geocoder: any;
  weather: any = {}; 
  location: any = {
    season: '',
    state: '',
    city: '',
    weather: '',
    occasion: ''
  };

  constructor(private zone: NgZone,
     private weatherService: WeatherService,
     private navCtrl: NavController,
     private titleService: TitleService,
     private hintService: HintsService,
     private alertCtrl: AlertController,
     private storage: Storage) {
      this.getSuggestions();
    this.googleAutoComplete = new google.maps.places.AutocompleteService();
    this.geocoder = new google.maps.Geocoder;
  
   }

  //occasion/event array
  occasions: any[] = [
    {name: 'school', icon: 'school', isChosen: false},
    {name: 'sport', icon: 'american-football', isChosen: false},
    {name: 'birthday party', icon: 'color-wand', isChosen: false},
    {name: 'halloween', icon: 'outlet', isChosen: false},
    {name: 'christmas', icon: 'gift', isChosen: false},
    {name: 'church', icon: 'add-cirle-outline', isChosen: false},
    {name: 'date night', icon: 'contacts', isChosen: false},
    {name: 'job interview', icon: 'person-add', isChosen: false},
    {name: 'culture', icon: 'home', isChosen: false},
  ]

   //get season based on loaction
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
    this.weather.season = season;
    this.location.season = season;
}

//getSuggestions
async getSuggestions() {
  try {
    const suggestInfo = await this.hintService.getSuggestions();
    if (suggestInfo['success']) {
      this.suggestions = suggestInfo['suggestions'];
      console.log(this.suggestions);
      setTimeout(() => {
        this.next();
      }, 3000);
    } else {
      this.presentAlert('Sorry, an error occured while trying to get suggestions');
    }
  } catch (error) {
    this.presentAlert('Sorry, an error occured while trying to get suggestions');
  }
}

//suggestions navigations
prev() {
  this.imgIndex--
}

next() {
  if (this.imgIndex == 4) {
    this.imgIndex = 0;
  }
  this.imgIndex++
  setTimeout(() => {
    this.next();
  }, 3000);
}

viewHint(id: any) {
  this.hintService.id = id;
  this.hintService.backRoute = 'elsewhere'
  this.navCtrl.navigateForward('reference');
}

//get place or autocomplete on search
   updateSearchResults(){
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.googleAutoComplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.weather = {};
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }

  //get weather of selected area
  selectSearchResult(item: any){
    this.getSeason();
    this.autocomplete = { input: `${item.description}` };
    var cityState = `${item.description}`
    var split = cityState.split(',');
    this.location.city = split[0];
    this.location.state = split[1];
    this.autocompleteItems = [];
    this.weather.notice = 'Getting weather conditions based on location selected...'
    this.geocoder.geocode({'placeId': item.place_id}, async (results: any, status: any) => {
      if(status === 'OK' && results[0]){
        const weather = await this.weatherService.getWeather(results[0].geometry.location.lat(), results[0].geometry.location.lng());
        this.weather.temp = Math.round(weather['main'].temp);
        this.weather.main = weather['weather'][0].main;
        this.location.weather = weather['weather'][0].main
      }
    })
  }

  getHints() {
    this.titleService.finalData = this.location;
    this.navCtrl.navigateForward('fashion');
    this.storage.set('finalData', JSON.stringify(this.location));
  }

  ngOnInit() {
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
    this.weather.notice = '';
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

}
