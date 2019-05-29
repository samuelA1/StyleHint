import { TitleService } from './../_services/title.service';
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-interest',
  templateUrl: './interest.page.html',
  styleUrls: ['./interest.page.scss'],
})
export class InterestPage implements OnInit {
  constructor(private navCtrl: NavController,
     private menu: MenuController,
     public titleService: TitleService)
      { }

  selectInterest(val: any) {
    this.titleService.appPages.map(p => {
      p.value =  p.title === 'Interest' ? val : p.value
    });
    this.titleService.interest.map(p => {
      p.isChecked =  p.val == val ? true : false;
    });
    this.navCtrl.navigateRoot('home');
    this.openCustom();
  }

  //open side menu
  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  ngOnInit() {
  }

}
