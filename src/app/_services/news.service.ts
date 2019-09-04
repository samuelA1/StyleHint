import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class NewsService {
  token: any;
  id: any = '';
  constructor(private storage: Storage,
     private http: HttpClient) { }

  async headers() {
    this.token = await this.storage.get('token');
    return this.token ? new HttpHeaders().set('Authorization', this.token) : null;
  }


  async allNews(page: any) {
    return this.http.get(apiUrl + `news/all?page=${page-1}`, {headers: await this.headers()}).toPromise();
  }

  async getSingleNews() {
    if (this.id !== undefined) {
      return this.http.get(apiUrl + `news/single/${this.id}`, {headers: await this.headers()}).toPromise();
    }
  }

  //like and unlike news
  async toggleLikes() {
    if (this.id !== undefined) {
      return this.http.get(apiUrl + `news/toggle-like/${this.id}`, {headers: await this.headers()}).toPromise();
    }
  }

  async shareNews(friends: any) {
    return this.http.post(apiUrl + `news/share-news/${this.id}`, friends, {headers: await this.headers()}).toPromise();
  }

  async addComment(comment: any) {
    return this.http.post(apiUrl + `news/add-comment/${this.id}`, comment, {headers: await this.headers()}).toPromise();
  }

  async deleteComment(commentId: any) {
    return this.http.post(apiUrl + `news/delete-comment/${this.id}?id=${commentId}`,{}, {headers: await this.headers()}).toPromise();
  }
}
