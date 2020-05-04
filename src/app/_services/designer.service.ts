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

  //sum of all orders and finances
  async sumFinancesOrders() {
    return this.http.get(apiUrl + `designer/total-finances-orders`, {headers: await this.headers()}).toPromise();
  }

  //get all orders
  async allOrders(page: any) {
    return this.http.post(apiUrl + `designer/order-status?page=${page-1}`, {}, {headers: await this.headers()}).toPromise();
  }

  async dailyOrders() {
    return this.http.get(apiUrl + `designer/daily-orders`, {headers: await this.headers()}).toPromise();
  }

  async weeklyOrders() {
    return this.http.get(apiUrl + `designer/weekly-orders`, {headers: await this.headers()}).toPromise();
  }

  async monthlyOrders(statistics: any) {
    return this.http.post(apiUrl + `designer/monthly-orders`, statistics,  {headers: await this.headers()}).toPromise();
  }

  async yearlyOrders(statistics: any) {
    return this.http.post(apiUrl + `designer/yearly-orders`, statistics,  {headers: await this.headers()}).toPromise();
  }

  async chartStatistics(statistics: any) {
    return this.http.post(apiUrl + 'designer/chart-orders', statistics, {headers: await this.headers()}).toPromise();
  }

  async financeStatistics(statistics: any) {
    return this.http.post(apiUrl + 'designer/chart-finances', statistics, {headers: await this.headers()}).toPromise();
  }

  async dailyFinances() {
    return this.http.get(apiUrl + 'designer/daily-finances', {headers: await this.headers()}).toPromise();
  }

  async monthlyFinances(statistics: any) {
    return this.http.post(apiUrl + 'designer/monthly-finances', statistics,  {headers: await this.headers()}).toPromise();
  }

  async yearlyFinances(statistics: any) {
    return this.http.post(apiUrl + 'designer/yearly-finances', statistics,  {headers: await this.headers()}).toPromise();
  }
}
