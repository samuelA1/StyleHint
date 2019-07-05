import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) { }

  getWeather(latitude, longitude) {
    var OpenWeatherAppKey = "35484ef96d7c7148daf1d73dfeefeb85";
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?lat='
    + latitude + '&lon=' + longitude + '&appid=' + OpenWeatherAppKey + '&units=imperial').toPromise();
  }
}
