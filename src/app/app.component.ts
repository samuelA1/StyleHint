import { AuthService } from './_services/auth.service';
import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';

import { Platform, NavController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { TitleService } from './_services/title.service';
import { NotificationService } from './_services/notification.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private screenOrientation: ScreenOrientation,
    public titleService: TitleService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private storage: Storage,
    private navCtrl: NavController,
    private menu: MenuController
  ) {
    this.initializeApp();
    //root navigation
    this.storage.get('token').then(async (data) => {
      if (data) {
        let userInfo = await this.storage.get('user');
        let user = JSON.parse(userInfo);
        const loginInfo = await this.authService.autoLogin({email: user['email']});
        if (loginInfo['success']) {
          this.titleService.isAdmin = user['isAdmin'];
          this.navCtrl.navigateRoot('home');
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

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.titleService.modal = false;
    });
  }

  logout() {
    this.menu.close('custom');
    this.menu.close('first');
    this.titleService.showSplitPane = true;
    this.storage.clear();
    this.navCtrl.navigateRoot('slides');
  }

  //navigation to admin
  toAdmin() {
    this.titleService.goToAdmin = true;
    this.navCtrl.navigateRoot('menu');
    this.menu.enable(false, 'custom');
  }

  //navigation back to user view
  toUser() {
    this.menu.enable(false, 'first');
    this.titleService.goToAdmin = false;
    this.navCtrl.navigateRoot('home')
  }
}
