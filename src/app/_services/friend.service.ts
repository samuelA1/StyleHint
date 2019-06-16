import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class FriendService {
  token: any;
  constructor(private storage: Storage,
     private http: HttpClient) { }

  async headers() {
    this.token = await this.storage.get('token');
    return this.token ? new HttpHeaders().set('Authorization', this.token) : null;
  }

  async getFriends() {
    return this.http.get(apiUrl + 'friends/get-friends', {headers: await this.headers()}).toPromise();
  }
}
