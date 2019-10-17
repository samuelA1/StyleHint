import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { CustomizeService } from '../_services/customize.service';

@Component({
  selector: 'app-update-card',
  templateUrl: './update-card.page.html',
  styleUrls: ['./update-card.page.scss'],
})
export class UpdateCardPage implements OnInit {

 card: any = {
   number: ''
 }; //card object to be sent to the database
  loading: boolean = false; //loader on the page after thecard clicks the create account button
  constructor(private navCtrl: NavController,
     private customizeService: CustomizeService,
     private alertCtrl: AlertController,
     private toastCtrl: ToastController) {
      if (this.customizeService.cardId !== '') {
        this.getCard();
      }
      }

     navigateBack() {
      this.navCtrl.navigateBack('card');
    }

    //getcard
  async getCard() {
    try {
      const cardInfo = await this.customizeService.getCard();
      if (cardInfo['success']) {
        this.card.cvc = cardInfo['card'].cvc;
        this.card.zip = cardInfo['card'].zip;
        this.card.expMonth = cardInfo['card'].expMonth;
        this.card.expYear = cardInfo['card'].expYear;
        this.card.number = `${cardInfo['card'].number}`.substr(`${cardInfo['card'].number}`.length - 4)
      } else {
        this.presentAlert('Sorry, an error occured while trying to get a card');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to get a card');
    }
  }


   //updatecard
   updateCard() {
    this.loading = true;
    setTimeout(async () => {
      try {
        const cardInfo = await this.customizeService.updateCard(this.card);
        if (cardInfo['success']) {
          this.presentToast(cardInfo['message'])
          this.loading = false;
          this.navCtrl.navigateBack('card');
        } else {
          this.loading = false;
          this.presentAlert('Sorry, an error occured while trying to update a card');
        }
      } catch (error) {
        this.presentAlert('Sorry, an error occured while trying to update a card');
      }
    }, 1000);
  }

  //alert
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'card error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
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

  ngOnInit() {
  }

}
