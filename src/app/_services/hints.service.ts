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
  backRoute: any = ''; //backward nav for tip and closet pages
  id: any = '';
  //occasion/event array
  occasions: any[] = [
  {name: 'school', icon: 'school', isChosen: false},
  {name: 'sport', icon: 'american-football', isChosen: false},
  {name: 'birthday party', icon: 'color-wand', isChosen: false},
  {name: 'halloween', icon: 'outlet', isChosen: false},
  {name: 'christmas', icon: 'gift', isChosen: false},
  {name: 'church', icon: 'add-circle-outline', isChosen: false},
  {name: 'date night', icon: 'contacts', isChosen: false},
  {name: 'job interview', icon: 'person-add', isChosen: false},
  {name: 'culture', icon: 'home', isChosen: false},
]

//seasons array
seasons: any[] = [
  {name: 'winter', icon: 'snow', isChosen: false},
  {name: 'spring', icon: 'rose', isChosen: false},
  {name: 'summer', icon: 'flower', isChosen: false},
  {name: 'fall', icon: 'partly-sunny', isChosen: false},
]

// weather array
weathers: any[] =[
  {name: 'clear', icon: 'sunny', isChosen: false},
  {name: 'rain', icon: 'rainy', isChosen: false},
  {name: 'clouds', icon: 'cloud', isChosen: false},
  {name: 'haze', icon: 'nuclear', isChosen: false},
  {name: 'mist', icon: 'list', isChosen: false},
  {name: 'smoke', icon: 'bonfire', isChosen: false},
  {name: 'fog', icon: 'flower', isChosen: false},
  {name: 'thunderstorm', icon: 'thunderstorm', isChosen: false},
]
  constructor(private storage: Storage,
     private http: HttpClient,
     private titleService: TitleService) { }

  async headers() {
    this.token = await this.storage.get('token');
    return this.token ? new HttpHeaders().set('Authorization', this.token) : null;
  }

  async getHints(page: any) {
    this.getFinalData();
    if (this.hints.occasion !== undefined || this.hints.occasion !== null) {
      return this.http.post(apiUrl + `hints/get-hints?page=${page - 1}`, this.hints, {headers: await this.headers()}).toPromise();
    }
  }

  //hint images to be used on home page
  async getOccasionHint() {
    return this.http.get(apiUrl + `hints/occasion-hints`, {headers: await this.headers()}).toPromise();
  }

  async getSingleHint() {
    if (this.id !== undefined) {
      return this.http.get(apiUrl + `hints/get-single-hint/${this.id}`, {headers: await this.headers()}).toPromise();
    }
  }

  async getSuggestions() {
    this.suggestOccasion();
    return this.http.post(apiUrl + 'hints/suggestions', this.hints, {headers: await this.headers()}).toPromise();
  }

  async addRating(rating: any, idValue: any) {
    return this.http.post(apiUrl  + `hints/add-rating/${idValue}`, rating, {headers: await this.headers()}).toPromise();
  }

  suggestOccasion() {
    this.hints.occasion = this.occasions[Math.floor(Math.random()*this.occasions.length)].name;
    this.hints.weather = this.weathers[Math.floor(Math.random()*this.weathers.length)].name;
    this.hints.season = this.seasons[Math.floor(Math.random()*this.seasons.length)].name;
    this.storage.get('user').then((data)=> {
      let user = JSON.parse(data);
      this.hints.gender = user.gender;
      this.hints.size = user.size;
      this.hints.interest = user.interest;
     })
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
