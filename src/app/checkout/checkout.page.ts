import { BusinessService } from './../_services/business.service';
import { Stripe } from '@ionic-native/stripe/ngx';
import { TitleService } from './../_services/title.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, AlertController, NavController, IonContent } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { CustomizeService } from '../_services/customize.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.page.html',
  styleUrls: ['./checkout.page.scss'],
})
export class CheckoutPage implements OnInit {
  @ViewChild('slides') slides: IonSlides;
  @ViewChild('f') f: NgForm;
  @ViewChild(IonContent) content: IonContent;
  sliderConfig = {
    initialSlide: this.customizeService.intialSlide,
    slidesPerView: 'auto',
    allowTouchMove: false,
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
      clickable: true
    },
    zoom: false
  };
  sortedDesProds: any[] = []; //sorted products in cart by designers 
  valid: boolean = false;
  fromAddress: boolean = false;
  fromCard: boolean = false;
  error: any = {};
  slideNumber: number = 0;
  user: any = {
    name: this.titleService.appPages[8].value,
    email: this.titleService.appPages[5].value
  }; // user object to be sent to the database
  addresses: any[];
  cards: any[] = [];
  order: any = {};
  processing: boolean = true;


visaRegex = RegExp('^4\\d{0,15}');
amexRegex = RegExp('^3[47]\\d{0,13}');
discoverRegex = RegExp('^(?:6011|65\\d{0,2}|64[4-9]\\d?)\\d{0,12}');
dinersRegex = RegExp('^3(?:0([0-5]|9)|[689]\\d?)\\d{0,11}');
masterRegex = RegExp('^(5[1-5]\\d{0,2}|22[2-9]\\d{0,1}|2[3-7]\\d{0,2})\\d{0,12}');
jcbRegex = RegExp('^(?:35\\d{0,2})\\d{0,12}');
maestroRegex = RegExp('^(?:5[0678]\\d{0,2}|6304|67\\d{0,2})\\d{0,12}');
unionRegex = RegExp('^62\\d{0,14}');


  constructor(public titleService: TitleService,
    private customizeService: CustomizeService,
    private businessService: BusinessService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private stripe: Stripe) { 
      this.getAddress();
      this.getCard();
    }

  ngOnInit() {
    this.checkFormValidity();
    this.getSlideIndex();
  }

  getSlideIndex() {
    this.slides.getActiveIndex().then(i => {
      this.slideNumber = i;
      if (i === 3) {
        setTimeout(() => {
          this.content.scrollToTop(1000);
        }, 500);
      }
    })
  }

  checkFormValidity() {
    if (this.f.valid) {
      this.valid = true
    } else {
      this.valid = false;
    }
  }

  toAddress() {
    this.customizeService.navTo = 'checkout';
    this.customizeService.intialSlide = 1;
    this.navCtrl.navigateRoot('add-address', {animationDirection: 'forward'});
  }

  toCard() {
    this.customizeService.navTo = 'checkout';
    this.customizeService.intialSlide = 2;
    this.navCtrl.navigateRoot('add-card', {animationDirection: 'forward'});
  }

  processContact() {
    if (this.user.name !== this.titleService.appPages[8].value) {
      this.updateName();
      if (this.user.email !== this.titleService.appPages[5].value) {
        this.updateEmail();
      }
    }
  }

  pay() {
    this.getCartWishlistItems();
    this.stripe.setPublishableKey('pk_test_miPJRWpdEfUJWq2r012F13C600tFo5RnO6');
    this.stripe.createCardToken(this.order.card).then((token) => {
      this.order.stripeToken = token.id;
      this.processPayment();
      this.nextSlide();
      this.getSlideIndex();
    })
  }

  async processPayment() {
    try {
      const payInfo = await this.businessService.pay(this.order);
      if (payInfo['success']) {
        this.businessService.clearCart();
        this.getCartWishlistItems();
        this.businessService.numCart = 0;
        this.processing = false;
      } else {
        this.presentAlert('Sorry, an error occured while processing your payment');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while processing your payment');
    }
  }

  //after payment is made
  done() {
    this.navCtrl.navigateRoot('home', {animationDirection: 'forward'});
  }

  //get address
  async getAddress() {
    try {
      const adressInfo = await this.customizeService.getCardsAddresses();
      if (adressInfo['success']) {
        this.addresses = adressInfo['addresses'];
      } else {
        this.presentAlert('Sorry, an error occured while trying to get your address');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to get your address');
    }
  }

  selectAddress(address: any) {
    this.order.address = address;
    this.fromAddress = true;
    this.getAddress().then(() => {
      this.addresses.map(a => {
        a.isChecked = a._id == address._id ? true : false;
      });
    });
  }

  selectCard(card: any) {
    this.order.card = card;
    this.fromCard = true;
    this.getCard().then(() => {
      this.cards.map(c => {
        c.isChecked = c._id == card._id ? true : false;
      });
    });
  }

  //get card
  async getCard() {
    try {
      const cardInfo = await this.customizeService.getCardsAddresses();
      if (cardInfo['success']) {
        this.cards = [];
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

  async getCartWishlistItems() {
    try {
      const cartWishlistInfo = await this.businessService.getCartWishlistItems();
      if (cartWishlistInfo['success']) {
        this.order.products = cartWishlistInfo['cart'];

        let desProducts = {owner: '', products: [], quantity: 0, amount: 0};
        for (let i = 0; i < this.order.products.length; i++) {
          if (!this.sortedDesProds.some(des => des.owner == this.order.products[i].owner)) {
            desProducts.owner = this.order.products[i].owner;
            desProducts.products = this.order.products.filter(p => p.owner == this.order.products[i].owner);
            desProducts.products.forEach(c => {
              desProducts.amount += c.price * c.quantity;
              desProducts.quantity += c.quantity;
            });
            this.sortedDesProds.push(desProducts);
          } 
          desProducts = {owner: '', products: [], quantity: 0, amount: 0};
        }

        this.order.sortedDesProds = this.sortedDesProds;
        this.order.amount = 0;
        this.order.products.forEach(c => {
          this.order.amount += c.price * c.quantity;
        });
      } else {
        this.presentAlert('Sorry, an error occured while your items in cart');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while your items in cart');
    }
  }

     //updates name
     updateName() {
      setTimeout(async () => {
        try {
          const nameInfo = await this.customizeService.updateName(this.user);
          if (nameInfo['success']) {
            this.titleService.appPages.map(p => {
              p.value =  p.title === 'name' ? this.user.name : p.value
            });
          } else {
            this.presentAlert(nameInfo['message']);
          }
        } catch (error) {
          this.presentAlert('Sorry, an error occured while trying to update your name');
        }
  
      }, 1000);
    }
  //updates Email
  updateEmail() {
    setTimeout(async () => {
      try {
        const emailInfo = await this.customizeService.updateEmail(this.user);
        if (emailInfo['success']) {
          this.titleService.appPages.map(p => {
            p.value =  p.title === 'email' ? this.user.email : p.value
          });
        } else {
          this.presentAlert(emailInfo['message']);
        }
      } catch (error) {
        this.presentAlert('Sorry, an error occured while trying to update your email');
      }
    }, 1000);
  }

   //change slides
   nextSlide() {
    this.slides.slideNext();
  }

  prevSlide() {
    this.slides.slidePrev();
  }

  //remove validation errors
  removeErrors() {
    this.checkFormValidity();
    this.error = {};
  }

  //alert
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Transaction error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
