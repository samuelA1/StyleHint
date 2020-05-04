import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  token: any;
  orderId: any = '';
  numCart: number = 0;
  numDesigners: number = 0;
  constructor(private storage: Storage, private http: HttpClient) { }

  async headers() {
    this.token = await this.storage.get('token');
    return this.token ? new HttpHeaders().set('Authorization', this.token) : null;
  }

  //get all designers
  async getDesigners() {
    return this.http.get(apiUrl + 'business/all-designs', {headers: await this.headers()}).toPromise();
  }

  //get all unselected designers designers
  async getUnSelectedDesigners() {
    return this.http.get(apiUrl + 'business/unchosen-designers', {headers: await this.headers()}).toPromise();
  }

  //get designers by occasion
  async getDesignersOccasion(occasion: any) {
    return this.http.post(apiUrl + 'business/designer-occasion', occasion, {headers: await this.headers()}).toPromise();
  }

  //add selected designers to collection
  async addSelectedDesigners(designers: any) {
    return this.http.post(apiUrl + 'business/select-design', designers, {headers: await this.headers()}).toPromise();
  }

  //remove selected designers from collection
  async removeSelectedDesigner(designerId: any) {
    return this.http.post(apiUrl + `business/remove-design/${designerId}`, {}, {headers: await this.headers()}).toPromise();
  }

  //get the number of items in cart and the number of designers
  async cartDesigners() {
    return this.http.get(apiUrl + 'business/cart-designers', {headers: await this.headers()}).toPromise().then((res) => {
      this.numCart = res['cart'];
      this.numDesigners = res['designers'];
      return res;
    });
  }

  //add to cart 
  async addToCart(item: any) {
    return this.http.post(apiUrl + `business/add-cart`, item, {headers: await this.headers()}).toPromise();
  }

  //add to wishlist 
  async addToWishlist(item: any, itemId: any) {
    return this.http.post(apiUrl + `business/add-wishlist/${itemId}`, item, {headers: await this.headers()}).toPromise();
  }

  //remove from wishlist 
  async removeFromWishlist(item: any, itemId: any) {
    return this.http.post(apiUrl + `business/remove-from-wishlist/${itemId}`, item, {headers: await this.headers()}).toPromise();
  }

   //remove from cart cart 
   async removeFromCart(itemId: any) {
    return this.http.post(apiUrl + `business/remove-from-cart/${itemId}`, {}, {headers: await this.headers()}).toPromise();
  }

   //update in cart 
   async updateCart(itemId: any, quantity: any, item: any) {
    return this.http.post(apiUrl + `business/update-cart/${itemId}?quantity=${quantity}`, item, {headers: await this.headers()}).toPromise();
  }

  //clear cart 
  async clearCart() {
    return this.http.post(apiUrl + `business/clear-cart`, {}, {headers: await this.headers()}).toPromise();
  }

  //get all cart items
  async getCartWishlistItems() {
    return this.http.get(apiUrl + 'business/get-cart-wishlist', {headers: await this.headers()}).toPromise();
  }

  //check if items in cart still in stock
  async checkQuantity(cart: any) {
    return this.http.post(apiUrl + 'business/check-quantity', cart, {headers: await this.headers()}).toPromise();
  }

  //get all prefered designers
  async getPreferedDesigners() {
    return this.http.get(apiUrl + 'business/prefered-designers', {headers: await this.headers()}).toPromise();
  }

  //get designer's products
  async designersProducts(owner: any, page: number) {
    return this.http.post(apiUrl + `business/product-status?page=${page-1}`, owner, {headers: await this.headers()}).toPromise();
  }

  //payment
  async pay(order: any) {
    return this.http.post(apiUrl + `business/pay`, order, {headers: await this.headers()}).toPromise();
  }

  //get user orders
  async getUserOrders() {
    return this.http.get(apiUrl + 'business/orders', {headers: await this.headers()}).toPromise();
  }

  //get user order
  async getSingleOrder() {
    return this.http.get(apiUrl + `business/order/${this.orderId}`, {headers: await this.headers()}).toPromise();
  }

  //get designer order
  async getSingleDorder() {
    return this.http.get(apiUrl + `business/dorder/${this.orderId}`, {headers: await this.headers()}).toPromise();
  }
}
