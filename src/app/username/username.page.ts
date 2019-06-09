import { CustomizeService } from './../_services/customize.service';
import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, AlertController, ToastController } from '@ionic/angular';
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
     private titleService: TitleService,
     private customizeService: CustomizeService,
     private alertCtrl: AlertController,
     private toastCtrl: ToastController) { }
   //updates Username
   updateUsername() {
    this.loading = true;
    setTimeout(async () => {
      if (this.validation(this.user)) {
        try {
          const usernameInfo = await this.customizeService.updateUsername(this.user);
          if (usernameInfo['success']) {
            this.titleService.appPages.map(p => {
              p.value =  p.title === 'username' ? this.user.username : p.value
            });
            this.presentToast(usernameInfo['message'])
            this.loading = false;
            this.navCtrl.navigateRoot('home');
            this.openCustom();
          } else {
            this.loading = false;
            this.presentAlert(usernameInfo['message']);
          }
        } catch (error) {
          this.presentAlert('Sorry, an error occured while trying to update your username');
        }

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

  //alert
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Username update error',
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
