import { Storage } from '@ionic/storage';
import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { TitleService } from './_services/title.service';


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
    private storage: Storage,
    private navCtrl: NavController
  ) {
    this.initializeApp();
    //root navigation
    this.titleService.showSplitPane = false;
    this.navCtrl.navigateRoot('home');

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
      let user = JSON.parse(data);
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
     })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
    });
  }
}
