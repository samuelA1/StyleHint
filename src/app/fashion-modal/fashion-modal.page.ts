import { TipService } from './../_services/tip.service';
import { FriendService } from './../_services/friend.service';
import { HintsService } from './../_services/hints.service';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { TitleService } from '../_services/title.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-fashion-modal',
  templateUrl: './fashion-modal.page.html',
  styleUrls: ['./fashion-modal.page.scss'],
})
export class FashionModalPage implements OnInit {
  @Input() idValue: any;
  hint: any = {};
  numberOfRatings: any;
  link: any;
  modal: any = false;
  friends: any[];
  friendSelected: boolean = false;
  socket: any;
  rating: any[] = [
    {icon: 'star', score: 1, isChecked: false},
    {icon: 'star', score: 2, isChecked: false},
    {icon: 'star', score: 3, isChecked: false},
    {icon: 'star', score: 4, isChecked: false},
    {icon: 'star', score: 5, isChecked: false},
  ]
  //average rating
  rated: any[] = [
    {icon: 'star', score: 1, isChecked: false},
    {icon: 'star', score: 2, isChecked: false},
    {icon: 'star', score: 3, isChecked: false},
    {icon: 'star', score: 4, isChecked: false},
    {icon: 'star', score: 5, isChecked: false},
  ]
  constructor(private modalCtrl: ModalController,
    public titleService: TitleService,
    private hintService: HintsService,
    private friendsService: FriendService,
    private tipService: TipService,
    private socialSharing: SocialSharing,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController ) {
      this.getSingleHint();
      this.socket = io('http://www.thestylehint.com')
     }

  async getSingleHint() {
    try {
      const hintInfo = await this.hintService.getSingleHint();
      if (hintInfo['success']) {
        this.hint = hintInfo['hint'];
        this.numberOfRatings = hintInfo['numberOfRatings'];
        this.avgRate(hintInfo['averageRating']);
      } else {
        this.presentAlert('Sorry, an error occured while trying to get a hint');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to get a hint');
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  //activates send button on friend selected
  selectFriend(val) {
    this.friendSelected = val;
  }

  async share() {
    this.modal = !this.modal;
    
    try {
      const friendsInfo = await this.friendsService.getFriends();
      if (friendsInfo['success']) {
        this.friends = friendsInfo['friends']
      } else {
        this.presentAlert('Sorry, an error occured while trying to get your friends.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to get your friends.')
    }
    // this.socialSharing.share(null, null, null, 'http://www.x-services.nl').catch((err) => {
    //   this.presentAlert('Sorry, an error occured while trying to share some information');
    // });
  }

  //add tip
  async addTip() {
    try {
      let tips = {};
      const selectedFriends = [];
      this.friends.forEach(async (friend) => {
        if (friend['selected']) {
          selectedFriends.push(friend['_id']);
          tips['imageUrl'] = this.hint.url;
          tips['hintId'] = this.idValue;
          tips['friends'] = selectedFriends;
        }
      });
      const tipsInfo = await this.tipService.addTip(tips);
      if (tipsInfo['success']) {
        this.presentToast(tipsInfo['message']);
        this.socket.emit('send', {friends: selectedFriends})
      } else {
        this.presentAlert('Sorry, an error occured while trying to share a hint. Please try choosing a friend before sharing a hint.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to share a hint. Please try choosing a friend before sharing a hint.')
    }
  }

  //rating icon functionality
  async rateTo(score: number) {
    if (score) {
      try {
        const hintInfo = await this.hintService.addRating({rating: score}, this.idValue);
        if (hintInfo['success']) {
          this.presentToast('Rating submitted');
        } else {
          this.presentAlert('Sorry, an error occured while trying to rate a look');
        }
      } catch (error) {
        this.presentAlert('Sorry, an error occured while trying to rate a look');
      }
      var scoresToCheck = this.rating.slice(0, score);
      scoresToCheck.map(starToCheck => {
        starToCheck.isChecked = true;
      });
      var scoresToUncheck = this.rating.slice(score);
      scoresToUncheck.map(starToUncheck => {
        starToUncheck.isChecked = false;
      });
    } else {
      this.presentAlert('Sorry, an error occured while trying to rate a look');
    }
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
