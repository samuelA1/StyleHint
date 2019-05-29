import { WeatherService } from './../_services/weather.service';
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { TitleService } from '../_services/title.service';

@Component({
  selector: 'app-username',
  templateUrl: './username.page.html',
  styleUrls: ['./username.page.scss'],
})
export class UsernamePage implements OnInit {
  user: any = {}; // user object to be sent to the database
  error: any = {};
  loading: boolean = false; //loader on the page after the user clicks the create account button
  constructor(private navCtrl: NavController,
     private menu: MenuController,
     private titleService: TitleService) { }
   //updates Usename
   updateUsername() {
    this.loading = true;
    setTimeout(() => {
      if (this.validation(this.user)) {
        this.titleService.appPages.map(p => {
          p.value =  p.title === 'Username' ? this.user.username : p.value
        });
        this.loading = false;
        this.navCtrl.navigateRoot('home');
        this.openCustom();
      } else {
        this.loading = false;
      }
    }, 1000);
  }

  //open side menu
  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  //remove validation errors
  removeErrors() {
    this.error = {};
  }

  //Validate user inputs
  validation(user: any) {
    if (user['username'].length >= 3) {
      return true;
    } else {
      this.error.username = 'Sorry, your username must be at least 3 characters.';
    }
    return false;
  }

  ngOnInit() {
  }

}
