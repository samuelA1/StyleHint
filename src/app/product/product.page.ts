import { HintsService } from './../_services/hints.service';
import { BusinessService } from './../_services/business.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../_services/admin.service';
import { AlertController, ToastController, NavController, IonContent } from '@ionic/angular';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  product: any;
  item: any = {
    owner: '',
    size: '',
    color: '',
    img: '',
    quantity: 1,
    whatYouSell: '',
    price: 0,
    productId: ''
  };
  hideHeader: boolean = true;
  hideHeaderCounter: number = 0;
  productImages: any[] = [];
  sliderConfig = {
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
      clickable: true
    },
    zoom: false
  };

  colors: any[] = [];
  sizes: any[];

  constructor(private adminService: AdminService,
    public businessService: BusinessService,
    private hintService: HintsService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController) { 
      if (this.adminService.productId !== '') {
        this.getProduct();
      }
    }

  ngOnInit() {
  }

  navigateBack() {
    this.navCtrl.navigateBack(this.adminService.navFromProduct);
  }

  processProduct(product: any) {
    if (this.product.type == 'clothing') {
      this.colors.push({val: this.product.cloth[0].color, isChecked: true})
      if (this.product.cloth[1]) this.colors.push({val: this.product.cloth[1].color, isChecked: false});
      if (this.product.cloth[2]) this.colors.push({val: this.product.cloth[2].color, isChecked: false});
      this.selectColor(this.product.cloth[0].color);
    } else {
      this.colors.push({val: this.product.shoe[0].color, isChecked: true})
      if (this.product.shoe[1]) this.colors.push({val: this.product.shoe[1].color, isChecked: false});
      if (this.product.shoe[2]) this.colors.push({val: this.product.shoe[2].color, isChecked: false});
      this.selectColor(this.product.shoe[0].color);
    }
    
    this.productImages.push(product.mainImage);
    this.productImages.push(product.imgOne);
    this.productImages.push(product.imgTwo);
    this.productImages.push(product.imgThree);
  }

  async getProduct() {
    try {
      const productInfo = await this.adminService.getSingleProduct();
      if (productInfo['success']) {
        this.product = productInfo['product'];
        this.processProduct(productInfo['product']);
      } else {
        this.presentAlert('Sorry, an error occured while getting a product');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting a product');
    }
  }

  async addToCart() {
    this.item.whatYouSell = this.product.whatYouSell;
    this.item.price = this.product.price;
    this.item.productId = this.product._id;
    this.item.img = this.product.mainImage;
    this.item.owner = this.product.owner;
    try {
      const productInfo = await this.businessService.addToCart({item: this.item});
      if (productInfo['success']) {
        this.businessService.numCart++
        this.presentToast('Product added to cart');
      } else {
        this.presentAlert('Sorry, an error occured while adding a product to cart');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while adding a product to cart');
    }
  }

  viewHint(id: any) {
    this.hintService.id = id;
    this.hintService.backRoute = 'product'
    this.navCtrl.navigateForward('reference');
  }

  selectColor(color: any) {
    this.item.color = color;
    if (this.product.type == 'clothing') {
      this.colors.map(c => {
        c.isChecked =  c.val == color ? true : false;
      });
      this.sizes = this.product.cloth.find(c => c.color == color);
      this.sizes['info'].map(s => {
          s.size = s.quantity <= 0 ? `${s.size} (out of stock)` : s.size
      })

    } else {
      this.colors.map(c => {
        c.isChecked =  c.val == color ? true : false;
      });
      this.sizes = this.product.shoe.find(c => c.color == color);
      this.sizes['info'].map(s => {
          s.size = s.quantity <= 0 ? `${s.size} (out of stock)` : s.size
      })
    }
  }

   //alert ctrl
   async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
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

//hide or show header on scroll
logScrolling(e: any) {
  this.hideHeaderCounter = 0;
  this.hideHeaderCounter = 1
  if (e.detail.scrollTop > 0 && this.hideHeaderCounter == 1) {
    this.hideHeader = false;
  } else if (e.detail.scrollTop == 0 || e.detail.scrollTop < 0) {
    this.hideHeader =true;
  }
}

}
