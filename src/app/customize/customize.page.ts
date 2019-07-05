import { CustomizeService } from './../_services/customize.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController, AlertController } from '@ionic/angular';
import { TitleService } from '../_services/title.service';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.page.html',
  styleUrls: ['./customize.page.scss'],
})
export class CustomizePage implements OnInit {
  @ViewChild('slides') slides: IonSlides;
  user: any = {};

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
    private alertCtrl: AlertController,
    private titleService: TitleService) { 
    
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
    this.user.size = 'medium size';
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
        this.navCtrl.navigateRoot('/home');
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

  ngOnInit() {
  }

}
