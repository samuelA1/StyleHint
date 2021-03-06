import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AdminService } from './admin.service';
const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userId: any;
  userName: any;
  constructor(private storage: Storage,
     private http: HttpClient,
     private adminService: AdminService) { }

  signup(user: any) {
    return this.http.post(apiUrl + 'auth/register', user).toPromise().then((res) => {
      if (res['success']) {
        this.storage.set('token', res['token']);
        return res;
      } else {
        return res;
      }
    });
  }

  login(user: any) {
    return this.http.post(apiUrl + 'auth/login', user).toPromise().then((res) => {
      if (res['success']) {
        this.storage.set('token', res['token']);
        this.storage.set('user', JSON.stringify(res['user']));
        this.userId = res['user']._id;
        this.adminService.id = res['user']._id;
        return res;
      } else {
        return res;
      }
    });
  }

  autoLogin(user: any) {
    return this.http.post(apiUrl + 'auth/auto-login', user).toPromise().then((res) => {
      if (res['success']) {
        this.storage.set('token', res['token']);
        this.userId = res['user']._id;
        return res;
      } else {
        return res;
      }
    });
  }

  onesignalId(user: any, oneSignalId: any) {
    return this.http.post(apiUrl + `auth/onesignal-id/${oneSignalId}`, user).toPromise();
  }
}
