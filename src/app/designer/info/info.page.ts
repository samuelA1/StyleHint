import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { AdminService } from 'src/app/_services/admin.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})
export class InfoPage implements OnInit {

  user: any = {
    description:  '',
    stripeAcct: '',
    category: ''
  }; // user object to be sent to the database
  error: any = {};
  loading: boolean = false; //loader on the page after the user clicks the create account button

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
  
    constructor(
       private alertCtrl: AlertController,
       private toastCtrl: ToastController,
       private adminService: AdminService,
       private authService: AuthService) {
         this.adminService.id = this.authService.userId;
          if (this.adminService.id !== '') {
            this.getUser();
          }
        }

       //get total users
  async getUser() {
    try {
      const userInfo = await this.adminService.getUser();
      if (userInfo['success']) {
        this.user = Object.assign({}, {
                                       stripeAcct: `${userInfo['user']['stripeAcct']}`,
                                       description: `${userInfo['user']['description']}`,
                                       category: userInfo['user']['category'],
                                       });
      } else {
        this.presentAlert('Sorry, an error occured while getting a user');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting a user');
    }
  }
  
    //performs update
    async updateUser() {
      this.loading = true;
      setTimeout(async () => {
        if (Object.keys(this.error).length == 0) {
          this.loading = false;
          if (this.user.category.length === 1) {
            try {
              const updateInfo = await this.adminService.updateUser(this.user);
              if (updateInfo['success']) {
                this.presentToast('Info successfully updated.')
              } else {
                this.presentAlert(updateInfo['message']);
              }
            } catch (error) {
              this.presentAlert('Sorry, an error occured while trying to update an account')
            }
          } else {
            this.presentAlert('Sorry, a designer must have at least and only one interested occasion')
          }
        } else {
          this.loading = false;
        }
      }, 1000);
    }
  
  
    //alert ctrl
    async presentAlert(message: any) {
      const alert = await this.alertCtrl.create({
        header: 'Update error',
        message: message,
        buttons: ['OK']
      });
  
      await alert.present();
    }

     //toast
  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: 'dark',
      position: 'bottom',
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
