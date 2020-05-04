import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { CustomizeService } from '../_services/customize.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  cards: any[] = [];

amex: boolean = false;
visa: boolean = false;
union: boolean = false;
master: boolean = false;
maestro: boolean = false;
discover: boolean = false;
jcb: boolean = false;
diners: boolean = false;

visaRegex = RegExp('^4\\d{0,15}');
amexRegex = RegExp('^3[47]\\d{0,13}');
discoverRegex = RegExp('^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}');
dinersRegex = RegExp('^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}');
masterRegex = RegExp('^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}');
jcbRegex = RegExp('^(?:35\\d{0,2})\\d{0,12}');
maestroRegex = RegExp('^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}');
unionRegex = RegExp('^62\\d{0,14}');

  constructor(private navCtrl: NavController,
    private customizeService: CustomizeService,
     private alertCtrl: AlertController,
     private toastCtrl: ToastController) {
       this.getCard();
      }

  ngOnInit() {
  }

  navigateBack() {
    this.navCtrl.navigateBack('profile');
  }

  toCard() {
    this.customizeService.navTo = 'card';
    this.navCtrl.navigateRoot('add-card', {animationDirection: 'forward'});
  }

  //nav to update card
  toUpdate(id: any) {
    this.customizeService.cardId = id;
    this.navCtrl.navigateRoot('update-card', {animationDirection: 'forward'});
  }

  //get card
  async getCard() {
    try {
      const cardInfo = await this.customizeService.getCardsAddresses();
      if (cardInfo['success']) {
        cardInfo['cards'].forEach(c => {
          if (this.visaRegex.test(c['number'])) {
           this.cards.push(Object.assign({visa: true, num: `${c.number}`.substr(`${c.number}`.length - 4)}, c));
          } 
          else if(this.amexRegex.test(c['number'])) {
           this.cards.push(Object.assign({amex: true, num: `${c.number}`.substr(`${c.number}`.length - 4)}, c));      }
          else if(this.discoverRegex.test(c['number'])) {
           this.cards.push(Object.assign({discover: true, num: `${c.number}`.substr(`${c.number}`.length - 4)}, c));      }
          else if(this.dinersRegex.test(c['number'])) {
           this.cards.push(Object.assign({diners: true, num: `${c.number}`.substr(`${c.number}`.length - 4)}, c));      }
          else if(this.masterRegex.test(c['number'])) {
           this.cards.push(Object.assign({master: true, num: `${c.number}`.substr(`${c.number}`.length - 4)}, c));      }
          else if(this.maestroRegex.test(c['number'])) {
           this.cards.push(Object.assign({maestro: true, num: `${c.number}`.substr(`${c.number}`.length - 4)}, c));      }
          else if(this.jcbRegex.test(c['number'])) {
           this.cards.push(Object.assign({jcb: true, num: `${c.number}`.substr(`${c.number}`.length - 4)}, c));      }
          else if(this.unionRegex.test(c['number'])) {
           this.cards.push(Object.assign({union: true, num: `${c.number}`.substr(`${c.number}`.length - 4)}, c));     }
        });
      } else {
        this.presentAlert('Sorry, an error occured while trying to get your card');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to get your card');
    }
  }

  //get card
  async removeCard(id: any) {
    try {
      const cardInfo = await this.customizeService.removeCard(id);
      if (cardInfo['success']) {
        this.getCard();
        this.presentToast(cardInfo['message']);
      } else {
        this.presentAlert('Sorry, an error occured while trying to remove an card');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to remove an card');
    }
  }

  async deleteCard(id: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm card delete',
      message: `Are you sure you want to remove this card?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'remove',
          cssClass: 'delete',
          handler: () => {
            this.removeCard(id);
          }
        }
      ]
    });

    await alert.present();
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
}
