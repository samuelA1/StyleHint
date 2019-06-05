import { Storage } from '@ionic/storage';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { TitleService } from '../_services/title.service';
import { FashionModalPage } from '../fashion-modal/fashion-modal.page';


@Component({
  selector: 'app-fashion',
  templateUrl: './fashion.page.html',
  styleUrls: ['./fashion.page.scss'],
})
export class FashionPage implements OnInit {
  movedForward: boolean = false;
  occasion: any;
  loading: boolean = false;
  stylesOne:any[] = [];
  stylesTwo:any[] = [];
  stylesThree:any[] = [];
  stylesFour:any[] = [];
  stylesFive:any[] = [];
  stylesSix:any[] = [];

  constructor(public titleService: TitleService,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private storage: Storage) { }

  getMore() {
    this.movedForward = true;
    this.stylesOne = this.stylesThree;
    this.stylesTwo = this.stylesFour;
  }

  moveBack() {
    this.stylesOne = this.stylesFive;
    this.stylesTwo = this.stylesSix;
  }

  navigateBack() {
    this.navCtrl.navigateBack('home');
  }

   //page resfresh
   doRefresh(event: any) {
     //do something
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  //occasion/event array
  occasions: any[] = [
    {name: 'School', icon: 'school', isChosen: false},
    {name: 'Sport', icon: 'american-football', isChosen: false},
    {name: 'Birthday party', icon: 'color-wand', isChosen: false},
    {name: 'Halloween', icon: 'outlet', isChosen: false},
    {name: 'Christmas', icon: 'gift', isChosen: false},
    {name: 'National day', extension: 'independence', icon: 'flag', isChosen: false},
    {name: 'Date night', icon: 'contacts', isChosen: false},
    {name: 'Job interview', icon: 'person-add', isChosen: false},
    {name: 'Church', icon: 'home', isChosen: false},
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
        }
      }, {
        text: `${this.occasions[1].name}`,
        handler: () => {
          this.occasion = `${this.occasions[1].name}`;
          this.titleService.finalData['occasion'] = this.occasion;
          this.storage.set('finalData', JSON.stringify(this.titleService.finalData));
        }
      }, {
        text: `${this.occasions[2].name}`,
        handler: () => {
          this.occasion = `${this.occasions[2].name}`;
          this.titleService.finalData['occasion'] = this.occasion;
          this.storage.set('finalData', JSON.stringify(this.titleService.finalData));
        }
      }, {
        text: `${this.occasions[3].name}`,
        handler: () => {
          this.occasion = `${this.occasions[3].name}`;
          this.titleService.finalData['occasion'] = this.occasion;
          this.storage.set('finalData', JSON.stringify(this.titleService.finalData));
        }
      }, {
        text: `${this.occasions[4].name}`,
        handler: () => {
          this.occasion = `${this.occasions[4].name}`;
          this.titleService.finalData['occasion'] = this.occasion;
          this.storage.set('finalData', JSON.stringify(this.titleService.finalData));
        }
      },
      {
        text: `${this.occasions[5].name}`,
        handler: () => {
          this.occasion = `${this.occasions[5].name}`;
          this.titleService.finalData['occasion'] = this.occasion;
          this.storage.set('finalData', JSON.stringify(this.titleService.finalData));
        }
      },
      {
        text: `${this.occasions[6].name}`,
        handler: () => {
          this.occasion = `${this.occasions[6].name}`;
          this.titleService.finalData['occasion'] = this.occasion;
          this.storage.set('finalData', JSON.stringify(this.titleService.finalData));
        }
      },
      {
        text: `${this.occasions[7].name}`,
        handler: () => {
          this.occasion = `${this.occasions[7].name}`;
          this.titleService.finalData['occasion'] = this.occasion;
          this.storage.set('finalData', JSON.stringify(this.titleService.finalData));
        }
      },
      {
        text: `${this.occasions[8].name}`,
        handler: () => {
          this.occasion = `${this.occasions[8].name}`;
          this.titleService.finalData['occasion'] = this.occasion;
          this.storage.set('finalData', JSON.stringify(this.titleService.finalData));
        }
      }
    ]
    });
    await actionSheet.present();
  }

  async fashionModal() {
    const modal = await this.modalCtrl.create({
      component: FashionModalPage
    });
    return await modal.present();
  }

  logScrolling(event){
    if (event.detail.scrollTop < -30) {
      this.loading = true;
      setTimeout(() => {
        this.loading= false;
      }, 2000);
    }
  }

  ngOnInit() {
    for (let index = 0; index < 10; index++) {
      this.stylesOne.push({img:'../../assets/examples/azamat-zhanisov-1272557-unsplash.jpg'})
      this.stylesOne.push({img:'../../assets/examples/bogdan-glisik-1165508-unsplash.jpg'})
      this.stylesFive.push({img:'../../assets/examples/azamat-zhanisov-1272557-unsplash.jpg'})
      this.stylesSix.push({img:'../../assets/examples/bogdan-glisik-1165508-unsplash.jpg'})
      this.stylesThree.push({img:'../../assets/examples/bogdan-glisik-1211054-unsplash.jpg'})
      this.stylesFour.push({img:'../../assets/examples/dmitriy-ilkevich-1169658-unsplash.jpg'})
      
      
    }
  }

}
