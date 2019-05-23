import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
})
export class SlidesPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  toRegister() {
    this.navCtrl.navigateForward('/signup')
  }

  ngOnInit() {
  }

}
