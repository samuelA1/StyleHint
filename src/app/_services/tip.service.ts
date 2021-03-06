import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TipService {
  token: any;
  tipToView: any = '';
  isMyTip: boolean = false;
  backRoute: any = '';
  constructor(private storage: Storage,
     private http: HttpClient) { }

  async headers() {
    this.token = await this.storage.get('token');
    return this.token ? new HttpHeaders().set('Authorization', this.token) : null;
  }

  async addTip(tips: any) {
    return this.http.post(apiUrl + 'tips/add-tip', tips, {headers: await this.headers()}).toPromise();
  }

  async getTips() {
    return this.http.get(apiUrl + 'tips/get-tips', {headers: await this.headers()}).toPromise();
  }

  async getAutoTips() {
    return this.http.get(apiUrl + 'tips/get-auto-tips', {headers: await this.headers()}).toPromise();
  }

  async getTip() {
    return this.http.get(apiUrl + `tips/get-single-tip/${this.tipToView}`, {headers: await this.headers()}).toPromise();
  }

  async addComment(tipId: any, comment: any) {
    return this.http.post(apiUrl + `tips/add-comment/${tipId}`, comment, {headers: await this.headers()}).toPromise();
  }

  async deleteTip(tipId: any, notifyId: any) {
    return this.http.delete(apiUrl + `tips/delete-tip/${tipId}?notifyId=${notifyId}`, {headers: await this.headers()}).toPromise();
  }
  async autoDelete(tipId: any) {
    return this.http.post(apiUrl + `tips/auto-delete/${tipId}`,{}, {headers: await this.headers()}).toPromise();
  }

  async deleteComment(tipId: any, commentId: any) {
    return this.http.post(apiUrl + `tips/delete-comment/${tipId}?id=${commentId}`,{}, {headers: await this.headers()}).toPromise();
  }

  async seenBy(tipId: any) {
    return this.http.post(apiUrl + `tips/seenBy/${tipId}`, {}, {headers: await this.headers()}).toPromise();
  }
}
