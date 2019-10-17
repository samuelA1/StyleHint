import { NewsService } from './../../_services/news.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AlertController, NavController } from '@ionic/angular';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-all-news',
  templateUrl: './all-news.page.html',
  styleUrls: ['./all-news.page.scss'],
})
export class AllNewsPage implements OnInit {
  allNews: any[];
  page: number = 1;
  totalNews: any;

  constructor( private alertCtrl: AlertController,
    private navCtrl: NavController,
    private newsService: NewsService,
    private adminService: AdminService) { 
      this.getAllNews();
  }

  GetPostTime(time) {
    return moment(time).fromNow();
  }

  ngOnInit() {
  }

  //navigate to update
  toUpdate(id: any) {
    this.newsService.id = id;
    this.adminService.newsId = id;
    this.navCtrl.navigateForward('update-news')
  }

  async getAllNews() {
    try {
      const newsInfo = await this.newsService.allNews(this.page);
      if (newsInfo['success']) {
        this.allNews = newsInfo['news'];
        this.totalNews = newsInfo['totalNews'];
      } else {
        this.presentAlert('Sorry, an error occured while getting all news');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting all news');
    }
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

  loadData(event: any) {
    this.page++
    setTimeout(() => {
      this.newsService.allNews(this.page).then((newsInfo) => {
        newsInfo['news'].forEach((news: any) => {
          this.allNews.push(news)
        });
        event.target.complete();
      });
  
      if (this.allNews.length == this.totalNews) {
        event.target.disabled = true;
      }
    }, 800);
  }

  doRefresh(event){
    this.page = 1;
    setTimeout(() => {
     this.getAllNews();
      event.target.complete();
    }, 1000);
  }


}
