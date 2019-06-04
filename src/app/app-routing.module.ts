import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'fashion',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule'
  },
  { path: 'slides', loadChildren: './slides/slides.module#SlidesPageModule' },
  { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
  { path: 'customize', loadChildren: './customize/customize.module#CustomizePageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'password', loadChildren: './password/password.module#PasswordPageModule' },
  { path: 'email', loadChildren: './email/email.module#EmailPageModule' },
  { path: 'username', loadChildren: './username/username.module#UsernamePageModule' },
  { path: 'interest', loadChildren: './interest/interest.module#InterestPageModule' },
  { path: 'size', loadChildren: './size/size.module#SizePageModule' },
  { path: 'gender', loadChildren: './gender/gender.module#GenderPageModule' },
  { path: 'elsewhere', loadChildren: './elsewhere/elsewhere.module#ElsewherePageModule' },
  { path: 'fashion', loadChildren: './fashion/fashion.module#FashionPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
