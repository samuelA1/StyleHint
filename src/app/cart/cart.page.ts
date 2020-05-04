import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../_services/business.service';
import { AlertController, ToastController, ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
cart:any[];
wishlist:any[];
totalItems: number = 0;
totalAmount: number = 0;

  constructor(
    public businessService: BusinessService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController) { 
      this.getCartWishlistItems();
    }


  ngOnInit() {
  }

  async getCartWishlistItems() {
    try {
      const cartWishlistInfo = await this.businessService.getCartWishlistItems();
      if (cartWishlistInfo['success']) {
        this.businessService.checkQuantity({products: cartWishlistInfo['cart']});
        setTimeout(async () => {
          const cartWishlistReprocessed = await this.businessService.getCartWishlistItems();
          this.cart = cartWishlistReprocessed['cart'];
          this.businessService.numCart = this.cart.length;
          this.wishlist = cartWishlistReprocessed['wishlist'];
          this.totalItems = 0;
          this.totalAmount = 0;
          this.cart.forEach(c => {
          this.totalItems += c.quantity;
          this.totalAmount += c.price * c.quantity;
        });
        }, 1000);
      } else {
        this.presentAlert('Sorry, an error occured while your items in cart');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while your items in cart');
    }
  }

  async addToWishlist(item: any, itemId: any) {
    try {
      const itemInfo = await this.businessService.addToWishlist({item: item}, itemId);
      if (itemInfo['success']) {
        this.businessService.numCart--
        this.getCartWishlistItems();
      } else {
        this.presentAlert('Sorry, an error occured while adding a product to your wishlist');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while adding a product to your wishlist');
    }
  }

  async removeFromWishlist(item: any, itemId: any) {
    try {
      const itemInfo = await this.businessService.removeFromWishlist({item: item}, itemId);
      if (itemInfo['success']) {
        this.businessService.numCart++
        this.getCartWishlistItems();
      } else {
        this.presentAlert('Sorry, an error occured while adding a product to cart');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while adding a product to cart');
    }
  }

  async updateCartItem(id: any, quantity: any, item: any) {
    try {
      const updateCartInfo = await this.businessService.updateCart(id, quantity, item);
      if (updateCartInfo['success']) {
        // this.cart.map(i => {
        //   i.quantity = i._id == id ? quantity : i.quantity;
        // });
        this.getCartWishlistItems();
      } else {
        this.presentAlert(updateCartInfo['message']);
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while updating the quantity of a product');
    }
  }

  //remove product from cart
  async removeItem(itemId: any) {
    try {
      const removeCartInfo = await this.businessService.removeFromCart(itemId);
      if (removeCartInfo['success']) {
        this.businessService.numCart--
        this.getCartWishlistItems();
      } else {
        this.presentAlert('Sorry, an error occured while removing a product from your cart');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while removing a product from your cart');
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

async deleteItem(itemId: any) {
  const alert = await this.alertCtrl.create({
    header: 'Confirm item delete',
    message: `Are you sure you want to remove this item from cart? You can add this item to your wishlist.`,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      }, {
        text: 'remove',
        cssClass: 'delete',
        handler: () => {
          this.removeItem(itemId);
        }
      }
    ]
  });

  await alert.present();
}

//clear cart
async clearCart() {
  const alert = await this.alertCtrl.create({
    header: 'Confirm clear cart',
    message: `Are you sure you want to clear your cart?`,
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
      }, {
        text: 'clear',
        cssClass: 'delete',
        handler: () => {
          this.businessService.clearCart();
          this.businessService.numCart = 0;
          this.getCartWishlistItems();
        }
      }
    ]
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

async presentQuantityActionSheet(id: any, size: any, productId: any, color: any) {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Choose Quantity',
    buttons: [
      {
        text: '1',
        handler: async () => {
         this.updateCartItem(id, 1, {id: productId, size: size, color: color});
        }
      },
      {
      text: '2',
      handler: () => {
        this.updateCartItem(id, 2, {id: productId, size: size, color: color});
      }
    }, {
      text: `3`,
      handler: () => {
        this.updateCartItem(id, 3, {id: productId, size: size, color: color});
      }
    }, {
      text: `4`,
      handler: () => {
        this.updateCartItem(id, 4, {id: productId, size: size, color: color});
      }
    },
     {
      text: `5`,
      handler: () => {
        this.updateCartItem(id, 5, {id: productId, size: size, color: color});
      }
    }, 
    {
      text: `6`,
      handler: () => {
        this.updateCartItem(id, 6, {id: productId, size: size, color: color});
      }
    },
    {
      text: `7`,
      handler: () => {
        this.updateCartItem(id, 7, {id: productId, size: size, color: color});
      }
    },
    {
      text: `8`,
      handler: () => {
        this.updateCartItem(id, 8, {id: productId, size: size, color: color});
      }
    },
    {
      text: `9`,
      handler: () => {
        this.updateCartItem(id, 9, {id: productId, size: size, color: color});
      }
    },
    {
      text: `10`,
      handler: () => {
        this.updateCartItem(id, 10, {id: productId, size: size, color: color});
      }
    }
  ]
  });
  await actionSheet.present();
}

}
