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
}
