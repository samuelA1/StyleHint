import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MySingleOrderPage } from './my-single-order.page';

const routes: Routes = [
  {
    path: '',
    component: MySingleOrderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MySingleOrderPage]
})
export class MySingleOrderPageModule {}
