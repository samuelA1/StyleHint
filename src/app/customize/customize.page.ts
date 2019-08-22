import { AdminService } from './../_services/admin.service';
import { AuthService } from './../_services/auth.service';
import { CustomizeService } from './../_services/customize.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController, AlertController } from '@ionic/angular';
import { TitleService } from '../_services/title.service';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.page.html',
  styleUrls: ['./customize.page.scss'],
})
export class CustomizePage implements OnInit {
  @ViewChild('slides') slides: IonSlides;
  user: any = {};
  socket: any;

  maleElement: any = false;
  femaleElement: any = false;
  smallElement: any = false;
  mediumElement: any = false;
  largeElement: any = false;
  expensiveElement: any = false;
  casualElement: any = false;
  genderSelected = false;
  sizeSelected = true;
  interestSelected = true;

  slideOpts = {
    allowTouchMove: false
  };

  
  constructor(private navCtrl: NavController,
    private customizeService: CustomizeService,
    private adminService: AdminService,
    private alertCtrl: AlertController,
    private titleService: TitleService,
    private authService: AuthService) { 
      this.socket = io('http://www.thestylehint.com');
  }

  genderSelection(event: any) {
    this.user.age = event.detail.value;
  }

  //change slides
  nextSlide() {
    this.slides.slideNext();
  }

  prevSlide() {
    this.slides.slidePrev();
  }

  //Gender selection for slide one
  maleGender() {
    this.genderSelected = true;
    this.maleElement = true;
    this.femaleElement = false;
    this.user.gender = 'male';
    this.user.age = 'adult';
  }

  femaleGender() {
    this.genderSelected = true;
    this.femaleElement = true;
    this.maleElement = false;
    this.user.gender = 'female';
    this.user.age = 'adult';
  }

  //Size selection for slide two
  mediumSize() {
    this.sizeSelected = false;
    this.user.size = 'medium';
    this.mediumElement = true;
    this.smallElement = false;
    this.largeElement = false;
  }

  smallSize() {
    this.sizeSelected = false;
    this.user.size = 'small';
    this.mediumElement = false;
    this.smallElement = true;
    this.largeElement = false;
  }

  largeSize() {
    this.sizeSelected = false;
    this.user.size = 'large';
    this.largeElement = true;
    this.mediumElement = false;
    this.smallElement = false;
  }

  //interest for slide three
  expensive() {
    this.interestSelected = false;
    this.user.interest = 'expensive';
    this.expensiveElement = true;
    this.casualElement = false;
  }

  casual() {
    this.interestSelected = false;
    this.user.interest = 'casual';
    this.expensiveElement = false;
    this.casualElement = true;
  }

  async toHome() {
    let customizedUser = {
      gender: this.user.gender.concat(' ', this.user.age),
      size: this.user.size,
      interest: this.user.interest
    };
    try {
      const customizationInfo = await this.customizeService.customize(customizedUser);
      if (customizationInfo['success']) {
        this.titleService.showSplitPane = false;
        this.titleService.isAdmin = customizationInfo['user']['isAdmin'];
        this.navCtrl.navigateRoot('/home');
        this.updateStatistics('add')
        this.authService.userId = customizationInfo['user']['_id'];
        this.titleService.appPages.map(p => {
          for (const key in customizationInfo['user']) {
            if (customizationInfo['user'].hasOwnProperty(key)) {
              p.value =  p.title === `${key}` ? `${customizationInfo['user'][key]}` : p.value
            }
          }
          this.titleService.genders.map(p => {
            p.isChecked =  p.val == customizationInfo['user'].gender ? true : false;
          });
          this.titleService.sizes.map(p => {
            p.isChecked =  p.val == customizationInfo['user'].size ? true : false;
          });
          this.titleService.interest.map(p => {
            p.isChecked =  p.val == customizationInfo['user'].interest ? true : false;
          });
          this.titleService.countries.map(p => {
            p.selected =  p.name.toLowerCase() == customizationInfo['user'].country ? true : false;
          });
        });
      } else {
        this.presentAlert(customizationInfo['message']);
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while customizing your account. Please try again');
    }
  }

   //alert ctrl
   async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Customization Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

   //update stats
   async updateStatistics(action: any) {
    try {
      const statisticsInfo = await this.adminService.updateStatistics({action: action});
      if (statisticsInfo['success']) {
        this.socket.emit('logIn', {});
      } else {
        this.presentAlert('Sorry, an error occured while trying to update stats info')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to update stats info')
    }
  }

  ngOnInit() {
  }

}
