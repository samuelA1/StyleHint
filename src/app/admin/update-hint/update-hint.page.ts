import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/_services/admin.service';


@Component({
  selector: 'app-update-hint',
  templateUrl: './update-hint.page.html',
  styleUrls: ['./update-hint.page.scss'],
})
export class UpdateHintPage implements OnInit {
  hint: any = {
    occasion: '',
    season: '',
    weather: '',
    size: '',
    country: '',
    gender: '',
    interest: '',
    image: ''
  };
  //seasons array
  seasons: any[] = [
    {name: 'winter'},
    {name: 'spring'},
    {name: 'summer'},
    {name: 'fall'},
  ]
  
  // weather array
  weathers: any[] =[
    {name: 'clear'},
    {name: 'rain'},
    {name: 'smoke'},
    {name: 'clouds'},
    {name: 'haze'},
    {name: 'mist'},
    {name: 'thunderstorm'},
    {name: 'snow'},
  ]
  
  //occasion/event array
  occasions: any[] = [
    {name: 'school'},
    {name: 'sport'},
    {name: 'birthday party'},
    {name: 'halloween'},
    {name: 'christmas'},
    {name: 'church'},
    {name: 'date night'},
    {name: 'job interview'},
    {name: 'culture'},
  ]
  
  //list of sizes
  sizes: any = [
    { name: 'small'},
    { name: 'medium' },
    { name: 'large' },
  ];
  
   //list of genders
   genders: any = [
      { name: 'male adult' },
      { name: 'male kid' },
      { name: 'female adult'},
      { name: 'female kid'},
    ];
  
    //list of interest
    interests: any = [
      { name: 'expensive'},
      { name: 'casual' },
    ];
    constructor(
      private alertCtrl: AlertController,
      private adminService: AdminService,
      private toastCtrl: ToastController,
      private navCtrl: NavController) {
        this.getHint();
      }

      ngOnInit() {
      }
    
  
    async getHint() {
      try {
        const hintInfo = await this.adminService.getHint();
        if (hintInfo['success']) {
          this.hint = hintInfo['hint'];
        } else {
          this.presentAlert('Sorry, an error occured while getting a hint');
        }
      } catch (error) {
        this.presentAlert('Sorry, an error occured while getting a hint');
      }
    }


    async updateHint() {
      try {
       const form = new FormData();
       for(const key in this.hint) {
        if (this.hint.hasOwnProperty(key)) {
          if(key == 'gender') {
            form.append(
              'gender',
              this.hint.gender,
            );
            
          } else {
            form.append(key, this.hint[key])
          }
        }
      }
      const hintInfo = await this.adminService.updateHint(form);
      if (hintInfo['success']) {
          this.presentToast(hintInfo['message']);
          this.navCtrl.navigateRoot('menu').then(() => {
            this.navCtrl.navigateRoot('all-hints');
          })
      } else {
          this.presentAlert(hintInfo['message']);
      } 
      } catch (error) {
          this.presentAlert('Sorry, an error occured while trying to add a hint.')
      }
    }
  
    //toast
    async presentToast(message: any) {
      const toast = await this.toastCtrl.create({
        message: message,
        duration: 2000,
        color: 'dark',
      });
      toast.present();
    }
  
    //alert ctrl
    async presentAlert(message: any) {
      const alert = await this.alertCtrl.create({
        header: 'Hint Error',
        message: message,
        buttons: ['OK']
      });
  
      await alert.present();
    }

}
