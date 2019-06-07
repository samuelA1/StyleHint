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
     private http: HttpClient) { }

  async headers() {
    this.token = await this.storage.get('token');
    return this.token ? new HttpHeaders().set('Authorization', this.token) : null;
  }

  async customize(customize: any) {
    return this.http.post(apiUrl + 'customize/customize', customize, {headers: await this.headers()}).toPromise()
    .then((res) => {
      if (res) {
        this.storage.set('user', JSON.stringify(res['user']));
        return res;
      }
    });
  }
}
