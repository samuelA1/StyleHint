import { AuthService } from './../_services/auth.service';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { TipService } from './../_services/tip.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as io from 'socket.io-client';
import * as _ from 'lodash';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  comments: any[];
  comment: any = '';
  tip:any;
  socket: any;

  constructor(private tipService: TipService,
    public authService: AuthService,
    private alertCtrl: AlertController,
    private storage: Storage,
    private navCtrl: NavController,
    private toastCtrl: ToastController) { 
      if (this.tipService.tipToView !== '') {
        this.getComments();
      }
      this.socket = io('http://www.thestylehint.com');
    }

    async getComments() {
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

    async addComment() {
      try {
        const commentInfo = await this.tipService.addComment(this.tipService.tipToView, {comment: this.comment});
        if (commentInfo['success']) {
          if (this.tip.owner == this.authService.userId) {
            this.comment = '';
            this.socket.emit('comment', 'owner');
          }else {
            this.socket.emit('comment', this.tip.owner);
            this.comment = '';
          }
        } else {
          this.presentAlert('Sorry, an error occured while trying to comment on a tip.');
        }
      } catch (error) {
        this.presentAlert('Sorry, an error occured while trying to comment on a tip.');
      }
    }

    async deleteComment(commentId: any) {
      try {
        const deleteInfo = await this.tipService.deleteComment(this.tipService.tipToView, commentId);
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

    GetPostTime(time) {
      return moment(time).fromNow();
    }

    navigateBack() {
      this.navCtrl.pop();
    }

  ngOnInit() {
    this.socket.on('commentDeleted', ownerId => {
      this.storage.get('tipId').then((tipId) => {
        this.tipService.tipToView = tipId;
        this.getComments();
      })
    });

    this.socket.on('commented', ownerId => {
      this.storage.get('tipId').then((tipId) => {
        this.tipService.tipToView = tipId;
        this.getComments();
      })
    });
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

  doRefresh(event){
    setTimeout(() => {
      this.getComments();
      event.target.complete();
    }, 1000);
  }

}
