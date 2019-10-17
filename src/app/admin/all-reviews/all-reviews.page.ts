import { AlertController, ActionSheetController, NavController } from '@ionic/angular';
import { AdminService } from './../../_services/admin.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-all-reviews',
  templateUrl: './all-reviews.page.html',
  styleUrls: ['./all-reviews.page.scss'],
})
export class AllReviewsPage implements OnInit {
reviews: any[];
page: number = 1;
totalReviews: any;
reviewType: string;
  constructor(private adminService: AdminService,
    private alertCtrl: AlertController, 
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController) { 
      this.getReviews('review');
    }

  ngOnInit() {
  }

  GetPostTime(time) {
    return moment(time).fromNow();
  }

  //nav to decision
  toDecision(productId: any) {
    this.adminService.productId = productId;
    this.navCtrl.navigateForward('decision');
  }

   //get reviews by status
   async getReviews(status: any) {
     this.reviewType = status;
    try {
      const reviewInfo = await this.adminService.getReviews({reviewType: status}, this.page);
      if (reviewInfo['success']) {
        this.reviews = reviewInfo['reviews'];
        this.totalReviews = reviewInfo['totalReviews']
      } else {
        this.presentAlert('Sorry, an error occured while getting all reviews');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting all reviews');
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
      this.adminService.getReviews({reviewType: this.reviewType}, this.page).then((reviewInfo) => {
        reviewInfo['reviews'].forEach((review: any) => {
          this.reviews.push(review)
        });
        event.target.complete();
      });
  
      if (this.reviews.length == this.totalReviews) {
        event.target.disabled = true;
      }
    }, 800);
  }

  doRefresh(event){
    this.page = 1;
    setTimeout(() => {
     this.getReviews(this.reviewType);
      event.target.complete();
    }, 1000);
  }

  async statusActionSheet() {
    this.page = 1;
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'status',
      buttons: [
        {
        text: 'In review',
        handler: () => {
          this.getReviews('review');
        }
      }, {
        text: 'Approved',
        handler: () => {
          this.getReviews('approved');
        }
      }, {
        text: 'Denied',
        handler: () => {
          this.getReviews('denied');
        }
      }
    ]
    });
    await actionSheet.present();
  }


}
