import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, NavController } from '@ionic/angular';

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
  petiteElement: any = false;
  plusElement: any = false;
  tallElement: any = false;
  expensiveElement: any = false;
  casualElement: any = false;
  genderSelected = false;
  sizeSelected = true;
  interestSelected = true;

  slideOpts = {
    allowTouchMove: false
  };

  
  constructor(private navCtrl: NavController) { 
    
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
  plusSize() {
    this.sizeSelected = false;
    this.user.size = 'plus';
    this.plusElement = true;
    this.petiteElement = false;
    this.tallElement = false;
  }

  petiteSize() {
    this.sizeSelected = false;
    this.user.size = 'petite';
    this.plusElement = false;
    this.petiteElement = true;
    this.tallElement = false;
  }

  tallSize() {
    this.sizeSelected = false;
    this.user.size = 'tall';
    this.tallElement = true;
    this.plusElement = false;
    this.petiteElement = false;
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

  toHome() {
    this.navCtrl.navigateRoot('/home')
  }

  ngOnInit() {
  }

}
