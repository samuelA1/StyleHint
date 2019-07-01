import { AuthService } from './../_services/auth.service';
import { ClosetService } from './../_services/closet.service';
import { Component, OnInit } from '@angular/core';
import { HintsService } from '../_services/hints.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reference',
  templateUrl: './reference.page.html',
  styleUrls: ['./reference.page.scss'],
})
export class ReferencePage implements OnInit {
  hint: any = {};
  alreadyAdded: boolean = false;
  added: any[] = [];
  scrollOnModal: any = true
  disableAll: boolean = false;
  collectionSelected: boolean = false;
  showNewCollection: boolean = false;
  collections: any[] = [];
  noCollections: boolean = false;
  numberOfRatings: any;
  closetModal: any = false;
  sliderConfig = {
    slidesPerView: 1.2
  };
  collection: any = {
    collectionName: 'all',
    hintId: ''
  }
  //average rating
  rated: any[] = [
    {icon: 'star', score: 1, isChecked: false},
    {icon: 'star', score: 2, isChecked: false},
    {icon: 'star', score: 3, isChecked: false},
    {icon: 'star', score: 4, isChecked: false},
    {icon: 'star', score: 5, isChecked: false},
  ]
  constructor(
    private hintService: HintsService,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private closetService: ClosetService,
    private authService: AuthService,
    private toastCtrl: ToastController ) {
      this.getSingleHint();
     }

 
  navigateBack() {
    this.navCtrl.pop();
  }

  async getSingleHint() {
    try {
      const hintInfo = await this.hintService.getSingleHint();
      if (hintInfo['success']) {
        this.hint = hintInfo['hint'];
        if (hintInfo['hint'].likedBy.some(hintId => this.authService.userId == hintId)) {
          this.alreadyAdded = true;
        } else {
          this.alreadyAdded = false;
        }
        this.collection.hintId = hintInfo['hint']._id;
        this.numberOfRatings = hintInfo['numberOfRatings'];
        this.avgRate(hintInfo['averageRating']);
      } else {
        this.presentAlert('Sorry, an error occured while trying to get a hint');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to get a hint');
    }
  }

  //add selected collections to closet
addSelectedCollection() {
  try {
    this.collections.forEach(async (collection) => {
      if (collection['selected']) {
        this.closetService.addCloset({hintId: this.collection.hintId, collectionName: collection['name']});
      }
    });
    this.alreadyAdded = true;
    this.closetModal = !this.closetModal;
    this.scrollOnModal = !this.scrollOnModal
    this.collections = [];
    this.presentToast('Hint added to closet');
  } catch (error) {
    this.presentAlert('Sorry, an error occured while trying to add a hint to closet.')
  }
}

//for new collection
async createCollection() {
  try {
    const newInfo = await this.closetService.addCloset(this.collection);
    if (newInfo['success']) {
      this.alreadyAdded = true;
      this.closetModal = !this.closetModal;
      this.scrollOnModal = !this.scrollOnModal
      this.collections = [];
      this.presentToast('Hint added to closet');
    } else {
      this.presentAlert('Sorry, an error occured while trying to add a hint to closet.')
    }
  } catch (error) {
    this.presentAlert('Sorry, an error occured while trying to add a hint to closet.')
  }
}

//remove hint from closet
async removeCloset(name: any) {
  try {
    if (this.added.some(checked => checked == name)) {
      this.added.splice(this.added.findIndex(add => add == name), 1)
      const removeInfo = await this.closetService.removeCloset({collectionName:name, hintId: this.collection.hintId});
      if (removeInfo['success']) {
        this.presentToast(removeInfo['message'])
        if (this.added.length == 0) {
          this.alreadyAdded = false;
        }
      } else {
        this.presentAlert('Sorry, an error occured while trying to remove a hint from your closet.')
      }
    }
  } catch (error) {
    this.presentAlert('Sorry, an error occured while trying to remove a hint from your closet.')
  }
}

cancelCloset() {
  this.getCollectionsName();
  this.closetModal = !this.closetModal;
  this.scrollOnModal = !this.scrollOnModal;
  this.collections = [];
}

//get all collections for closet
async getCollectionsName() {
  try {
    const collectionInfo = await this.closetService.collectionName();
    if (collectionInfo['success']) {
      if (collectionInfo['closet'] == null) {
        this.noCollections = true
      } else {
        let found;
        let added = []
                  //get already added collections
        const collectionGot = collectionInfo['closet'].collections;
        collectionGot.forEach(collection => {
          found = collection.hints.find(hint => hint == this.collection.hintId)
          if (found == this.collection.hintId) {
            added.push(collection)
          }
        });
        collectionGot.forEach(got => {
          if (added.some(add => add.name == got.name)) {
            this.collections.push({name: got['name'], selected: true})
          } else {
            this.collections.push({name: got['name'], selected: false})
          }
        });

        this.collections.forEach(checked => {
          if (checked.selected) {
            this.added.push(checked.name)
          }
        });

      }
    } else {
      this.presentAlert('Sorry, an error occured while trying to get the collections for your closet.')
    }
    this
  } catch (error) {
    this.presentAlert('Sorry, an error occured while trying to get the collections for your closet.')
  }
}


//toggle to show new collection
newCollection() {
  this.disableAll = !this.disableAll;
  this.showNewCollection = !this.showNewCollection;
}

 //activates send button on friend selected
 selectCollection() {
  this.collectionSelected = this.collections.some(collection => collection['selected'] == true);
}


  //total average rating
  avgRate(score: number) {
    if (score || score == 0 || score == null) {
      var scoresToCheck = this.rated.slice(0, score);
      scoresToCheck.map(starToCheck => {
        starToCheck.isChecked = true;
      });
      var scoresToUncheck = this.rated.slice(score);
      scoresToUncheck.map(starToUncheck => {
        starToUncheck.isChecked = false;
      });
    } else {
      this.presentAlert('Sorry, an error occured while getting ratings for this hint');
    }
  }
  //alertCtrl
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Hint Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

    //toast for rating confirmation
    async presentToast(message: any) {
      const toast = await this.toastCtrl.create({
        message: message,
        color: 'dark',
        duration: 2000
      });
      toast.present();
    }

    ngOnInit() {
    }

}
