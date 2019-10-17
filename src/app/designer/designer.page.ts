import { Component, OnInit } from '@angular/core';
import { TitleService } from '../_services/title.service';
import { MenuController, AlertController, ToastController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { WeatherService } from '../_services/weather.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-designer',
  templateUrl: './designer.page.html',
  styleUrls: ['./designer.page.scss'],
})
export class DesignerPage implements OnInit {

  constructor(public titleService: TitleService,
    private menuCtrl: MenuController,
    private geolocation: Geolocation,
    private weatherService: WeatherService,
    public authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.menuCtrl.enable(true, 'first');
    this.menuCtrl.open('first');
  }

   //alert
   async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
