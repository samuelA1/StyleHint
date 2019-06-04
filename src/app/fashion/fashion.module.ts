import { FashionModalPage } from './../fashion-modal/fashion-modal.page';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FashionPage } from './fashion.page';

const routes: Routes = [
  {
    path: '',
    component: FashionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
  ],
  entryComponents: [FashionModalPage],
  declarations: [FashionPage, FashionModalPage]
})
export class FashionPageModule {}
