import { BusinessService } from './../../_services/business.service';
import { Chart } from 'chart.js';
import { DesignerService } from 'src/app/_services/designer.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AlertController, NavController, ActionSheetController } from '@ionic/angular';
import * as _ from 'lodash';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.page.html',
  styleUrls: ['./all-orders.page.scss'],
})
export class AllOrdersPage implements OnInit {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  barChart: Chart;
  labels: any[] = [];
  data: any[] = [];
  years: any[] = [new Date().getFullYear(), new Date().getFullYear() + 1, new Date().getFullYear() + 2]
  year: any ={
    year: new Date().getFullYear()
  };
  date = this.year['year'];
  month: any = '';
  monthNumber: number = -1;
  orders: any[];
  ordersClone: any[];
  allOrdersClone: any[];
  page: number = 1;
  totalOrders: any;
  grandTotalOrders: any;
  toggleChart: boolean = true;
  constructor(
    private alertCtrl: AlertController,
    private designerService: DesignerService,
    private businessService: BusinessService,
    private navCtrl: NavController,
    private actionSheetCtrl: ActionSheetController) { 
    this.totalDailyOrders();
    this.chartStatistics();
    this.getOrders();
    }

  ngOnInit() {
  }

  toggleCharts() {
    this.toggleChart = !this.toggleChart;
    if (this.toggleChart) {
      this.chartStatistics();
    }
  }

  toOrder(orderId: any) {
    this.businessService.orderId = orderId;
    this.navCtrl.navigateForward('order');
  }

  //chart stats
  async chartStatistics() {
    this.data = [];
    this.labels = [];
    this.date = this.year['year'];
    if (this.monthNumber !== -1) {
      this.monthlyOrders(this.monthNumber);
    }
    try {
      const statisticsInfo = await this.designerService.chartStatistics({year: this.year['year']});
      if (statisticsInfo['success']) {
        const orderData = _.orderBy(statisticsInfo['orderData'], ['rep'],['asc']);
        orderData.forEach(rec => {
          this.labels.push(rec.month);
        });
        orderData.forEach(rec => {
          this.data.push(rec.total);
        });

        this.barChart = new Chart(this.barCanvas.nativeElement, {
          type: "bar",
          data: {
            labels: this.labels,
            datasets: [
              {
                label: "# of orders",
                data: this.data,
                backgroundColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)",
                  "rgba(54, 191, 255, 1)",
                  "rgba(274, 153, 135, 1)",
                  "rgba(55, 192, 255, 1)",
                  "rgba(75, 132, 64, 1)",
                  "rgba(53, 99, 255, 1)",
                  "rgba(255, 202, 64, 1)"
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      } else {
        this.presentAlert('Sorry, an error occured while getting stats info');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting stats info');
    }
  }

   //get orders
   async getOrders() {
   try {
     const orderInfo = await this.designerService.allOrders(this.page);
     if (orderInfo['success']) {
       this.allOrdersClone = orderInfo['orders'];
       this.totalOrders = orderInfo['totalOrders']
       this.grandTotalOrders = orderInfo['grandTotal']
     } else {
       this.presentAlert('Sorry, an error occured while getting all orders');
     }
   } catch (error) {
     this.presentAlert('Sorry, an error occured while getting all orders');
   }
 }

 async totalDailyOrders() {
  try {
    const statisticsInfo = await this.designerService.dailyOrders();
    if (statisticsInfo['success']) {
      this.orders = statisticsInfo['orders'];
      this.ordersClone = statisticsInfo['orders'];

    } else {
      this.presentAlert('Sorry, an error occured while getting stats info');
    }
  } catch (error) {
    this.presentAlert('Sorry, an error occured while getting stats info');
  }
}

 async monthlyOrders(month: any) {
   if (month >= 0) {
    try {
      const statisticsInfo = await this.designerService.monthlyOrders({year: this.date, month: month});
      if (statisticsInfo['success']) {
        this.orders = statisticsInfo['orders'];
        this.grandTotalOrders = statisticsInfo['orders'].length;
      } else {
        this.presentAlert('Sorry, an error occured while getting stats info');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting stats info');
    } 
   }
}

  //alert
  async presentAlert(message: any) {
   const alert = await this.alertCtrl.create({
     header: 'Order Error',
     message: message,
     buttons: ['OK']
   });

   await alert.present();
 }

 async monthlyActionSheet() {
  const actionSheet = await this.actionSheetCtrl.create({
    header: 'Months',
    buttons: [{
      text: 'January',
      handler: () => {
        this.monthNumber = 0;
        this.month = 'January'
        this.monthlyOrders(0);
      }
    }, {
      text: 'February',
      handler: () => {
        this.monthNumber = 1;
        this.month = 'February';
        this.monthlyOrders(1);
      }
    }, {
      text: 'March',
      handler: () => {
        this.monthNumber = 2;
        this.month = 'March';
        this.monthlyOrders(2);
      }
    }, {
      text: 'April',
      handler: () => {
        this.monthNumber = 3;
        this.month = 'April';
        this.monthlyOrders(3);
      }
    }, {
      text: 'May',
      handler: () => {
        this.monthNumber = 4;
        this.month = 'May'
        this.monthlyOrders(4)
      }
    }, {
      text: 'June',
      handler: () => {
        this.monthNumber = 5;
        this.month = 'June'
        this.monthlyOrders(5)
      }
    }, {
      text: 'July',
      handler: () => {
        this.monthNumber = 6;
        this.month = 'July'
        this.monthlyOrders(6)
      }
    }, {
      text: 'August',
      handler: () => {
        this.monthNumber = 7;
        this.month = 'August'
        this.monthlyOrders(7)
      }
    }, {
      text: 'September',
      handler: () => {
        this.monthNumber = 8;
        this.month = 'September'
        this.monthlyOrders(8)
      }
    }, {
      text: 'October',
      handler: () => {
        this.monthNumber = 9;
        this.month = 'October'
        this.monthlyOrders(9)
      }
    }, {
      text: 'November',
      handler: () => {
        this.monthNumber = 10;
        this.month = 'November'
        this.monthlyOrders(10)
      }
    }, {
      text: 'December',
      handler: () => {
        this.monthNumber = 11;
        this.month = 'December'
        this.monthlyOrders(11)
      }
    }, {
      text: 'For the day',
      handler: () => {
        this.monthNumber = -1;
        this.month = '';
        this.year['year'] =  new Date().getFullYear();
        this.orders = this.ordersClone;
        this.chartStatistics();
      }
    }, {
      text: 'All orders ever gotten',
      handler: () => {
       this.orders = this.allOrdersClone;
        this.chartStatistics();
      }
    }]
  });
  await actionSheet.present();
}

 loadData(event: any) {
   this.page++
   setTimeout(() => {
     this.designerService.allOrders(this.page).then((orderInfo) => {
       orderInfo['orders'].forEach((order: any) => {
         this.orders.push(order)
       });
       event.target.complete();
     });
 
     if (this.orders.length == this.totalOrders) {
       event.target.disabled = true;
     }
   }, 800);
 }

 doRefresh(event){
   this.page = 1;
   setTimeout(() => {
    this.getOrders();
     event.target.complete();
   }, 1000);
 }

}
