import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/_services/admin.service';
import { AlertController, ToastController, ActionSheetController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-all-hints',
  templateUrl: './all-hints.page.html',
  styleUrls: ['./all-hints.page.scss'],
})
export class AllHintsPage implements OnInit {

  allHints: any[];
  page: number = 1;
  genderSort: string = ''//sorting value
  occasionSort: string = ''//sorting value
  interestSort: string = ''//sorting value
  //list of occasions
  genders: any = [
    { name: 'male adult', val: 'male adult' },
    { name: 'male kid',  val: 'male kid'  },
    { name: 'female adult', val: 'female adult' },
    { name: 'female kid',  val: 'female kid' },
    { name: 'none',  val: '' },
  ];

  //list of interest
  interests: any = [
    { name: 'expensive'},
    { name: 'casual' },
    { name: 'none' },
  ];

  //occasion/event array
  occasions: any[] = [
    {name: 'school'},
    {name: 'sport'},
    {name: 'birthday party'},
    {name: 'halloween'},
    {name: 'christmas'},
    {name: 'church'},
    {name: 'date night'},
    {name: 'job interview'},
    {name: 'culture'},
    {name: 'none'},
  ]

  constructor(private adminService: AdminService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController) { 
      this.getAllHints();
    }

  ngOnInit() {
    
  }

  //navigate to update
  toUpdate(hintId: any) {
    this.adminService.hintId = hintId;
    this.navCtrl.navigateForward('update-hint')
  }

  //get total hints
  async getAllHints() {
    try {
      const statisticsInfo = await this.adminService.allHints();
      if (statisticsInfo['success']) {
        this.allHints = statisticsInfo['hints'];
      } else {
        this.presentAlert('Sorry, an error occured while getting all hints');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting all hints');
    }
  }

  //sort hints
  async sortHints(sort: any) {
    try {
      const sortedInfo = await this.adminService.sortHints(sort);
      if (sortedInfo['success']) {
        this.allHints = sortedInfo['hints'];
      } else {
        this.presentAlert('Sorry, an error occured while getting all hints');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting all hints');
    }
  }

  //sorting by gender
  async presentGenderActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'genders',
      buttons: [
         {
        text: `${this.genders[0].name}`,
        handler: () => {
          this.genderSort = `${this.genders[0].name}`;
          this.sortHints({interest: `${this.interestSort}`, occasion: `${this.occasionSort}`, gender: `${this.genders[0].name}`})
        }
      }, {
        text: `${this.genders[1].name}`,
        handler: () => {
          this.genderSort = `${this.genders[1].name}`;
          this.sortHints({interest: `${this.interestSort}`, occasion: `${this.occasionSort}`, gender: `${this.genders[1].name}`})
        }
      }, {
        text: `${this.genders[2].name}`,
        handler: () => {
          this.genderSort = `${this.genders[2].name}`;
          this.sortHints({interest: `${this.interestSort}`, occasion: `${this.occasionSort}`, gender: `${this.genders[2].name}`})
        }
      }, {
        text: `${this.genders[3].name}`,
        handler: () => {
          this.genderSort = `${this.genders[3].name}`;
          this.sortHints({interest: `${this.interestSort}`, occasion: `${this.occasionSort}`, gender: `${this.genders[3].name}`})
        }
      },  {
        text: `${this.genders[4].name}`,
        handler: () => {
          this.genderSort = '';
          this.sortHints({interest: `${this.interestSort}`, occasion: `${this.occasionSort}`, gender: ''})
        }
      }
    ]
    });
    await actionSheet.present();
  }

  //sorting by interest
  async presentInterestActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'interests',
      buttons: [
         {
        text: `${this.interests[0].name}`,
        handler: () => {
          this.interestSort = `${this.interests[0].name}`;
          this.sortHints({interest: `${this.interests[0].name}`, occasion: `${this.occasionSort}`, gender: `${this.genderSort}`})
        }
      }, {
        text: `${this.interests[1].name}`,
        handler: () => {
          this.interestSort = `${this.interests[1].name}`;
          this.sortHints({interest: `${this.interests[0].name}`, occasion: `${this.occasionSort}`, gender: `${this.genderSort}`})
        }
      }, {
        text: `${this.interests[2].name}`,
        handler: () => {
          this.interestSort = '';
          this.sortHints({interest: '', occasion: `${this.occasionSort}`, gender: `${this.genderSort}`})
        }
      }
    ]
    });
    await actionSheet.present();
  }

  //sort by occasion
  async presentOccasionActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'occasions',
      buttons: [
         {
        text: `${this.occasions[0].name}`,
        handler: () => {
          this.occasionSort = `${this.occasions[0].name}`;
          this.sortHints({occasion: `${this.occasions[0].name}`, gender: `${this.genderSort}`, interest: `${this.interestSort}`})
        }
      }, {
        text: `${this.occasions[1].name}`,
        handler: () => {
          this.occasionSort = `${this.occasions[1].name}`;
          this.sortHints({occasion: `${this.occasions[1].name}`, gender: `${this.genderSort}`, interest: `${this.interestSort}`})
        }
      }, {
        text: `${this.occasions[2].name}`,
        handler: () => {
          this.occasionSort = `${this.occasions[2].name}`;
          this.sortHints({occasion: `${this.occasions[2].name}`, gender: `${this.genderSort}`, interest: `${this.interestSort}`})
        }
      }, {
        text: `${this.occasions[3].name}`,
        handler: () => {
          this.occasionSort = `${this.occasions[3].name}`;
          this.sortHints({occasion: `${this.occasions[3].name}`, gender: `${this.genderSort}`, interest: `${this.interestSort}`})
        }
      }, {
        text: `${this.occasions[4].name}`,
        handler: () => {
          this.occasionSort = `${this.occasions[4].name}`;
          this.sortHints({occasion: `${this.occasions[4].name}`, gender: `${this.genderSort}`, interest: `${this.interestSort}`})
        }
      }, {
        text: `${this.occasions[5].name}`,
        handler: () => {
          this.occasionSort = `${this.occasions[5].name}`;
          this.sortHints({occasion: `${this.occasions[5].name}`, gender: `${this.genderSort}`, interest: `${this.interestSort}`})
        }
      }, {
        text: `${this.occasions[6].name}`,
        handler: () => {
          this.occasionSort = `${this.occasions[6].name}`;
          this.sortHints({occasion: `${this.occasions[6].name}`, gender: `${this.genderSort}`, interest: `${this.interestSort}`})
        }
      }, {
        text: `${this.occasions[7].name}`,
        handler: () => {
          this.occasionSort = `${this.occasions[7].name}`;
          this.sortHints({occasion: `${this.occasions[7].name}`, gender: `${this.genderSort}`, interest: `${this.interestSort}`})
        }
      }, {
        text: `${this.occasions[8].name}`,
        handler: () => {
          this.occasionSort = `${this.occasions[8].name}`;
          this.sortHints({occasion: `${this.occasions[8].name}`, gender: `${this.genderSort}`, interest: `${this.interestSort}`})
        }
      },{
        text: `${this.occasions[9].name}`,
        handler: () => {
          this.occasionSort = '';
          this.sortHints({occasion: '', gender: `${this.genderSort}`, interest: `${this.interestSort}`})
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


}
