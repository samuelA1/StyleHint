import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { TitleService } from '../_services/title.service';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.page.html',
  styleUrls: ['./gender.page.scss'],
})
export class GenderPage implements OnInit {

  constructor(private navCtrl: NavController,
    private menu: MenuController,
    public titleService: TitleService)
     { }

 selectSize(val: any) {
   this.titleService.appPages.map(p => {
     p.value =  p.title === 'gender' ? val : p.value
   });
   this.titleService.genders.map(p => {
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
