import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private toastCtrl: ToastController) {}

  //seasons array
  seasons: any[] = [
    {name: 'summer', icon: 'flower', isChosen: false},
    {name: 'fall', icon: 'partly-sunny', isChosen: false},
    {name: 'winter', icon: 'snow', isChosen: false},
  ]

  // weather array
  weathers: any[] =[
    {name: 'sunny', icon: 'sunny', isChosen: false},
    {name: 'rainy', icon: 'rainy', isChosen: false},
    {name: 'cloudy', icon: 'cloud', isChosen: false},
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

  //choose option
  async chooseOccasion(iconName: any) {
    this.occasions.map(occasion => {
      occasion.isChosen =  occasion.icon === iconName ? true : false
    });

    await this.presentToastWithOptions();
  }

  //choose season
  chooseSeason(iconName: any) {
    this.seasons.map(season => {
      season.isChosen =  season.icon === iconName ? true : false
    });
  }

  //choosse weather
  chooseWeather(iconName: any) {
    this.weathers.map(weather => {
      weather.isChosen =  weather.icon === iconName ? true : false
    });
  }

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
