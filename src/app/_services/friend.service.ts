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

  search(query: any, page: any) {
    return this.http.get(apiUrl + 'search?query=' + query + '&page=' + page).toPromise();
}

  async getFriends() {
    return this.http.get(apiUrl + 'friends/get-friends', {headers: await this.headers()}).toPromise();
  }

  async removeFriend(friendId: any) {
    return this.http.post(apiUrl + `friends/delete-friend/${friendId}`, {}, {headers: await this.headers()}).toPromise();
  }

  async friendRequest(friendId: any) {
    return this.http.post(apiUrl + `friends/request-friend/${friendId}`, {}, {headers: await this.headers()}).toPromise();
  }

  async acceptRequest(friendId: any) {
    return this.http.post(apiUrl + `friends/add-friend/${friendId}`, {}, {headers: await this.headers()}).toPromise();
  }

  async deleteFriendNotification(notifyId: any) {
    return this.http.delete(apiUrl + `friends/delete-notification/${notifyId}`, {headers: await this.headers()}).toPromise();
  }
}
