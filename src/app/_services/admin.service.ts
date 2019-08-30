import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  token: any;
  id: any;
  hintId: any; //id for hint update
  newsId: any; //id for news
  constructor(private storage: Storage, private http: HttpClient) { }

  async headers() {
    this.token = await this.storage.get('token');
    return this.token ? new HttpHeaders().set('Authorization', this.token) : null;
  }

  async addHint(hint: any) {
    return this.http.post(apiUrl + 'admin/add-hint', hint, {headers: await this.headers()}).toPromise();
  }

  async addNews(news: any) {
    return this.http.post(apiUrl + 'admin/add-news', news, {headers: await this.headers()}).toPromise();
  }

  async updateStatistics(statistics: any) {
    return this.http.post(apiUrl + 'admin/update-statistics', statistics, {headers: await this.headers()}).toPromise();
  }

  async getStatistics() {
    return this.http.get(apiUrl + 'admin/get-statistics', {headers: await this.headers()}).toPromise();
  }

  async weekStatistics() {
    return this.http.get(apiUrl + 'admin/week-statistics', {headers: await this.headers()}).toPromise();
  }

  async monthStatistics(statistics: any) {
    return this.http.post(apiUrl + 'admin/month-statistics', statistics, {headers: await this.headers()}).toPromise();
  }

  async chartStatistics(statistics: any) {
    return this.http.post(apiUrl + 'admin/chart-statistics', statistics, {headers: await this.headers()}).toPromise();
  }

  async yearStatistics(statistics: any) {
    return this.http.post(apiUrl + 'admin/year-statistics', statistics, {headers: await this.headers()}).toPromise();
  }

  async totalUsers() {
    return this.http.get(apiUrl + 'admin/total-users', {headers: await this.headers()}).toPromise();
  }

  async allUsers() {
    return this.http.get(apiUrl + 'admin/all-users', {headers: await this.headers()}).toPromise();
  }

  async allHints() {
    return this.http.get(apiUrl + 'admin/all-hints', {headers: await this.headers()}).toPromise();
  }

  //get single user
  async getUser() {
    if (this.id !== undefined) {
      return this.http.get(apiUrl + `admin/single-user/${this.id}`, {headers: await this.headers()}).toPromise();
    }
  }

   //get single hint
   async getHint() {
    if (this.hintId !== undefined) {
      return this.http.get(apiUrl + `admin/single-hint/${this.hintId}`, {headers: await this.headers()}).toPromise();
    }
  }

  //sort single user
  async sortUsers(sort: any) {
    return this.http.post(apiUrl + `admin/sort-users`, sort, {headers: await this.headers()}).toPromise();
  }

  //sort  hints
  async sortHints(sort: any) {
    return this.http.post(apiUrl + `admin/sort-hints`, sort, {headers: await this.headers()}).toPromise();
  }

  //update user
  async updateUser(user: any) {
    if (this.id !== undefined) {
      return this.http.post(apiUrl + `admin/update-user/${this.id}`, user, {headers: await this.headers()}).toPromise();
    }
  }

   //update hint
   async updateHint(hint: any) {
    if (this.hintId !== undefined) {
      return this.http.post(apiUrl + `admin/update-hint/${this.hintId}`, hint, {headers: await this.headers()}).toPromise();
    }
  }

   //update news
   async updateNews(news: any) {
    if (this.newsId !== undefined) {
      return this.http.post(apiUrl + `admin/update-news/${this.newsId}`, news, {headers: await this.headers()}).toPromise();
    }
  }

  async totalHints() {
    return this.http.get(apiUrl + 'admin/total-hints', {headers: await this.headers()}).toPromise();
  }

  async deleteHint() {
    if (this.hintId !== undefined) {
      return this.http.delete(apiUrl + `admin/delete-hint/${this.hintId}`, {headers: await this.headers()}).toPromise();
    }
  }

  async deleteNews() {
    if (this.newsId !== undefined) {
      return this.http.delete(apiUrl + `admin/delete-news/${this.newsId}`, {headers: await this.headers()}).toPromise();
    }
  }
}
