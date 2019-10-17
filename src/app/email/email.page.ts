import { CustomizeService } from './../_services/customize.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
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
      private titleService: TitleService,
      private customizeService: CustomizeService,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController) { }

      navigateBack() {
        this.navCtrl.back();
      }

   //updates Email
   updateEmail() {
    this.loading = true;
    setTimeout(async () => {
      if (this.validation(this.user)) {
        try {
          const emailInfo = await this.customizeService.updateEmail(this.user);
          if (emailInfo['success']) {
            this.titleService.appPages.map(p => {
              p.value =  p.title === 'email' ? this.user.email : p.value
            });
            this.presentToast(emailInfo['message'])
            this.loading = false;
            this.navCtrl.back();
          } else {
            this.loading = false;
            this.presentAlert(emailInfo['message']);
          }
        } catch (error) {
          this.presentAlert('Sorry, an error occured while trying to update your email');
        }
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

  //alert
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Email update error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  //toast for rating confirmation
  async presentToast(message: any) {
    const toast = await this.toastCtrl.create({
      color: 'dark',
      message: message,
      duration: 2000
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
