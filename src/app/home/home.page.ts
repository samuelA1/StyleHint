import { HintsService } from './../_services/hints.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, AlertController, NavController, MenuController, IonSlides, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { WeatherService } from '../_services/weather.service';
import { TitleService } from '../_services/title.service';
import { Storage } from '@ionic/storage';
import * as io from 'socket.io-client';
import * as moment from 'moment';
import { NotificationService } from '../_services/notification.service';
import { NewsService } from '../_services/news.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
declare var google;



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('slides') slides: IonSlides;
  allNews: any[];
  page: number = 1;
  totalNews: any;
  imgIndex: number = 0;
  changeSeason: boolean = false;
  location: any = {
    city: '',
    state: '',
    country: ''
  };
  weather: any = {};
  date = Date.now();
  geocoder: any;
  latlng: any;
  finalData: any = {
    city: '',
    state: '',
  };
  suggestions: any[];
  icon: any;
  season: any;
  socket: any;
  itemSelected: boolean = false; //triggers overlay on occasion selected
  showWeather: boolean = true; //hide or show weather

  //for controlling slides
  slideOpts = {
    initialSlide: 2,
    // speed: 400
  };

  constructor(private toastCtrl: ToastController,
    private geolocation: Geolocation,
     private alertCtrl: AlertController,
     private weatherService: WeatherService,
     public titleService: TitleService,
     private hintService: HintsService,
     private authService: AuthService,
     private newsService: NewsService,
     public notificationService: NotificationService,
     private navCtrl: NavController,
     private onesignal: OneSignal,
     private platform: Platform,
    //  private menu: MenuController,
     private storage: Storage) {
      this.geocoder = new google.maps.Geocoder();
      setTimeout(() => {
        this.getGeolocation();
       }, 3000);
       if (this.platform.is('cordova')) {
        setTimeout(() => {
          this.setupPush();
        }, 6000);
       }
      this.getSuggestions();
      this.watchPosition();
      this.getSeason();
      this.getAllNews();
      this.socket = io('http://www.thestylehint.com')
     }

     //close suggestions modal
     close() {
       this.titleService.modal = true;
     }

     toggleShowCase() {
       //hide weather when displaying news slide
       this.slides.getActiveIndex().then(i => {
         if (i === 0) {
          this.showWeather = false;
         } else {
          this.showWeather = true;
         }
       })
     }

     GetPostTime(time) {
      return moment(time).fromNow();
    }

  
    //navigate to update
    toNews(id: any) {
      this.newsService.id = id;
      this.navCtrl.navigateForward('news')
    }
  
    async getAllNews() {
      try {
        const newsInfo = await this.newsService.allNews(this.page);
        if (newsInfo['success']) {
          this.allNews = newsInfo['news'];
        } else {
          this.presentAlert('Sorry, an error occured while getting all news');
        }
      } catch (error) {
        this.presentAlert('Sorry, an error occured while getting all news');
      }
    }

    loadData(event: any) {
      this.page++
      setTimeout(() => {
        this.newsService.allNews(this.page).then((newsInfo) => {
          newsInfo['news'].forEach((news: any) => {
            this.allNews.push(news)
          });
          event.target.complete();
        });
    
        if (this.allNews.length == this.totalNews) {
          event.target.disabled = true;
        }
      }, 800);
    }

     //bring up different seasons
     change() {
       this.changeSeason = !this.changeSeason;
     }

     viewHint(id: any) {
      this.hintService.id = id;
      this.hintService.backRoute = 'home'
      this.navCtrl.navigateForward('reference');
    }

     ngOnInit() {
       this.socket.on('share', friend => {
         if (friend === this.authService.userId) {
          //  this.notificationService.numberOfNotifications++
          this.notificationService.notifyNumber();
           this.toastShareNotification('Someone just shared a hint with you.', 'tertiary');
         }
       });

       this.socket.on('informed', friend => {
        if (friend === this.authService.userId) {
         //  this.notificationService.numberOfNotifications++
         this.notificationService.notifyNumber();
          this.toastShareNotification('Someone just shared some news with you.', 'secondary');
        }
      });

       this.socket.on('friendRequested', friend => {
        if (friend === this.authService.userId) {
          // this.notificationService.numberOfNotifications++
          this.notificationService.notifyNumber();
          this.toastShareNotification('Someone just sent you a friend request.', 'warning');
        }
      });

      this.socket.on('requestAccepted', friend => {
        if (friend === this.authService.userId) {
          // this.notificationService.numberOfNotifications++
          this.notificationService.notifyNumber();
          this.toastShareNotification('Someone just accepted your friend request.', 'warning');
        }
      });

      this.socket.on('notificationViewed', ownerId => {
        if (ownerId === this.authService.userId) {
          this.notificationService.numberOfNotifications = 0;
        }
      });

       this.socket.on('commented', comment => {
        if (comment.ownerId === this.authService.userId) {
          // this.notificationService.numberOfNotifications++
          this.notificationService.notifyNumber();
          this.toastShareNotification('One of your friends just commented on one of your tips.', 'success');
        }
      });

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
    {name: 'smoke', icon: 'bonfire', isChosen: false},
    {name: 'fog', icon: 'flower', isChosen: false},
    {name: 'thunderstorm', icon: 'thunderstorm', isChosen: false},
  ]

  //occasion/event array
  occasions: any[] = [
    {name: 'school', icon: 'school', isChosen: false},
    {name: 'sport', icon: 'american-football', isChosen: false},
    {name: 'birthday party', icon: 'color-wand', isChosen: false},
    {name: 'halloween', icon: 'outlet', isChosen: false},
    {name: 'christmas', icon: 'gift', isChosen: false},
    {name: 'church', icon: 'home', isChosen: false},
    {name: 'date night', icon: 'contacts', isChosen: false},
    {name: 'job interview', icon: 'person-add', isChosen: false},
    {name: 'culture', icon: 'add-circle-outline', isChosen: false},
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
    this.titleService.hideLogOut = true;
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

  //getSuggestions
  async getSuggestions() {
    try {
      const suggestInfo = await this.hintService.getSuggestions();
      if (suggestInfo['success']) {
        this.suggestions = suggestInfo['suggestions'];
      } else {
        this.presentAlert('Sorry, an error occured while trying to get suggestions');
        this.presentToast('No internet connection. Please connect to the internet', 'danger');

      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to get suggestions');
      this.presentToast('No internet connection. Please connect to the internet', 'danger');

    }
  }

  //set up onesignal
  setupPush() {
    this.onesignal.startInit('4e5b4450-3330-4ac4-a16e-c60e26ec271d', '933703398245');

    this.onesignal.inFocusDisplaying(this.onesignal.OSInFocusDisplayOption.None);

    this.onesignal.handleNotificationOpened().subscribe(data => {

    });

    this.onesignal.handleNotificationReceived().subscribe(data => {
      
    });

    this.onesignal.endInit();
    this.onesignal.getIds().then((id) => {
      const info = id
      this.authService.onesignalId({username: this.authService.userName}, info['userId']);
    })
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
              if (results[i].types[0] === "postal_code") {
                var length = results[i].address_components.length;
                var city = results[i].address_components[1].long_name;
                var state = results[i].address_components[length - 2].long_name;
                var country = results[i].address_components[length - 1].long_name;
                this.location.city = city;
                this.location.country = country;
                this.location.state = state;
                this.finalData.city = city;
                this.finalData.state = state
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
      this.chooseWeather(weather['weather'][0].main.toLowerCase())
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
              if (results[i].types[0] === "postal_code") {
                var length = results[i].address_components.length;
                var city = results[i].address_components[1].long_name;
                var state = results[i].address_components[length - 2].long_name;
                var country = results[i].address_components[length - 1].long_name;
                this.location.city = city;
                this.location.country = country;
                this.location.state = state;
                this.finalData.city = city;
                this.finalData.state = state
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
      this.chooseWeather(weather['weather'][0].main.toLowerCase())
      this.weather.icon = `http://openweathermap.org/img/w/${weather['weather'][0].icon}.png`;
     }).catch((error) => {
       this.presentAlert('Sorry, an error occured while trying to get your location');
       this.presentToast('No internet connection. Please connect to the internet', 'danger');
     });
  }

  //clear notifications
  async clearNotifications() {
    this.navCtrl.navigateForward('notifications').then(async () => {
      await this.notificationService.changeNotify({notify:this.notificationService.numberOfNotifications});
      this.notificationService.numberOfNotifications = 0;
      this.socket.emit('viewNotification', this.authService.userId);
    });
  }

  //navigations
  toTips() {
    this.navCtrl.navigateForward('tips');
  }

  toFriends() {
    this.navCtrl.navigateForward('friends');
  }

  toCloset() {
    this.navCtrl.navigateForward('closet');
  }

  //suggestions navigations
  prev() {
    this.imgIndex--
  }

  next() {
    this.imgIndex++
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

  //toast notification
  async toastShareNotification(message, color) {
    const toast = await this.toastCtrl.create({
      header: message,
      position: 'bottom',
      duration: 1000,
      color: color
    });
    toast.present();
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
            this.titleService.hideLogOut = false;
          }
        }, {
          side: 'start',
          icon: 'thumbs-down',
          text: 'No',
          handler: () => {
            this.itemSelected = false;
            this.titleService.hideLogOut = false;

          }
        }
      ]
    });
    toast.present();
  }

  //refresh location
  doRefresh(event){
    this.page = 1;
    setTimeout(() => {
      this.getGeolocation();
      this.getSeason();
      this.watchPosition();
      this.getAllNews();
      event.target.complete();
    }, 1000);
  }
}
