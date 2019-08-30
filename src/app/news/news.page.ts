import { NewsService } from 'src/app/_services/news.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  news: any = {};

  constructor(private newsService: NewsService,
    private alertCtrl: AlertController) { 
      this.getNews();
    }

  ngOnInit() {
  }

  async getNews() {
    try {
      const newsInfo = await this.newsService.getSingleNews();
      if (newsInfo['success']) {
        this.news = newsInfo['news'];
      } else {
        this.presentAlert('Sorry, an error occured while getting a news');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting a news');
    }
  }

   //alert ctrl
   async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'News Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
