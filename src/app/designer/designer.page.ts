import { Component, OnInit } from '@angular/core';
import { TitleService } from '../_services/title.service';
import { MenuController, AlertController } from '@ionic/angular';
import { AuthService } from '../_services/auth.service';
import { DesignerService } from '../_services/designer.service';

@Component({
  selector: 'app-designer',
  templateUrl: './designer.page.html',
  styleUrls: ['./designer.page.scss'],
})
export class DesignerPage implements OnInit {
  sumFinances: any;
  sumOrders: any;
  dailyOrders: any;
  dailyFinances: any;
  weeklyOrders: any;
  monthlyOrders: any;
  monthlyFinances: any;
  yearlyOrders: any;
  yearlyFinances: any;
  date = Date.now();

  constructor(public titleService: TitleService,
    private menuCtrl: MenuController,
    public authService: AuthService,
    private alertCtrl: AlertController,
    private designerService: DesignerService) { 
      this.sumFinancesOrders();
      this.totalDailyOrders();
      this.totalWeeklyOrders();
      this.totalMonthlyOrders();
      this.totalYearlyOrders();
      this.getDailyFinances();
      this.totalMonthlyFinances();
      this.totalYearlyFinances();
    }

  ngOnInit() {
    this.menuCtrl.enable(true, 'first');
    this.menuCtrl.open('first');
  }

  async sumFinancesOrders() {
    try {
      const statisticsInfo = await this.designerService.sumFinancesOrders();
      if (statisticsInfo['success']) {
        this.sumFinances = statisticsInfo['totalSold'];
        this.sumOrders = statisticsInfo['orders'].length;
      } else {
        this.presentAlert('Sorry, an error occured while getting stats info');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting stats info');
    }
  }

  async totalDailyOrders() {
    try {
      const statisticsInfo = await this.designerService.dailyOrders();
      if (statisticsInfo['success']) {
        this.dailyOrders = statisticsInfo['orders'].length;
      } else {
        this.presentAlert('Sorry, an error occured while getting stats info');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting stats info');
    }
  }

  async totalWeeklyOrders() {
    try {
      const statisticsInfo = await this.designerService.weeklyOrders();
      if (statisticsInfo['success']) {
        this.weeklyOrders = statisticsInfo['orders'].length;
      } else {
        this.presentAlert('Sorry, an error occured while getting stats info');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting stats info');
    }
  }

  async totalMonthlyOrders() {
    try {
      const statisticsInfo = await this.designerService.monthlyOrders({year: new Date().getFullYear(), month: new Date().getMonth()});
      if (statisticsInfo['success']) {
        this.monthlyOrders = statisticsInfo['orders'].length;
      } else {
        this.presentAlert('Sorry, an error occured while getting stats info');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting stats info');
    }
  }

  async totalYearlyOrders() {
    try {
      const statisticsInfo = await this.designerService.yearlyOrders({year: new Date().getFullYear()});
      if (statisticsInfo['success']) {
        this.yearlyOrders = statisticsInfo['orders'].length;
      } else {
        this.presentAlert('Sorry, an error occured while getting stats info');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting stats info');
    }
  }

   //get daily finances 
   async getDailyFinances() {
    try {
      const financeInfo = await this.designerService.dailyFinances();
      if (financeInfo['success']) {
        this.dailyFinances = financeInfo['totalSold'];
      } else {
        this.presentAlert('Sorry, an error occured while getting all your finances');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting all your finances');
    }
  }

  async totalMonthlyFinances() {
    try {
      const statisticsInfo = await this.designerService.monthlyFinances({year: new Date().getFullYear(), month: new Date().getMonth()});
      if (statisticsInfo['success']) {
        this.monthlyFinances = statisticsInfo['totalSold'];
      } else {
        this.presentAlert('Sorry, an error occured while getting stats info');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting stats info');
    }
  }

  async totalYearlyFinances() {
    try {
      const statisticsInfo = await this.designerService.yearlyFinances({year: new Date().getFullYear()});
      if (statisticsInfo['success']) {
        this.yearlyFinances = statisticsInfo['totalSold'];
      } else {
        this.presentAlert('Sorry, an error occured while getting stats info');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting stats info');
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

}
