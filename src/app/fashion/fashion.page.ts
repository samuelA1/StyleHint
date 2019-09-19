import { HintsService } from './../_services/hints.service';
import { Storage } from '@ionic/storage';
import { Component, OnInit} from '@angular/core';
import { NavController, ModalController, ActionSheetController, AlertController } from '@ionic/angular';
import { TitleService } from '../_services/title.service';
import { FashionModalPage } from '../fashion-modal/fashion-modal.page';


@Component({
  selector: 'app-fashion',
  templateUrl: './fashion.page.html',
  styleUrls: ['./fashion.page.scss'],
})
export class FashionPage implements OnInit {
  movedForward: boolean = false;
  hideForward: boolean = true;
  occasion: any;
  loading: boolean = false;
  page: number = 1;
  totalPages: number;
  hints: any[] = [];

  constructor(public titleService: TitleService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private storage: Storage,
    private hintService: HintsService,
    private alertCtrl: AlertController) { 
      this.getInitialContent();
    }

    async getInitialContent() {
      try {
        const hintsInfo = await this.hintService.getHints(this.page);
        if (hintsInfo['success']) {
          this.hints = hintsInfo['hints'];
          this.totalPages = hintsInfo['totalPages'];
        } else {
          this.presentAlert(hintsInfo['message'])
        }
      } catch (error) {
        this.presentAlert('Sorry, the was an error trying to get your hints. Please try again.')
      }
    }

  getMore() {
    this.movedForward = true;
    this.page++
    this.getInitialContent();
  }

  moveBack() {
    this.page--
    this.getInitialContent();
  }

  navigateBack() {
    this.navCtrl.pop();
  }

  //occasion/event array
  occasions: any[] = [
    {name: 'School', icon: 'school', isChosen: false},
    {name: 'Sport', icon: 'american-football', isChosen: false},
    {name: 'Birthday party', icon: 'color-wand', isChosen: false},
    {name: 'church', icon: 'add-circle-outline', isChosen: false},
    // {name: 'Date night', icon: 'contacts', isChosen: false},
    // {name: 'Job interview', icon: 'person-add', isChosen: false},
    // {name: 'Culture', icon: 'home', isChosen: false},
    // {name: 'Christmas', icon: 'gift', isChosen: false},
    // {name: 'Halloween', icon: 'outlet', isChosen: false},
  ]

  async presentOccasionActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Occasions',
      buttons: [
        {
        text: `${this.occasions[0].name}`,
        handler: () => {
          this.occasion = `${this.occasions[0].name}`;
          this.titleService.finalData['occasion'] = this.occasion;
          this.storage.set('finalData', JSON.stringify(this.titleService.finalData));
          this.page = 1;
          this.getInitialContent();
        }
      }, {
        text: `${this.occasions[1].name}`,
        handler: () => {
          this.occasion = `${this.occasions[1].name}`;
          this.titleService.finalData['occasion'] = this.occasion;
          this.storage.set('finalData', JSON.stringify(this.titleService.finalData));
          this.page = 1;
          this.getInitialContent();
        }
      }, {
        text: `${this.occasions[2].name}`,
        handler: () => {
          this.occasion = `${this.occasions[2].name}`;
          this.titleService.finalData['occasion'] = this.occasion;
          this.storage.set('finalData', JSON.stringify(this.titleService.finalData));
          this.page = 1;
          this.getInitialContent();
        }
      },
       {
        text: `${this.occasions[3].name}`,
        handler: () => {
          this.occasion = `${this.occasions[3].name}`;
          this.titleService.finalData['occasion'] = this.occasion;
          this.storage.set('finalData', JSON.stringify(this.titleService.finalData));
          this.page = 1;
          this.getInitialContent();
        }
      }, 
      // {
      //   text: `${this.occasions[4].name}`,
      //   handler: () => {
      //     this.occasion = `${this.occasions[4].name}`;
      //     this.titleService.finalData['occasion'] = this.occasion;
      //     this.storage.set('finalData', JSON.stringify(this.titleService.finalData));
      //     this.page = 1;
      //     this.getInitialContent();
      //   }
      // },
      // {
      //   text: `${this.occasions[5].name}`,
      //   handler: () => {
      //     this.occasion = `${this.occasions[5].name}`;
      //     this.titleService.finalData['occasion'] = this.occasion;
      //     this.storage.set('finalData', JSON.stringify(this.titleService.finalData));
      //     this.page = 1;
      //     this.getInitialContent();
      //   }
      // },
      // {
      //   text: `${this.occasions[6].name}`,
      //   handler: () => {
      //     this.occasion = `${this.occasions[6].name}`;
      //     this.titleService.finalData['occasion'] = this.occasion;
      //     this.storage.set('finalData', JSON.stringify(this.titleService.finalData));
      //     this.page = 1;
      //     this.getInitialContent();
      //   }
      // },
      // {
      //   text: `${this.occasions[7].name}`,
      //   handler: () => {
      //     this.occasion = `${this.occasions[7].name}`;
      //     this.titleService.finalData['occasion'] = this.occasion;
      //     this.storage.set('finalData', JSON.stringify(this.titleService.finalData));
      //     this.page = 1;
      //     this.getInitialContent();
      //   }
      // },
      // {
      //   text: `${this.occasions[8].name}`,
      //   handler: () => {
      //     this.occasion = `${this.occasions[8].name}`;
      //     this.titleService.finalData['occasion'] = this.occasion;
      //     this.storage.set('finalData', JSON.stringify(this.titleService.finalData));
      //     this.page = 1;
      //     this.getInitialContent();
      //   }
      // }
    ]
    });
    await actionSheet.present();
  }

  async fashionModal(id: any) {
    this.hintService.id = id;
    const modal = await this.modalCtrl.create({
      component: FashionModalPage,
      componentProps: {idValue: id}
    });
    return await modal.present();
  }

  //alert
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Hints error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  logScrolling(event){
    if (event.detail.scrollTop < -110) {
      this.loading = true;
      setTimeout(() => {
        this.page = 1;
        this.getInitialContent();
        this.loading= false;
      }, 2000);
    }
  }

  ngOnInit() {
    //hide backward button if on first page
    if (this.page = 1) {
      this.movedForward = false;
    }

    //hide forward button if on last page
    if (this.totalPages = this.page) {
      this.hideForward = false;
    }
  }

}
