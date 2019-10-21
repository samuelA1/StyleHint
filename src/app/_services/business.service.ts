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

  //get designers by occasion
  async getDesignersOccasion(occasion: any) {
    return this.http.post(apiUrl + 'business/designer-occasion', occasion, {headers: await this.headers()}).toPromise();
  }

  //add selected designers to collection
  async addSelectedDesigners(designers: any) {
    return this.http.post(apiUrl + 'business/select-design', designers, {headers: await this.headers()}).toPromise();
  }

  //get the number of items in cart and the number of designers
  async cartDesigners() {
    return this.http.get(apiUrl + 'business/cart-designers', {headers: await this.headers()}).toPromise().then((res) => {
      this.numCart = res['cart'];
      this.numDesigners = res['designers'];
      return res;
    });
  }

  //get all prefered designers
  async getPreferedDesigners() {
    return this.http.get(apiUrl + 'business/prefered-designers', {headers: await this.headers()}).toPromise();
  }

  //get designer's products
  async designersProducts(owner: any, page: number) {
    return this.http.post(apiUrl + `business/product-status?page=${page-1}`, owner, {headers: await this.headers()}).toPromise();
  }


}
