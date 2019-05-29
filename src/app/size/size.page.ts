import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { TitleService } from '../_services/title.service';

@Component({
  selector: 'app-size',
  templateUrl: './size.page.html',
  styleUrls: ['./size.page.scss'],
})
export class SizePage implements OnInit {

  constructor(private navCtrl: NavController,
    private menu: MenuController,
    public titleService: TitleService)
     { }

 selectSize(val: any) {
   this.titleService.appPages.map(p => {
     p.value =  p.title === 'Size' ? val : p.value
   });
   this.titleService.sizes.map(p => {
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
