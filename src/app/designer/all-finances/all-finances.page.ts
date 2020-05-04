import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AlertController, ActionSheetController } from '@ionic/angular';
import { DesignerService } from 'src/app/_services/designer.service';
import { Chart } from 'chart.js';
import * as _ from 'lodash';


@Component({
  selector: 'app-all-finances',
  templateUrl: './all-finances.page.html',
  styleUrls: ['./all-finances.page.scss'],
})
export class AllFinancesPage implements OnInit {

  @ViewChild("barCanvas") barCanvas: ElementRef;
  barChart: Chart;
  finances: any[];
  financesClone: any[];
  totalSold: any;
  totalSoldClone: any;
  totalQuantity: any;
  totalOrders: any;
  totalOrdersClone: any;
  labels: any[] = [];
  data: any[] = [];
  years: any[] = [new Date().getFullYear(), new Date().getFullYear() + 1, new Date().getFullYear() + 2]
  year: any ={
    year: new Date().getFullYear()
  };
  date = this.year['year'];
  month: any = '';
  monthNumber: number = -1;
  toggleChart: boolean = true;
  constructor(
    private alertCtrl: AlertController,
    private designerService: DesignerService,
    private actionSheetCtrl: ActionSheetController) { 
      this.financeStatistics();
      this.getDailyFinances();
    }

  ngOnInit() {
  }

  toggleCharts() {
    this.toggleChart = !this.toggleChart;
    if (this.toggleChart) {
      this.financeStatistics();
    }
  }

  //get daily finances 
  async getDailyFinances() {
   try {
     const financeInfo = await this.designerService.dailyFinances();
     if (financeInfo['success']) {
       this.finances = financeInfo['orders'];
       this.financesClone = financeInfo['orders'];
       this.totalOrders = financeInfo['totalOrders'];
       this.totalOrdersClone = financeInfo['totalOrders'];
       this.totalSold = financeInfo['totalSold'];
       this.totalSoldClone = financeInfo['totalSold'];
       this.totalQuantity = financeInfo['totalQuantity'];
     } else {
       this.presentAlert('Sorry, an error occured while getting all your finances');
     }
   } catch (error) {
     this.presentAlert('Sorry, an error occured while getting all your finances');
   }
 }

  //get monthly finances 
  async monthlyFinances(month: any) {
    if (month >= 0) {
      try {
        const financeInfo = await this.designerService.monthlyFinances({year: this.date, month: month});
        if (financeInfo['success']) {
          this.finances = financeInfo['orders'];
          this.totalOrders = financeInfo['totalOrders'];
          this.totalSold = financeInfo['totalSold'];
          this.totalQuantity = financeInfo['totalQuantity'];
        } else {
          this.presentAlert('Sorry, an error occured while getting all your finances');
        }
      } catch (error) {
        this.presentAlert('Sorry, an error occured while getting all your finances');
      } 
    }
  }

  //finance stats
  async financeStatistics() {
    this.data = [];
    this.labels = [];
    this.date = this.year['year'];
    if (this.monthNumber !== -1) {
      this.monthlyFinances(this.monthNumber);
    }
    try {
      const statisticsInfo = await this.designerService.financeStatistics({year: this.year['year']});
      if (statisticsInfo['success']) {
        const financesData = _.orderBy(statisticsInfo['financesData'], ['rep'],['asc']);
        financesData.forEach(rec => {
          this.labels.push(rec.month);
        });
        financesData.forEach(rec => {
          this.data.push(rec.total);
        });

        this.barChart = new Chart(this.barCanvas.nativeElement, {
          type: "bar",
          data: {
            labels: this.labels,
            datasets: [
              {
                label: "$ dollars",
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

  async monthlyActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Months',
      buttons: [{
        text: 'January',
        handler: () => {
          this.monthNumber = 0;
          this.month = 'January'
          this.monthlyFinances(0);
        }
      }, {
        text: 'February',
        handler: () => {
          this.monthNumber = 1;
          this.month = 'February';
          this.monthlyFinances(1);
        }
      }, {
        text: 'March',
        handler: () => {
          this.monthNumber = 2;
          this.month = 'March';
          this.monthlyFinances(2);
        }
      }, {
        text: 'April',
        handler: () => {
          this.monthNumber = 3;
          this.month = 'April';
          this.monthlyFinances(3);
        }
      }, {
        text: 'May',
        handler: () => {
          this.monthNumber = 4;
          this.month = 'May'
          this.monthlyFinances(4)
        }
      }, {
        text: 'June',
        handler: () => {
          this.monthNumber = 5;
          this.month = 'June'
          this.monthlyFinances(5)
        }
      }, {
        text: 'July',
        handler: () => {
          this.monthNumber = 6;
          this.month = 'July'
          this.monthlyFinances(6)
        }
      }, {
        text: 'August',
        handler: () => {
          this.monthNumber = 7;
          this.month = 'August'
          this.monthlyFinances(7)
        }
      }, {
        text: 'September',
        handler: () => {
          this.monthNumber = 8;
          this.month = 'September'
          this.monthlyFinances(8)
        }
      }, {
        text: 'October',
        handler: () => {
          this.monthNumber = 9;
          this.month = 'October'
          this.monthlyFinances(9)
        }
      }, {
        text: 'November',
        handler: () => {
          this.monthNumber = 10;
          this.month = 'November'
          this.monthlyFinances(10)
        }
      }, {
        text: 'December',
        handler: () => {
          this.monthNumber = 11;
          this.month = 'December'
          this.monthlyFinances(11)
        }
      }, {
        text: 'For the day',
        handler: () => {
          this.monthNumber = -1;
          this.month = '';
          this.year['year'] =  new Date().getFullYear();
          this.finances = this.financesClone;
          this.totalSold = this.totalSoldClone;
          this.totalOrders = this.totalOrdersClone;
          this.financeStatistics();
        }
      }]
    });
    await actionSheet.present();
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

}
