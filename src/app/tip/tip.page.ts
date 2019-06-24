import { Storage } from '@ionic/storage';
import { AuthService } from './../_services/auth.service';
import { HintsService } from './../_services/hints.service';
import { TipService } from './../_services/tip.service';
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, ToastController, ActionSheetController } from '@ionic/angular';
import * as moment from 'moment';
import * as io from 'socket.io-client';
import * as _ from 'lodash';

@Component({
  selector: 'app-tip',
  templateUrl: './tip.page.html',
  styleUrls: ['./tip.page.scss'],
})
export class TipPage implements OnInit {
tip: any;
modal: any = false;
comment: any = '';
comments: any[];
toComment: any = false;
socket: any;
freezePane: any = false;
  constructor(public tipService: TipService,
    private hintService: HintsService,
    public authService: AuthService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private actionCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private storage: Storage) { 
      this.getTip();
      this.socket = io('http://www.thestylehint.com');
    }

  ngOnInit() {
    this.socket.on('commented', ownerId => {
      this.storage.get('tipId').then((tipId) => {
        this.tipService.tipToView = tipId;
        this.getTip();
        this.freezePane = false;
      })
    });
    this.socket.on('commentDeleted', ownerId => {
      this.storage.get('tipId').then((tipId) => {
        this.tipService.tipToView = tipId;
        this.getTip();
        this.freezePane = false;
      })
    });
  }

  viewHint(id: any) {
    this.hintService.id = id;
    this.navCtrl.navigateForward('reference');
  }

  navigateBack() {
    this.navCtrl.navigateBack('tips');
  }

  GetPostTime(time) {
    return moment(time).fromNow();
  }

  //brings modal for commenting
  abtToComment() {
    this.toComment = !this.toComment;
    this.freezePane = !this.freezePane;
  }

  //cancel a comment
  cancel() {
    this.toComment = false;
    this.freezePane = !this.freezePane;
  }

  sharedWith () {
    this.modal = !this.modal;
    this.freezePane = !this.freezePane;
  }

  async getTip() {
    try {
      const tipInfo = await this.tipService.getTip();
      if (tipInfo['success']) {
        this.tip = tipInfo['tip'];
        this.comments = _.orderBy(tipInfo['tip'].comments, ['commentedAt'],['desc']);;
      } else {
        this.presentAlert('Sorry, an error occured while getting tip.');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting tip.');
    }
  }

  async addComment(tipId: any) {
    try {
      const commentInfo = await this.tipService.addComment(tipId, {comment: this.comment});
      if (commentInfo['success']) {
        this.socket.emit('comment', this.tip.owner);
        this.comment = '';
        this.toComment = false;
      } else {
        this.presentAlert('Sorry, an error occured while trying to comment on a tip.');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to comment on a tip.');
    }
  }

  async deleteComment(tipId: any, commentId: any) {
    try {
      const deleteInfo = await this.tipService.deleteComment(tipId, commentId);
      if (deleteInfo['success']) {
        this.socket.emit('deleteComment', {});
        this.presentToast(deleteInfo['message'])
      } else {
        this.presentAlert('Sorry, an error occured while trying to delete a comment.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to delete a comment.')
    }
  }

  async deleteTip(tipId: any, notifyId: any) {
    try {
      const deleteInfo = await this.tipService.deleteTip(tipId, notifyId);
      if (deleteInfo['success']) {
        this.presentToast(deleteInfo['message'])
      } else {
        this.presentAlert('Sorry, an error occured while trying to delete a tip.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to delete a tip.')
    }
  }

   //alertCtrl
   async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Tip Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async confirmDelete(notifyId: any) {
    const alert = await this.alertCtrl.create({
      header: 'Confirm!',
      message: 'Are you sure you want to completely remove this tip? The friends you shared this hint with will no longer be able to see this tip.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Okay',
          cssClass: 'danger',
          handler: () => {
            this.deleteTip(this.tip._id, notifyId).then(() => {
              this.navCtrl.navigateBack('tips');
            });
          }
        }
      ]
    });

    await alert.present();
  }

  //toast
  async presentToast(message) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: 'danger',
      position: 'top',
      duration: 2000
    });
    toast.present();
  }

  //action sheet
  async presentActionSheet(notifyId: any) {
    const actionSheet = await this.actionCtrl.create({
      header: 'Not interested in tip?',
      buttons: [{
        text: 'Delete tip',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.deleteTip(this.tip._id, notifyId).then(() => {
            this.navCtrl.navigateBack('tips');
          });
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

}
