import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class DesignerService {
  token: any;
  id: any;
  productId: any;
  constructor(private storage: Storage, private http: HttpClient) { }

  async headers() {
    this.token = await this.storage.get('token');
    return this.token ? new HttpHeaders().set('Authorization', this.token) : null;
  }


  async addProduct(product: any) {
    return this.http.post(apiUrl + 'designer/add-product', product, {headers: await this.headers()}).toPromise();
  }

  //get product by status
  async getProducts(status: any, page: any) {
    return this.http.post(apiUrl + `designer/product-status?page=${page-1}`, status, {headers: await this.headers()}).toPromise();
  }

   async updateProduct(update: any) {
    return this.http.post(apiUrl + `designer/edit-product/${this.productId}`, update, {headers: await this.headers()}).toPromise();
  }

  async deleteProduct() {
    return this.http.delete(apiUrl + `designer/delete-product/${this.productId}`, {headers: await this.headers()}).toPromise();
  }

}
