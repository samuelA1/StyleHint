import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-customize',
  templateUrl: './customize.page.html',
  styleUrls: ['./customize.page.scss'],
})
export class CustomizePage implements OnInit {
  @ViewChild('slides') slides: IonSlides;

  maleElement: any = false;
  femaleElement: any = false;
  kidElement: any = false;
  genderSelected = false;

  slideOpts = {
    allowTouchMove: false
  };

  
  constructor() { 
    
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
    this.kidElement = false;
  }

  femaleGender() {
    this.genderSelected = true;
    this.femaleElement = true;
    this.maleElement = false;
    this.kidElement = false;
  }

  kidGender() {
    this.genderSelected = true;
    this.kidElement = true;
    this.maleElement  = false;
    this.femaleElement = false;
  }

  ngOnInit() {
  }

}
