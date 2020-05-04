import { TitleService } from './../../_services/title.service';
import { Chart } from 'chart.js';
import { FriendService } from './../../_services/friend.service';
import { AlertController, ToastController, ActionSheetController, NavController } from '@ionic/angular';
import { AdminService } from './../../_services/admin.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as io from 'socket.io-client';
import * as _ from 'lodash';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.page.html',
  styleUrls: ['./all-users.page.scss'],
})
export class AllUsersPage implements OnInit {
  @ViewChild("barCanvas") barCanvas: ElementRef;
  barChart: Chart;
  labels: any[] = [];
  data: any[] = [];
  years: any[] = [new Date().getFullYear(), new Date().getFullYear() + 1, new Date().getFullYear() + 2]
  year: any ={
    year: new Date().getFullYear()
  };
  date = this.year['year'];



  allUsers: any[];
  socket: any;
  page: number = 1;
  sortings: string = 'all users'//sorting value
  query: string = '';
  //list of genders
  genders: any = [
    { name: 'all users' },
    { name: 'male adult', val: 'male adult' },
    { name: 'male kid',  val: 'male kid'  },
    { name: 'female adult', val: 'female adult' },
    { name: 'female kid',  val: 'female kid' },
    { name: 'all males',  val: 'male' },
    { name: 'all females',  val: 'female' },
  ];

  constructor(private adminService: AdminService,
    private friendsService: FriendService,
    private titleService: TitleService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController) { 
      this.chartStatistics();
      this.getAllUsers();
      this.socket = io('http://www.thestylehint.com')
    }

  ngOnInit() {
    this.socket.emit('logIn', {});
    this.socket.on('loggedIn', total => {
      if (this.titleService.isAdmin) {
        this.getAllUsers();
      }
    });
  }

  //navigate to update
  toUpdate(id: any) {
    this.adminService.id = id;
    this.navCtrl.navigateForward('update-user')
  }

  //chart stats
  async chartStatistics() {
    this.data = [];
    this.labels = [];
    this.date = this.year['year'];
    try {
      const statisticsInfo = await this.adminService.chartStatistics({year: this.year['year']});
      if (statisticsInfo['success']) {
        const userData = _.orderBy(statisticsInfo['userData'], ['rep'],['asc']);
        userData.forEach(rec => {
          this.labels.push(rec.month);
        });
        userData.forEach(rec => {
          this.data.push(rec.total);
        });

        this.barChart = new Chart(this.barCanvas.nativeElement, {
          type: "bar",
          data: {
            labels: this.labels,
            datasets: [
              {
                label: "# of users",
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

  //get total users
  async getAllUsers() {
    try {
      const statisticsInfo = await this.adminService.allUsers();
      if (statisticsInfo['success']) {
        this.allUsers = statisticsInfo['users'];
      } else {
        this.presentAlert('Sorry, an error occured while getting all users');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting all users');
    }
  }

  //sort users
  async sortUsers(sort: any) {
    try {
      const sortedInfo = await this.adminService.sortUsers(sort);
      if (sortedInfo['success']) {
        this.allUsers = sortedInfo['users'];
      } else {
        this.presentAlert('Sorry, an error occured while getting all users');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting all users');
    }
  }

  //for new friends
  async searchUser() {
    try {
      if (this.query !== '') {
        const data = await this.friendsService.search(this.query, this.page-1);
        if (data['success']) {
            this.allUsers = data['content'].hits
        } else {
          this.presentAlert('Sorry, an error occured while searching for a user.');
        }
      } else {
        this.getAllUsers();
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while searching for a user.')
    }
  }

  async presentGenderActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'genders',
      buttons: [
        {
        text: `${this.genders[0].name}`,
        handler: () => {
          this.sortings = `${this.genders[0].name}`;
          this.getAllUsers();
        }
      }, {
        text: `${this.genders[1].name}`,
        handler: () => {
          this.sortings = `${this.genders[1].name}`;
          this.sortUsers({sort: `${this.genders[1].val}`})
        }
      }, {
        text: `${this.genders[2].name}`,
        handler: () => {
          this.sortings = `${this.genders[2].name}`;
          this.sortUsers({sort: `${this.genders[2].val}`})
        }
      }, {
        text: `${this.genders[3].name}`,
        handler: () => {
          this.sortings = `${this.genders[3].name}`;
          this.sortUsers({sort: `${this.genders[3].val}`})
        }
      }, {
        text: `${this.genders[4].name}`,
        handler: () => {
          this.sortings = `${this.genders[4].name}`;
          this.sortUsers({sort: `${this.genders[4].val}`})
        }
      },
      {
        text: `${this.genders[5].name}`,
        handler: () => {
          this.sortings = `${this.genders[5].name}`;
          this.sortUsers({sort: `${this.genders[5].val}`})
        }
      },
      {
        text: `${this.genders[6].name}`,
        handler: () => {
          this.sortings = `${this.genders[6].name}`;
          this.sortUsers({sort: `${this.genders[6].val}`})
        }
      }
    ]
    });
    await actionSheet.present();
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

   //toast
   async presentToast(message, color) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: color,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  doRefresh(event){
    setTimeout(() => {
     this.chartStatistics();
     this.getAllUsers();
      event.target.complete();
    }, 1000);
  }

}
