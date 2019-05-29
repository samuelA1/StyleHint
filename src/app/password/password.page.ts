import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  user: any = {}; // user object to be sent to the database
  error: any = {};
  loading: boolean = false; //loader on the page after the user clicks the create account button
  constructor(private navCtrl: NavController, private menu: MenuController) { }
   //updates password
   updatePassword() {
    this.loading = true;
    setTimeout(() => {
      this.validation(this.user);
      if (Object.keys(this.error).length == 0) {
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
    if (user['oldPassword'].length >= 8) {
    } else {
      this.error.oldPassword = 'Sorry, your old password must be at least 8 characters';
    }

    if (user['newPassword'].length >= 8) { 
    } else {
      this.error.newPassword = 'Sorry, your new password must be at least 8 characters';
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
