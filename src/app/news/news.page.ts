import { AuthService } from './../_services/auth.service';
import { FriendService } from './../_services/friend.service';
import { NewsService } from 'src/app/_services/news.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import * as io from 'socket.io-client';
import * as _ from 'lodash';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  news: any = {};
  modal: any = false;
  comment: any = '';
  comments: any[];
  toComment: any = false;
  socket: any;
  freezePane: any = false;
  liked: boolean = false; //toggle if you like a comment

  scrollOnModal: any = true
  searched:boolean = false;
  search: any = '';
  friends: any[];
  unFilteredFriends: any[];
  friendSelected: boolean = false;

  constructor(private newsService: NewsService,
    private friendsService: FriendService,
    public authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private navCtrl: NavController) { 
      if (this.newsService.id !== '') {
        this.getNews().then(() => {
          this.getLikes();
        });
      }
      this.socket = io('http://www.thestylehint.com');
    }

  ngOnInit() {
    this.socket.on('newsCommented', comment => {
      this.newsService.id = comment.newsId;
      // this.getNews();
      this.freezePane = false;
      this.comments.unshift({commentId: comment.commentId, comment: comment.comment, commenterId: comment.commenterId, commenter: comment.commenter});
    });
    this.socket.on('newsCommentDeleted', comment => {
      this.newsService.id = comment.newsId;
        // this.getNews();
        this.freezePane = false;
        this.comments.splice(this.comments.findIndex(c => c._id == comment.commentId), 1)
    });
    this.socket.on('toggleLiked', async news => {
      const newsInfo = await this.newsService.getSingleNews();
      this.news['likedBy'] = newsInfo['news']['likedBy']
      this.getLikes();
    });
  }

  navigateBack() {
    this.navCtrl.navigateBack('home');
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
  cancelComment() {
    this.toComment = false;
    this.freezePane = !this.freezePane;
  }

  //activates send button on friend selected
  selectFriend() {
    this.friendSelected = this.friends.some(friend => friend['selected'] == true);
  }

  cancel() {
    this.modal = !this.modal;
    this.freezePane = !this.freezePane;
  }

  async toggleLike() {
    try {
      const likeInfo = await this.newsService.toggleLikes();
      if (likeInfo['success']) {
        this.socket.emit('toggleLike', {});
      } else {
        this.presentAlert('Sorry, an error occured while trying to like a news');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to like a news');
    }
  }

  async share() {
    this.modal = !this.modal;
    this.freezePane = !this.freezePane;
    
    try {
      const friendsInfo = await this.friendsService.getFriends();
      if (friendsInfo['success']) {
        this.friends = friendsInfo['friends'];
        this.unFilteredFriends = friendsInfo['friends'];
      } else {
        this.presentAlert('Sorry, an error occured while trying to get your friends.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to get your friends.')
    }
  }

  //share news
  async shareNews() {
    try {
      const selectedFriends = [];
      this.friends.forEach(async (friend) => {
        if (friend['selected']) {
          selectedFriends.push(friend['_id']);
        }
      });
      const newsInfo = await this.newsService.shareNews({friends: selectedFriends});
      if (newsInfo['success']) {
        this.friendSelected = !this.friendSelected
        this.modal = !this.modal;
        this.freezePane = !this.freezePane;
        this.presentToast(newsInfo['message']);
        this.socket.emit('inform', {friends: selectedFriends})
      } else {
        this.presentAlert('Sorry, an error occured while trying to share some news. Please try choosing a friend before sharing some news.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to share some news. Please try choosing a friend before sharing some news.')
    }
  }

  //search friends
  searchFriends() {
    this.searched = true;
    this.friends = (this.search) ?  this.friends.filter(u => u.username.toLowerCase()
    .includes(this.search.toLowerCase()) ) : this.unFilteredFriends;
  }

  async getNews() {
    try {
      const newsInfo = await this.newsService.getSingleNews();
      if (newsInfo['success']) {
        this.news = newsInfo['news'];
        this.comments = _.orderBy(newsInfo['news'].comments, ['commentedAt'],['desc']);
        // this.liked = newsInfo['news']['likedBy'].some(n => n === this.authService.userId);
      } else {
        this.presentAlert('Sorry, an error occured while getting a news');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while getting a news');
    }
  }

  getLikes () {
    console.log(this.news);
    this.liked = this.news.likedBy.some(n => n === this.authService.userId);
  }

  async addComment(newsId: any) {
    this.newsService.id = newsId;
    try {
      const commentInfo = await this.newsService.addComment({comment: this.comment});
      if (commentInfo['success']) {
        this.socket.emit('newsComment', {commentId: commentInfo['commentId'],  comment: this.comment, newsId: newsId, commenterId: this.authService.userId, commenter: this.authService.userName});
        this.comment = '';
        this.toComment = false;
      } else {
        this.presentAlert('Sorry, an error occured while trying to comment on a news.');
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to comment on a news.');
    }
  }

  async deleteComment(newsId: any, commentId: any) {
    this.newsService.id = newsId;
    try {
      const deleteInfo = await this.newsService.deleteComment(commentId);
      if (deleteInfo['success']) {
        this.socket.emit('deletenewsComment', {newsId: newsId, commentId: commentId});
        this.presentToast(deleteInfo['message'])
      } else {
        this.presentAlert('Sorry, an error occured while trying to delete a comment.')
      }
    } catch (error) {
      this.presentAlert('Sorry, an error occured while trying to delete a comment.')
    }
  }


   //alert ctrl
   async presentAlert(message: any) {
    const alert = await this.alertCtrl.create({
      header: 'News Error',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  //toast
  async presentToast(message: any) {
    const toast = await this.toastCtrl.create({
      message: message,
      color: 'dark',
      duration: 2000
    });
    toast.present();
  }

}
