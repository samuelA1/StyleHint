import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any = {}; // user object to be sent to the database
  error: any = {};
  loading: boolean = false; //loader on the page after the user clicks the create account button
  
    constructor(private navCtrl: NavController) { }
  
    //performs login
    login() {
      this.loading = true;
      setTimeout(() => {
        this.validation(this.user);
        if (Object.keys(this.error).length == 0) {
          this.loading = false;
          this.navCtrl.navigateRoot('/home')
        } else {
          this.loading = false;
        }
      }, 1000);
    }
  
  //Validate user inputs
    validation(user: any) {
      if (user['password'].length >= 8) {
      } else {
        this.error.password = 'Sorry, your password must be at least 8 characters';
      }
      if (user['email'].includes('@')) {
      } else {
        this.error.email = 'Please enter a valid email.';
      }
     
      
      return false;
    }
  
    //remove validation errors
    removeErrors() {
      this.error = {};
    }

  ngOnInit() {
  }

}
