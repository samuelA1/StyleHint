import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cookie-policy',
  templateUrl: './cookie-policy.page.html',
  styleUrls: ['./cookie-policy.page.scss'],
})
export class CookiePolicyPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  navigateBack() {
    this.navCtrl.back();
  }

}
