import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private storage: Storage,
     private http: HttpClient) { }

  signup(user: any) {
    return this.http.post(apiUrl + 'auth/register', user).toPromise().then((res) => {
      if (res) {
        this.storage.set('token', res['token']);
        return res;
      }
    });
  }

  login(user: any) {
    return this.http.post(apiUrl + 'auth/login', user).toPromise().then((res) => {
      if (res) {
        this.storage.set('token', res['token']);
        this.storage.set('user', JSON.stringify(res['user']));
        return res;
      }
    });
  }
}
