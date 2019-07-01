import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage';
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ClosetService {
  token: any;
  constructor(private storage: Storage,
     private http: HttpClient) { }

  async headers() {
    this.token = await this.storage.get('token');
    return this.token ? new HttpHeaders().set('Authorization', this.token) : null;
  }

  async addCloset(closet: any) {
    return this.http.post(apiUrl + 'closet/add-closet',closet, {headers: await this.headers()}).toPromise();
  }

  async newCollection(closet: any) {
    return this.http.post(apiUrl + 'closet/new-collection',closet, {headers: await this.headers()}).toPromise();
  }

  async editCollection(collection: any) {
    return this.http.post(apiUrl + 'closet/edit-collection-name',collection, {headers: await this.headers()}).toPromise();
  }

    async removeCollection(collection: any) {
      return this.http.post(apiUrl + 'closet/delete-collection',collection, {headers: await this.headers()}).toPromise();
    }

  async removeCloset(closet: any) {
    return this.http.post(apiUrl + 'closet/remove-closet',closet, {headers: await this.headers()}).toPromise();
  }

  async myCloset() {
    return this.http.get(apiUrl + 'closet/my-closet', {headers: await this.headers()}).toPromise();
  }

  async collectionName() {
    return this.http.get(apiUrl + 'closet/collections-name', {headers: await this.headers()}).toPromise();
  }

}
