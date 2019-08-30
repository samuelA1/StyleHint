import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-terms-use',
  templateUrl: './terms-use.page.html',
  styleUrls: ['./terms-use.page.scss'],
})
export class TermsUsePage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  navigateBack() {
    this.navCtrl.back();
  }

}
