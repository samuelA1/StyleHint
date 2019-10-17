import { TitleService } from './../_services/title.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController } from '@ionic/angular';
import { CustomizeService } from '../_services/customize.service';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.page.html',
  styleUrls: ['./add-card.page.scss'],
})
export class AddCardPage implements OnInit {
flipCard: boolean = false;
cardNumber: any = '';

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

  card: any = {
    number: '',
    expMonth: '',
    expYear: '',
    cvc:'',
    zip: '',
  }; // card object to be sent to the database
  loading: boolean = false; //loader on the page after the card clicks the create account button
  constructor(private navCtrl: NavController,
     private customizeService: CustomizeService,
     public titleService: TitleService,
     private alertCtrl: AlertController,
     private toastCtrl: ToastController) {
      }

     navigateBack() {
      this.navCtrl.navigateBack('card');
    }

    //create spaces btween card number
    orgNum() {
      if (this.visaRegex.test(this.card['number'])) {
        this.visa = true;
        this.amex = false;
        this.union = false;
        this.master = false;
        this.maestro = false;
        this.discover = false;
        this.jcb = false;
        this.diners = false;
      } else if(this.amexRegex.test(this.card['number'])) {
        this.visa = false;
        this.amex = true;
        this.union = false;
        this.master = false;
        this.maestro = false;
        this.discover = false;
        this.jcb = false;
        this.diners = false;      }
      else if(this.discoverRegex.test(this.card['number'])) {
        this.visa = false;
        this.amex = false;
        this.union = false;
        this.master = false;
        this.maestro = false;
        this.discover = true;
        this.jcb = false;
        this.diners = false;      }
      else if(this.dinersRegex.test(this.card['number'])) {
        this.visa = false;
        this.amex = false;
        this.union = false;
        this.master = false;
        this.maestro = false;
        this.discover = false;
        this.jcb = false;
        this.diners = true;      }
      else if(this.masterRegex.test(this.card['number'])) {
        this.visa = false;
        this.amex = false;
        this.union = false;
        this.master = true;
        this.maestro = false;
        this.discover = false;
        this.jcb = false;
        this.diners = false;      }
      else if(this.maestroRegex.test(this.card['number'])) {
        this.visa = false;
        this.amex = false;
        this.union = false;
        this.master = false;
        this.maestro = true;
        this.discover = false;
        this.jcb = false;
        this.diners = false;      }
      else if(this.jcbRegex.test(this.card['number'])) {
        this.visa = false;
        this.amex = false;
        this.union = false;
        this.master = false;
        this.maestro = false;
        this.discover = false;
        this.jcb = true;
        this.diners = false;      }
      else if(this.unionRegex.test(this.card['number'])) {
        this.visa = false;
        this.amex = false;
        this.union = true;
        this.master = false;
        this.maestro = false;
        this.discover = false;
        this.jcb = false;
        this.diners = false;      }
      this.cardNumber = this.card['number'].replace(/[^a-z0-9]+/gi, '').replace(/(.{4})/g, '$1 ')
    }

   //add card
   addCard() {
    this.loading = true;
    setTimeout(async () => {
      try {
        const cardInfo = await this.customizeService.addCard(this.card);
        if (cardInfo['success']) {
          this.presentToast(cardInfo['message'])
          this.loading = false;
          this.navCtrl.navigateBack('card');
        } else {
          this.loading = false;
          this.presentAlert('Sorry, an error occured while trying to add a new card');
        }
      } catch (error) {
        this.presentAlert('Sorry, an error occured while trying to add a new card');
      }
    }, 1000);
  }

  flippCard(val: any) {
    this.flipCard = val;
  }


  //alert
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'add card error',
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
