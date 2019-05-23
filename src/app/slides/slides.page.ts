import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {
  constructor(private navCtrl: NavController) { }
  @ViewChild('slides') slides: IonSlides;


  toRegister() {
    this.navCtrl.navigateForward('/signup')
  }

  //prevent slide movements
  stopSlideNext() {
    this.slides.lockSwipeToNext(true)
  }

  stopSlidePrev() {
    this.slides.lockSwipeToPrev(true)
  }

  ngOnInit() {
  }

}
