import { HintsService } from './../_services/hints.service';
import { ClosetService } from './../_services/closet.service';
import { AlertController, NavController, ActionSheetController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-closet',
  templateUrl: './closet.page.html',
  styleUrls: ['./closet.page.scss'],
})
export class ClosetPage implements OnInit {
  collections: any = {
    collections: []
  };
  collectionInfo: any[]
  closetInfo: boolean = false;
  editCollection: any = {
    newName: '',
    collectionName: 'new'
  }
  editInfo: boolean = false;
  newInfo: boolean = false;
  hideToolbar: boolean = false;
  constructor(private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private actionCtrl: ActionSheetController,
    private closetService: ClosetService,
    private hintService: HintsService,
    private navCtrl: NavController) {
    this.myCloset();
  }

  async myCloset() {
    try {
      const myInfo = await this.closetService.myCloset();
      if (myInfo['success']) {
        if (myInfo['closet']) {
          this.collections = myInfo['closet'];
        }
      } else {
        this.presentAlert('Sorry, an error occured while getting your closet');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting your closet');
    }
  }

  navigateBack() {
    this.navCtrl.navigateBack('home');
  }

  cancel() {
    this.closetInfo = !this.closetInfo;
    this.hideToolbar = !this.hideToolbar
  }

  callEdit() {
    this.editInfo = !this.editInfo;
  }

  callNew() {
    this.newInfo = !this.newInfo;
    this.hideToolbar = !this.hideToolbar
  }

  //for new collection
  async createCollection() {
    try {
      const newInfo = await this.closetService.newCollection(this.editCollection);
      if (newInfo['success']) {
        this.collections.collections.push({ name: this.editCollection.collectionName, hints: [] })
        this.callNew();
        this.presentToast('New collection created');
      } else {
        this.presentAlert('Sorry, an error occured while trying to add a hint to closet.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to add a hint to closet.')
    }
  }

  //edit collection name
  async editName() {
    try {
      const nameInfo = await this.closetService.editCollection(this.editCollection);
      if (nameInfo['success']) {
        this.presentToast(nameInfo['message']);
        this.collectionInfo['name'] = this.editCollection.newName;
        this.editCollection.collectionName = this.editCollection.newName;
      } else {
        this.presentAlert('Sorry, an error occured while trying to change collection name.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to change collection name.')
    }
  }

  getCollectionInfo(collectionId: any) {
    this.collectionInfo = this.collections.collections.find(collection => collection._id == collectionId);
    this.editCollection.collectionName = this.collectionInfo['name'];
    this.editCollection.newName = this.collectionInfo['name'];

  }

  //delete collection
  async removeCollection() {
    try {
      const removeInfo = await this.closetService.removeCollection(this.editCollection);
      if (removeInfo['success']) {
        this.presentToast(removeInfo['message']);
        this.collections.collections.splice(this.collections.collections.findIndex(collect => collect.name == this.editCollection.collectionName));
        this.myCloset();
        this.editInfo = !this.editInfo;
        this.closetInfo = !this.closetInfo;
        this.hideToolbar = !this.hideToolbar;
      } else {
        this.presentAlert('Sorry, an error occured while trying to delete collection.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to delete collection.')
    }
  }

  viewHint(id: any) {
    this.hintService.id = id;
    this.hintService.backRoute = 'closet'
    this.navCtrl.navigateRoot('reference', { animationDirection: 'forward' });
  }

  //remove hint from collection
  async removeCloset(hintId: any, name: any) {
    try {
      const removeInfo = await this.closetService.removeCloset({ collectionName: name, hintId: hintId });
      if (removeInfo['success']) {
        this.presentToast(removeInfo['message']);
        this.navCtrl.navigateBack('closet');
        this.collectionInfo['hints'].splice(this.collectionInfo['hints'].findIndex(hint => hint._id == hintId), 1)

      } else {
        this.presentAlert('Sorry, an error occured while trying to remove a hint from your collection.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to remove a hint from your collection.')
    }
  }



  ngOnInit() {
  }

  //navigations
  toTips() {
    this.navCtrl.navigateForward('tips');
  }

  toFriends() {
    this.navCtrl.navigateForward('friends');
  }

  toCloset() {
    this.navCtrl.navigateForward('closet');
  }

  //alertCtrl
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Closet Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  //action sheet for edit collection
  async presentEdit() {
    const actionSheet = await this.actionCtrl.create({
      buttons: [{
        text: 'Edit collection',
        handler: () => {
          this.callEdit();
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm collection delete',
      message: 'Are you sure you want to delete this collection? All the hints in this collection will be deleted as well.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Delete',
          cssClass: 'delete',
          handler: () => {
            this.removeCollection();
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteHintAlert(hintId: any, name: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm hint delete',
      message: 'Are you sure you want to remove this hint from your collection?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Delete',
          cssClass: 'delete',
          handler: () => {
            this.removeCloset(hintId, name);
          }
        }
      ]
    });

    await alert.present();
  }

  //toast ctrl
  async presentToast(message: any) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: 'dark',
      duration: 2000
    });
    toast.present();
  }

  //refresh closet
  doRefresh(event) {
    setTimeout(() => {
      this.myCloset();
      event.target.complete();
    }, 1000);
  }
}