import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FashionModalPage } from './fashion-modal.page';

const routes: Routes = [
  {
    path: '',
    component: FashionModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    FashionModalPage
  ],
  declarations: [FashionModalPage],
  entryComponents: [FashionModalPage]
})
export class FashionModalPageModule {}
