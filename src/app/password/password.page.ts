import { CustomizeService } from './../_services/customize.service';
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class PasswordPage implements OnInit {
  user: any = {}; // user object to be sent to the database
  error: any = {};
  loading: boolean = false; //loader on the page after the user clicks the create account button
  constructor(private navCtrl: NavController,
     private menu: MenuController,
     private customizeService: CustomizeService,
     private alertCtrl: AlertController,
     private toastCtrl: ToastController) { }
   //updates password
   updatePassword() {
    this.loading = true;
    setTimeout(async () => {
      this.validation(this.user);
      if (Object.keys(this.error).length == 0) {
        try {
          const passwordInfo = await this.customizeService.updatePassword(this.user);
          if (passwordInfo['success']) {
            this.presentToast(passwordInfo['message'])
            this.loading = false;
            this.navCtrl.navigateRoot('home');
            this.openCustom();
          } else {
            this.loading = false;
            this.presentAlert(passwordInfo['message']);
          }
        } catch (error) {
          this.presentAlert('Sorry, an error occured while trying to update your password');
        }
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

  //alert
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Password update error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  //toast for rating confirmation
  async presentToast(message: any) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      color: 'dark',
    });
    toast.present();
  }
  //remove validation errors
  removeErrors() {
    this.error = {};
  }
  ngOnInit() {
  }

}
