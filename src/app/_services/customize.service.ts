import { AuthService } from './auth.service';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class CustomizeService {
  token: any;
  constructor(private storage: Storage,
     private http: HttpClient,
     private authService: AuthService) { }

  async headers() {
    this.token = await this.storage.get('token');
    return this.token ? new HttpHeaders().set('Authorization', this.token) : null;
  }

  async customize(customize: any) {
    return this.http.post(apiUrl + 'customize/customize', customize, {headers: await this.headers()}).toPromise()
    .then((res) => {
      if (res['success']) {
        this.storage.set('user', JSON.stringify(res['user']));
        this.authService.userId = res['user']._id;
        return res;
      } else {
        return res;
      }
    });
  }

  async updateEmail(email: any) {
    return this.http.post(apiUrl + 'profile/email', email, {headers: await this.headers()}).toPromise()
    .then((res) => {
      if (res['success']) {
        this.storage.set('user', JSON.stringify(res['user']));
        return res;
      } else {
        return res;
      }
    });
  }

  async updateUsername(username: any) {
    return this.http.post(apiUrl + 'profile/username', username, {headers: await this.headers()}).toPromise()
    .then((res) => {
      if (res['success']) {
        this.storage.set('user', JSON.stringify(res['user']));
        return res;
      } else {
        return res;
      }
    });
  }

  async updatePassword(password: any) {
    return this.http.post(apiUrl + 'profile/password', password, {headers: await this.headers()}).toPromise()
    .then((res) => {
      if (res['success']) {
        this.storage.set('user', JSON.stringify(res['user']));
        return res;
      } else {
        return res;
      }
    });
  }

  async updateCountry(country: any) {
    return this.http.post(apiUrl + 'profile/country', country, {headers: await this.headers()}).toPromise()
    .then((res) => {
      if (res['success']) {
        this.storage.set('user', JSON.stringify(res['user']));
        return res;
      } else {
        return res;
      }
    });
  }

  async updateGender(gender: any) {
    return this.http.post(apiUrl + 'profile/gender', gender, {headers: await this.headers()}).toPromise()
    .then((res) => {
      if (res['success']) {
        this.storage.set('user', JSON.stringify(res['user']));
        return res;
      } else {
        return res;
      }
    });
  }

  async updateSize(size: any) {
    return this.http.post(apiUrl + 'profile/size', size, {headers: await this.headers()}).toPromise()
    .then((res) => {
      if (res['success']) {
        this.storage.set('user', JSON.stringify(res['user']));
        return res;
      } else {
        return res;
      }
    });
  }

  async updateInterest(interest: any) {
    return this.http.post(apiUrl + 'profile/interest', interest, {headers: await this.headers()}).toPromise()
    .then((res) => {
      if (res['success']) {
        this.storage.set('user', JSON.stringify(res['user']));
        return res;
      } else {
        return res;
      }
    });
  }
}
