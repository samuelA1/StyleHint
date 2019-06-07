import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { TitleService } from '../_services/title.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {
  user: any = {}; // user object to be sent to the database
  error: any = {};
  loading: boolean = false; //loader on the page after the user clicks the create account button
  constructor(private navCtrl: NavController,
     private menu: MenuController,
      private titleService: TitleService) { }

   //updates Email
   updateEmail() {
    this.loading = true;
    setTimeout(() => {
      if (this.validation(this.user)) {
        this.titleService.appPages.map(p => {
          p.value =  p.title === 'email' ? this.user.email : p.value
        });
        this.loading = false;
        this.navCtrl.navigateRoot('home');
        this.openCustom();
      } else {
        this.loading = false;
      }
    }, 1000);
  }

//Validate user inputs
  validation(user: any) {
    if (user['email'].includes('@')) {
      return true;
    } else {
      this.error.email = 'Please enter a valid email.';
    }
     
      
      return false;
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
  ngOnInit() {
  }

}
