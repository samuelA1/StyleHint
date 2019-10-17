import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { TitleService } from '../_services/title.service';
import { CustomizeService } from '../_services/customize.service';

@Component({
  selector: 'app-name',
  templateUrl: './name.page.html',
  styleUrls: ['./name.page.scss'],
})
export class NamePage implements OnInit {

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

   //updates name
   updateName() {
    this.loading = true;
    setTimeout(async () => {
      try {
        const nameInfo = await this.customizeService.updateName(this.user);
        if (nameInfo['success']) {
          this.titleService.appPages.map(p => {
            p.value =  p.title === 'name' ? this.user.name : p.value
          });
          this.presentToast(nameInfo['message'])
          this.loading = false;
          this.navCtrl.back();
        } else {
          this.loading = false;
          this.presentAlert(nameInfo['message']);
        }
      } catch (error) {
        this.presentAlert('Sorry, an error occured while trying to update your name');
      }

    }, 1000);
  }

  //alert
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Name update error',
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
