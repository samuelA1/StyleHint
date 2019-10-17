import { AdminService } from 'src/app/_services/admin.service';
import { AlertController, ActionSheetController, NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DesignerService } from 'src/app/_services/designer.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.page.html',
  styleUrls: ['./all-products.page.scss'],
})
export class AllProductsPage implements OnInit {
  products: any[];
  page: number = 1;
  totalProducts: any;
  statusType: string;
    constructor(private designerService: DesignerService,
      private adminService: AdminService,
      private alertCtrl: AlertController, 
      private actionSheetCtrl: ActionSheetController,
      private navCtrl: NavController) { 
        this.getProducts('review');
      }
  
    ngOnInit() {
    }
  
    GetPostTime(time) {
      return moment(time).fromNow();
    }
  
    //nav to update
    toUpdate(productId: any) {
      this.adminService.productId = productId;
      this.designerService.productId = productId;
      this.navCtrl.navigateForward('update-product');
    }
  
     //get Products by status
     async getProducts(status: any) {
       this.statusType = status;
      try {
        const productInfo = await this.designerService.getProducts({statusType: status}, this.page);
        if (productInfo['success']) {
          this.products = productInfo['products'];
          this.totalProducts = productInfo['totalProducts']
        } else {
          this.presentAlert('Sorry, an error occured while getting all products');
        }
      } catch (error) {
        this.presentAlert('Sorry, an error occured while getting all products');
      }
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
  
    loadData(event: any) {
      this.page++
      setTimeout(() => {
        this.designerService.getProducts({statusType: this.statusType}, this.page).then((productInfo) => {
          productInfo['products'].forEach((product: any) => {
            this.products.push(product)
          });
          event.target.complete();
        });
    
        if (this.products.length == this.totalProducts) {
          event.target.disabled = true;
        }
      }, 800);
    }
  
    doRefresh(event){
      this.page = 1;
      setTimeout(() => {
       this.getProducts(this.statusType);
        event.target.complete();
      }, 1000);
    }
  
    async statusActionSheet() {
      this.page = 1;
      const actionSheet = await this.actionSheetCtrl.create({
        header: 'status',
        buttons: [
          {
          text: 'In Review',
          handler: () => {
            this.getProducts('review');
          }
        }, {
          text: 'Approved',
          handler: () => {
            this.getProducts('approved');
          }
        }, {
          text: 'Denied',
          handler: () => {
            this.getProducts('denied');
          }
        }
      ]
      });
      await actionSheet.present();
    }
  

}
