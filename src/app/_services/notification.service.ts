import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  numberOfNotifications: number = 0;
  numberOfAdminAlerts: number = 0;
  token: any;
  constructor(private storage: Storage,
    private http: HttpClient) { }

 async headers() {
   this.token = await this.storage.get('token');
   return this.token ? new HttpHeaders().set('Authorization', this.token) : null;
 }

 async getNotifications(page: any) {
   return this.http.get(apiUrl + `notifications/notifications?page=${page-1}`, {headers: await this.headers()}).toPromise();
 }

 //friend request
 async getFriendRequests() {
  return this.http.get(apiUrl + `notifications/friendRequests`, {headers: await this.headers()}).toPromise();
}

 //delete all notifications
 async clearAll() {
  return this.http.get(apiUrl + 'notifications/clear-all', {headers: await this.headers()}).toPromise();
}

 //get number of notifications
 async notifyNumber() {
   return this.http.get(apiUrl + 'notifications/notifyNumber', {headers: await this.headers()}).toPromise()
    .then(async (res) => {
      if (res['success']) this.numberOfNotifications = res['notifyNumber'];
    });
 }

 //get number of admin notifications
 async adminAlertNumber() {
  return this.http.get(apiUrl + 'admin/alerts', {headers: await this.headers()}).toPromise()
   .then(async (res) => {
     if (res['success']) this.numberOfAdminAlerts = res['numberOfAlerts'];
   });
}

 //set number of notifications to a value
 async changeNotify(notify: any) {
  return this.http.post(apiUrl + 'notifications/change-notify', notify, {headers: await this.headers()}).toPromise()
 }
}
