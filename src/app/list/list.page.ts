import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { TitleService } from '../_services/title.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {


    constructor(private navCtrl: NavController,
       private menu: MenuController,
       public titleService: TitleService) { }

    
  //open side menu
  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  selectCountry(name: any) {
    this.titleService.appPages.map(p => {
      p.value =  p.title === 'country' ? name : p.value;
    });

    this.titleService.countries.map(p => {
      p.selected =  p.name.toLowerCase() == name.toLowerCase() ? true : false;
    });

    this.navCtrl.navigateRoot('home');
    this.openCustom();
  }

  ngOnInit() {
  }
}
