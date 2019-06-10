import { TitleService } from './title.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;


@Injectable({
  providedIn: 'root'
})
export class HintsService {
  hints: any = {};
  token: any;
  constructor(private storage: Storage,
     private http: HttpClient,
     private titleService: TitleService) { }

  async headers() {
    this.token = await this.storage.get('token');
    return this.token ? new HttpHeaders().set('Authorization', this.token) : null;
  }

  async getHints(page: any) {
    this.getFinalData();
    return this.http.post(apiUrl + `hints/get-hints?page=${page - 1}`, this.hints, {headers: await this.headers()}).toPromise();
  }

  getFinalData() {
    this.hints.occasion = this.titleService.finalData.occasion;
    this.hints.weather = this.titleService.finalData.weather;
    this.hints.season = this.titleService.finalData.season;
    this.storage.get('user').then((data)=> {
      let user = JSON.parse(data);
      this.hints.gender = user.gender;
      this.hints.size = user.size;
      this.hints.interest = user.interest;
     })
  }
}
