import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CookiePolicyPage } from './cookie-policy.page';

const routes: Routes = [
  {
    path: '',
    component: CookiePolicyPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CookiePolicyPage]
})
export class CookiePolicyPageModule {}
