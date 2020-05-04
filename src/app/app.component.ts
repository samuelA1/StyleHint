import { AdminService } from './_services/admin.service';
import { AuthService } from './_services/auth.service';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';

import { Platform, NavController, MenuController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { TitleService } from './_services/title.service';
import { NotificationService } from './_services/notification.service';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  socket: any;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private screenOrientation: ScreenOrientation,
    public titleService: TitleService,
    private authService: AuthService,
    private adminService: AdminService,
    private notificationService: NotificationService,
    private storage: Storage,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private menu: MenuController,
  ) {
    this.initializeApp();
    this.processing();
    this.socket = io('http://www.thestylehint.com');
   
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }

 
  //routes the user and sets up the app
  processing() {
     //root navigation
     this.storage.get('token').then(async (data) => {
      if (data) {
        let userInfo = await this.storage.get('user');
        let user = JSON.parse(userInfo);
        const loginInfo = await this.authService.autoLogin({email: user['email']});
        if (loginInfo['success']) {
          this.titleService.isAdmin = user['isAdmin'];
          this.titleService.isDesigner = user['isDesigner'];
          this.titleService.actMenu = false;
          this.navCtrl.navigateRoot('home');
          this.updateStatistics('add');
          this.titleService.showSplitPane = false;
          this.notificationService.notifyNumber();
        } else {
            this.navCtrl.navigateRoot('slides');
            this.titleService.showSplitPane = true;
        }
       
      } else {
        this.navCtrl.navigateRoot('slides');
        this.titleService.showSplitPane = true;
      }
    })
    

    //weather and location data
    this.storage.get('finalData').then((data)=> {
     if (data) {
       this.titleService.finalData = JSON.parse(data);
     } else {
       this.titleService.finalData = {};
     }
    });

    //get user data
    this.storage.get('user').then((data)=> {
      if (data) {
        let user = JSON.parse(data);
        this.authService.userId = user['_id'];
        this.authService.userName = user['username'];
        this.titleService.appPages.map(p => {
        for (const key in user) {
          if (user.hasOwnProperty(key)) {
            p.value =  p.title === `${key}` ? `${user[key]}` : p.value
          }
        }
        this.titleService.genders.map(p => {
          p.isChecked =  p.val == user.gender ? true : false;
        });
        this.titleService.sizes.map(p => {
          p.isChecked =  p.val == user.size ? true : false;
        });
        this.titleService.interest.map(p => {
          p.isChecked =  p.val == user.interest ? true : false;
        });
        this.titleService.countries.map(p => {
          p.selected =  p.name.toLowerCase() == user.country ? true : false;
        });
      });
      }
     })
  }

  logout() {
    this.updateStatistics('subtract').then(() => {
      this.storage.clear();
      this.menu.close('custom');
      this.menu.close('first');
      this.menu.close('second');
      this.titleService.showSplitPane = true;
      this.notificationService.numberOfNotifications = 0;
      this.navCtrl.navigateRoot('slides');
    });
  }

  //navigation to admin
  toAdmin() {
    this.notificationService.adminAlertNumber();
    this.titleService.goToAdmin = true;
    this.titleService.actMenu = true;
    this.navCtrl.navigateRoot('menu');
    this.menu.enable(false, 'custom');
  }

  //navigation to designer
  toDesigner() {
    this.titleService.goToDesigner = true;
    this.titleService.actMenu = true;
    this.navCtrl.navigateRoot('designer');
    this.menu.enable(false, 'custom');
  }

  //navigation back to user view
  toUser() {
    this.menu.enable(false, 'first');;
    this.menu.enable(false, 'second');;
    this.titleService.goToAdmin = false;
    this.titleService.goToDesigner = false;
    this.titleService.actMenu = false;
    this.navCtrl.navigateRoot('home')
  }

  //update stats
  async updateStatistics(action: any) {
    try {
      const statisticsInfo = await this.adminService.updateStatistics({action: action});
      if (statisticsInfo['success']) {
        if (`${action}` === 'add') {
          this.socket.emit('logIn', {});
        } else {
          this.socket.emit('logOut', {});
        }
      } else {
        this.presentAlert('Sorry, an error occured while trying to login');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to login');
    }
  }

  actHome() {
    if (this.titleService.activateHome) {
      this.titleService.activateHome = false;
    } else {
      this.titleService.activateHome = true;
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

}
