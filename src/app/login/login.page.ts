import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { TitleService } from '../_services/title.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: any = {}; // user object to be sent to the database
  error: any = {};
  loading: boolean = false; //loader on the page after the user clicks the create account button
  
    constructor(private navCtrl: NavController,
      private alertCtrl: AlertController,
      private authService: AuthService,
      private titleService: TitleService) { }
  
    //performs login
    login() {
      this.loading = true;
      setTimeout(async () => {
        this.validation(this.user);
        if (Object.keys(this.error).length == 0) {
          this.loading = false;
          try {
            const loginInfo = await this.authService.login(this.user);
            if (loginInfo['success']) {
              this.titleService.showSplitPane = false;
              this.navCtrl.navigateRoot('/home')
              this.titleService.appPages.map(p => {
                for (const key in loginInfo['user']) {
                  if (loginInfo['user'].hasOwnProperty(key)) {
                    p.value =  p.title === `${key}` ? `${loginInfo['user'][key]}` : p.value
                  }
                }
                this.titleService.genders.map(p => {
                  p.isChecked =  p.val == loginInfo['user'].gender ? true : false;
                });
                this.titleService.sizes.map(p => {
                  p.isChecked =  p.val == loginInfo['user'].size ? true : false;
                });
                this.titleService.interest.map(p => {
                  p.isChecked =  p.val == loginInfo['user'].interest ? true : false;
                });
                this.titleService.countries.map(p => {
                  p.selected =  p.name.toLowerCase() == loginInfo['user'].country ? true : false;
                });
              });
            } else {
              this.presentAlert(loginInfo['message']);
            }
          } catch (error) {
            this.presentAlert('Sorry, an error occured while trying to log in. Please try loging in again')
          }
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

    //alert ctrl
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Login Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
  
    //remove validation errors
    removeErrors() {
      this.error = {};
    }

  ngOnInit() {
  }

}
