import { AdminService } from './../_services/admin.service';
import { BusinessService } from './../_services/business.service';
import { HintsService } from './../_services/hints.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastController, AlertController, NavController, IonSlides, Platform, IonContent, ActionSheetController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { WeatherService } from '../_services/weather.service';
import { TitleService } from '../_services/title.service';
import { Storage } from '@ionic/storage';
import * as io from 'socket.io-client';
import * as moment from 'moment';
import * as _ from 'lodash';
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
  @ViewChild(IonContent) content: IonContent;
  allNews: any[];
  allDesigners: any[];
  newModal: boolean = false; //open modal to add new designers
  unfilteredDesigners: any[];
  selectedDesigners: any[] = [];
  preferedDesigners: any[];
  sliderConfig = {
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    zoom: false
  };
  productsPage: number = 1;
  designerId: any;
  products: any[];
  totalProducts: number;
  occasion: any = {
    occasion: ''
  };
  forDesign: boolean = false;
  counter: number = 0; //for counting selected designers
  counted: number = 0; //control toast withoptions
  searched: boolean = false; //after a search is made and a result gotten
  searchNum: number = 0; //limit the times allDesigners is stored in local storage
  actSheetNum: number = 0; //limit the times allDesigners is stored in local storage
  page: number = 1;
  search: any = ''
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
  homeHints: any; //hints for each occasion
  socket: any;
  showWeather: boolean = true; //hide or show weather

  //for controlling slides
  slideOpts = {
    initialSlide: 1,
    zoom: false
    // speed: 400
  };

  constructor(private toastCtrl: ToastController,
    private geolocation: Geolocation,
     private alertCtrl: AlertController,
     private weatherService: WeatherService,
     public titleService: TitleService,
     private hintService: HintsService,
     private authService: AuthService,
     public businessService: BusinessService,
     private newsService: NewsService,
     private adminService: AdminService,
     public notificationService: NotificationService,
     private navCtrl: NavController,
     private onesignal: OneSignal,
     private platform: Platform,
     private storage: Storage,
     private actionSheetCtrl: ActionSheetController) {
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
      this.getDesigners();
      this.occasionHints();
      this.businessService.cartDesigners();
      //get prefered designers
      this.getPreferedDesigners();
      setTimeout(() => {
        this.checkFields();
      }, 10000);
      this.socket = io('http://www.thestylehint.com')
     }

     toggleShowCase() {
       //hide weather when displaying news slide
       this.slides.getActiveIndex().then(i => {
         if (i === 0 || i === 2) {
          this.showWeather = false;
          if (i === 0) {
            setTimeout(() => {
              this.content.scrollToTop(1000);
            }, 1000);
          }
         } else {
          this.showWeather = true;
         }
         if (i === 2) {
          setTimeout(() => {
            this.content.scrollToTop(1000);
          }, 1000);
          this.forDesign = true;
          this.titleService.activateHome = false;
          } else {
            this.forDesign = false;
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

    //check if user has gender, size and interest
    checkFields() {
      if (!this.titleService.appPages[3].value || !this.titleService.appPages[4].value || !this.titleService.appPages[5].value) {
        this.presentAlert('Please make sure you selected your gender, size and interest on the side menu. This is very important as this will help us give you the best content and experience you need. Failure to do this will lead to you having no content. The gender, size or interest can be selected on the side menu to the left of your screen.')
      }
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

    //all designers for the users to choose
    async getDesigners() {
      try {
        const designersInfo = await this.businessService.getDesigners();
        if (designersInfo['success']) {
          this.allDesigners = designersInfo['designers'];
        } else {
          this.presentAlert('Sorry, an error occured while getting all designers');
        }
      } catch (error) {
        this.presentAlert('Sorry, an error occured while getting all designers');
      }
    }

    //all unselected designers
    async getUnSelectedDesigners() {
      try {
        const designersInfo = await this.businessService.getUnSelectedDesigners();
        if (designersInfo['success']) {
          this.allDesigners = designersInfo['designers'];
        } else {
          this.presentAlert('Sorry, an error occured while getting all designers');
        }
      } catch (error) {
        this.presentAlert('Sorry, an error occured while getting all designers');
      }
    }

    //open modal for adding new designers
    openNewModal() {
      this.getUnSelectedDesigners();
      this.newModal = !this.newModal;
    }

    //designers by occasion
    async getDesignersByOccasion() {
      try {
        const designersInfo = await this.businessService.getDesignersOccasion(this.occasion);
        if (designersInfo['success']) {
          this.allDesigners = designersInfo['designers'];
        } else {
          this.presentAlert('Sorry, an error occured while getting all designers for that occasion.');
        }
      } catch (error) {
        this.presentAlert('Sorry, an error occured while getting all designers for that occasion.');
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

      //when news is liked or unliked
      this.socket.on('toggleLiked', async news => {
        this.getAllNews();
      });

      //a designer adds a product for review
      this.socket.on('designReviewed', ownerId => {
        if (this.titleService.isAdmin) {
          this.notificationService.adminAlertNumber();
          this.toastShareNotification('A product has just been submitted for review.', 'success');
        }
      });

      //after admin review
      this.socket.on('reviewDecision', ownerId => {
        if (ownerId === this.authService.userId) {
          this.notificationService.notifyNumber();
          this.toastShareNotification('A decision has just been made on one of your submitted products.', 'tertiary');
        }
        if (this.titleService.isAdmin) {
          this.notificationService.adminAlertNumber();
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
  async chooseOccasion(occasion: any) {
    this.finalData.occasion = occasion;
    this.titleService.finalData = this.finalData;
    this.navCtrl.navigateForward('fashion');
    this.storage.set('finalData', JSON.stringify(this.finalData));
  }

  //occasion hints
  async occasionHints() {
    try {
      const sortedInfo = await this.hintService.getOccasionHint();
      if (sortedInfo['success']) {
        this.homeHints = sortedInfo['hints'];
      } else {
        this.presentAlert('Sorry, an error occured while getting all hints');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting all hints');
    }
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

  //select and chose designers of interest
  async selectDesigner(occasion: any, i: any) {
    this.selectSearchDesigners(occasion, i);
    this.allDesigners.map(o => {
          if (o.occasion === occasion) {
            if (o.designers[i].chose > 0) {
              this.counter--
              o.designers[i].chose = 0;
              this.selectedDesigners.splice(this.selectedDesigners.findIndex(x => x == o.designers[i]._id), 1);
            } else if (o.designers[i].chose === 0) {
              this.counter++
              o.designers[i].chose = this.counter;
              this.selectedDesigners.push(o.designers[i]._id);
            } else {
              this.counter++
              o.designers[i] = Object.assign({chose: this.counter}, o.designers[i]);
              this.selectedDesigners.push(o.designers[i]._id);
            }
          }
        });
    
        this.storage.set('designers', JSON.stringify(this.allDesigners));
        
        if (this.counter > 4 && this.counter == 5 && this.counted == 0) {
          this.counted = 1;
          this.presentToastWithOptions();
        } else if (this.counter < 5) {
          this.toastCtrl.dismiss();
          if (this.counted > 0) {
            this.counted = 0
          } else if (this.counted == 0) {
            this.counted = 0;
          }
        } 
  }

  async selectSearchDesigners(occasion: any, i: any) {
    let designers = JSON.parse(await this.storage.get('designers'));
    designers.map(o => {
      if (o.occasion === occasion) {
        if (o.designers[i].chose > 0) {
          o.designers[i].chose = 0;
        } else if (o.designers[i].chose === 0) {
          o.designers[i].chose = this.counter;
        } else {
          o.designers[i] = Object.assign({chose: this.counter}, o.designers[i]);
        }
      }
    })
    this.storage.set('designers', JSON.stringify(designers));
  }

  //add selected designers to users collection
 async  afterSelection() {
    try {
      const designersInfo = await this.businessService.addSelectedDesigners({designers: this.selectedDesigners});
      if (designersInfo['success']) {
        this.businessService.numDesigners = this.selectedDesigners.length;
        this.getPreferedDesigners();
        setTimeout(() => {
          this.content.scrollToTop(1000);
        }, 1000);
      } else {
        this.presentAlert('Sorry, an error occured while adding your favorite designers to your collection.');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while adding your favorite designers to your collection.');
    }
  }

  //search designers
  async searchDesigners() {
    if (this.searchNum === 0) {
      this.storage.set('designers', JSON.stringify(this.allDesigners));
      this.searchNum++;
    }
    this.searched = true;
    let designers = [];
    if (this.search) {
      let toBeSearched = JSON.parse(await this.storage.get('designers'))
      toBeSearched.forEach(des => {
        let result = des.designers.filter(de => de.username.includes(this.search.toLowerCase()));
         if (result.length !== 0) {
           designers.push({occasion: des.occasion, designers: result});
          this.allDesigners = designers;
        } 
      });
    } else {
      this.searched = false;
      this.allDesigners = JSON.parse(await this.storage.get('designers'));
    }
    
  }

  //set up onesignal
  setupPush() {
    this.onesignal.startInit('4e5b4450-3330-4ac4-a16e-c60e26ec271d', '933703398245');

    this.onesignal.inFocusDisplaying(this.onesignal.OSInFocusDisplayOption.None);

    this.onesignal.handleNotificationOpened().subscribe(data => {
      this.navCtrl.navigateForward('notifications');
    });

    this.onesignal.handleNotificationReceived().subscribe(data => {
      
    });

    this.onesignal.endInit();
    this.onesignal.getIds().then((id) => {
      this.authService.onesignalId({username: this.authService.userName}, id['userId']);
    });
    
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
    this.navCtrl.navigateForward('notifications');
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

  async presentToastWithOptions() {
    const toast = await this.toastCtrl.create({
      header: 'All set and ready to go?',
      position: 'top',
      animated: true,
      color: 'medium',
      buttons: [
        {
          side: 'end',
          text: 'Yes',
          handler: () => {
            this.afterSelection();
          }
        }
      ]
    });
    toast.present();
  }

  //for adding new designers to collection
  async addNewDesigner() {
    const toast = await this.toastCtrl.create({
      header: 'Add selected designers to collection?',
      position: 'top',
      animated: true,
      color: 'medium',
      buttons: [
        {
          side: 'end',
          text: 'Yes',
          handler: () => {
            this.afterSelection();
            this.newModal = false;
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

  async presentOccasionActionSheet() {
    if (this.actSheetNum === 0) {
      this.storage.set('designers', JSON.stringify(this.allDesigners));
      this.actSheetNum++;
    }
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Occasions',
      buttons: [
        {
          text: 'All Designers',
          handler: async () => {
            this.allDesigners = JSON.parse(await this.storage.get('designers'));
            setTimeout(() => {
              this.content.scrollToTop(1000);
            }, 1000);
          }
        },
        {
        text: `${this.occasions[0].name}`,
        handler: () => {
          this.occasion.occasion = `${this.occasions[0].name}`;
          this.getDesignersByOccasion();
           setTimeout(() => {
              this.content.scrollToTop(1000);
            }, 1000);
        }
      }, {
        text: `${this.occasions[1].name}`,
        handler: () => {
          this.occasion.occasion = `${this.occasions[1].name}`;
          this.getDesignersByOccasion();
           setTimeout(() => {
              this.content.scrollToTop(1000);
            }, 1000);
        }
      }, {
        text: `${this.occasions[2].name}`,
        handler: () => {
          this.occasion.occasion = `${this.occasions[2].name}`;
          this.getDesignersByOccasion();
           setTimeout(() => {
              this.content.scrollToTop(1000);
            }, 1000);
        }
      },
       {
        text: `${this.occasions[3].name}`,
        handler: () => {
          this.occasion.occasion = `${this.occasions[3].name}`;
          this.getDesignersByOccasion();
           setTimeout(() => {
              this.content.scrollToTop(1000);
            }, 1000);
        }
      }, 
      {
        text: `${this.occasions[4].name}`,
        handler: () => {
          this.occasion.occasion = `${this.occasions[4].name}`;
          this.getDesignersByOccasion();
           setTimeout(() => {
              this.content.scrollToTop(1000);
            }, 1000);
        }
      },
      {
        text: `${this.occasions[5].name}`,
        handler: () => {
          this.occasion.occasion = `${this.occasions[5].name}`;
          this.getDesignersByOccasion();
           setTimeout(() => {
              this.content.scrollToTop(1000);
            }, 1000);
        }
      },
      {
        text: `${this.occasions[6].name}`,
        handler: () => {
          this.occasion.occasion = `${this.occasions[6].name}`;
          this.getDesignersByOccasion();
           setTimeout(() => {
              this.content.scrollToTop(1000);
            }, 1000);
        }
      },
      {
        text: `${this.occasions[7].name}`,
        handler: () => {
          this.occasion.occasion = `${this.occasions[7].name}`;
          this.getDesignersByOccasion();
           setTimeout(() => {
              this.content.scrollToTop(1000);
            }, 1000);
        }
      },
      {
        text: `${this.occasions[8].name}`,
        handler: () => {
          this.occasion.occasion = `${this.occasions[8].name}`;
          this.getDesignersByOccasion();
           setTimeout(() => {
              this.content.scrollToTop(1000);
            }, 1000);
        }
      }
    ]
    });
    await actionSheet.present();
  }

  /******************************************* Designers************************************* */
//all designers for the users to choose
  async getPreferedDesigners() {
    try {
      const designersInfo = await this.businessService.getPreferedDesigners();
      if (designersInfo['success']) {
        this.preferedDesigners = designersInfo['designers'];
        if (this.preferedDesigners.length !== 0) {
          this.getProducts(this.preferedDesigners[0]._id);
        }
      } else {
        this.presentAlert('Sorry, an error occured while getting all designers');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting all designers');
    }
  }

  //get product of selected designer
  async getProducts(designerId: any) {
    this.productsPage = 1;
    this.designerId = designerId;
    this.preferedDesigners.map(d => {
      d.selected = d._id == designerId ? true : false;
    })
    try {
      const designersProducts = await this.businessService.designersProducts({owner: designerId}, this.productsPage);
      if (designersProducts['success']) {
        this.products = designersProducts['products'];
        this.totalProducts = designersProducts['totalProducts']
      } else {
        this.presentAlert('Sorry, an error occured while getting all products of the selected designer.');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting all products of the selected designer.');
    }
  }

  async deleteDesigner(id: any, name: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm designer delete',
      message: `Are you sure you want to remove ${name} from your designer collection?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'remove',
          cssClass: 'delete',
          handler: () => {
            this.removeDesigner(id);
          }
        }
      ]
    });

    await alert.present();
  }

  async removeDesigner(id: any) {
    try {
      const removeDesigner = await this.businessService.removeSelectedDesigner(id);
      if (removeDesigner['sucess']) {
        this.preferedDesigners.splice(this.preferedDesigners.findIndex(d => d._id == id), 1);
        this.getPreferedDesigners();
      } else {
        this.presentAlert('Sorry, an error occured while removing a designer.');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while removing a designer.');
    }
  }

  loadProducts(event: any) {
    this.productsPage++
    setTimeout(() => {
      this.businessService.designersProducts({owner: this.designerId}, this.productsPage).then((productsInfo) => {
        productsInfo['products'].forEach((products: any) => {
          this.products.push(products)
        });
        event.target.complete();
      });
  
      if (this.allNews.length == this.totalNews) {
        event.target.disabled = true;
      }
    }, 800);
  }

  //nav to product
  toProduct(productId: any) {
    this.adminService.productId = productId;
    this.adminService.navFromProduct = 'home';
    this.navCtrl.navigateForward('product');
  }

    //for adding new designers to collection
    async selectNewDesigner(occasion: any, i: any) {
      this.allDesigners.map(o => {
            if (o.occasion === occasion) {
              if (o.designers[i].chose > 0) {
                this.counter--
                o.designers[i].chose = 0;
                this.selectedDesigners.splice(this.selectedDesigners.findIndex(x => x == o.designers[i]._id), 1);
              } else if (o.designers[i].chose === 0) {
                this.counter++
                o.designers[i].chose = this.counter;
                this.selectedDesigners.push(o.designers[i]._id);
              } else {
                this.counter++
                o.designers[i] = Object.assign({chose: this.counter}, o.designers[i]);
                this.selectedDesigners.push(o.designers[i]._id);
              }
            }
          });
                
          if (this.counter > 0 && this.counted == 0) {
            this.counted = 1;
            this.addNewDesigner();
          } else if (this.counter < 1) {
            this.toastCtrl.dismiss();
            if (this.counted > 0) {
              this.counted = 0
            } else if (this.counted == 0) {
              this.counted = 0;
            }
          } 
    }
}