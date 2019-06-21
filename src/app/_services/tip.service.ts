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
  tipToView: any;
  isMyTip: boolean;
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

  async getTip() {
    if (this.tipToView !== undefined) {
      return this.http.get(apiUrl + `tips/get-single-tip/${this.tipToView}`, {headers: await this.headers()}).toPromise();
    }
  }

  async addComment(tipId: any, comment: any) {
    return this.http.post(apiUrl + `tips/add-comment/${tipId}`, comment, {headers: await this.headers()}).toPromise();
  }

  async deleteTip(tipId: any) {
    return this.http.delete(apiUrl + `tips/delete-tip/${tipId}`, {headers: await this.headers()}).toPromise();
  }
  async deleteComment(tipId: any, commentId: any) {
    return this.http.post(apiUrl + `tips/delete-comment/${tipId}?id=${commentId}`,{}, {headers: await this.headers()}).toPromise();
  }
}
