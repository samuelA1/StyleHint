import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { TitleService } from '../_services/title.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-fashion-modal',
  templateUrl: './fashion-modal.page.html',
  styleUrls: ['./fashion-modal.page.scss'],
})
export class FashionModalPage implements OnInit {
link: any;
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
    private socialSharing: SocialSharing,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {
      this.avgRate(3)
     }

  dismissModal() {
    this.modalCtrl.dismiss();
  }

  share() {
    this.socialSharing.share(null, null, null, 'http://www.x-services.nl').catch((err) => {
      this.presentAlert('Sorry, an error occured while trying to share some information');
    });
  }

  //rating icon functionality
  rateTo(score: number) {
    if (score) {
      var scoresToCheck = this.rating.slice(0, score);
      scoresToCheck.map(starToCheck => {
        starToCheck.isChecked = true;
      });
      var scoresToUncheck = this.rating.slice(score);
      scoresToUncheck.map(starToUncheck => {
        starToUncheck.isChecked = false;
      });
      this.presentToast();
    } else {
      this.presentAlert('Sorry, an error occured while trying to rate a look');
    }
  }

  //total average rating
  avgRate(score: number) {
    if (score) {
      var scoresToCheck = this.rated.slice(0, score);
      scoresToCheck.map(starToCheck => {
        starToCheck.isChecked = true;
      });
      var scoresToUncheck = this.rated.slice(score);
      scoresToUncheck.map(starToUncheck => {
        starToUncheck.isChecked = false;
      });
    } else {
      this.presentAlert('Sorry, an error occured while trying to rate a look');
    }
  }
  //alertCtrl
  async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  //toast for rating confirmation
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Rating submitted',
      duration: 2000
    });
    toast.present();
  }
  ngOnInit() {
  }

}
