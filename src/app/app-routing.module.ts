import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
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
  { path: 'interest', loadChildren: './interest/interest.module#InterestPageModule' },
  { path: 'size', loadChildren: './size/size.module#SizePageModule' },
  { path: 'gender', loadChildren: './gender/gender.module#GenderPageModule' },
  { path: 'elsewhere', loadChildren: './elsewhere/elsewhere.module#ElsewherePageModule' },
  { path: 'fashion', loadChildren: './fashion/fashion.module#FashionPageModule' },
  { path: 'add-hint', loadChildren: './admin/add-hint/add-hint.module#AddHintPageModule' },
  { path: 'username', loadChildren: './username/username.module#UsernamePageModule' },
  { path: 'friends', loadChildren: './friends/friends.module#FriendsPageModule' },
  { path: 'notifications', loadChildren: './notifications/notifications.module#NotificationsPageModule' },
  { path: 'tip', loadChildren: './tip/tip.module#TipPageModule' },
  { path: 'tips', loadChildren: './tips/tips.module#TipsPageModule' },
  { path: 'closet', loadChildren: './closet/closet.module#ClosetPageModule' },
  { path: 'reference', loadChildren: './reference/reference.module#ReferencePageModule' },
  { path: 'comments', loadChildren: './comments/comments.module#CommentsPageModule' },
  { path: 'menu', loadChildren: './admin/menu/menu.module#MenuPageModule' },
  { path: 'all-users', loadChildren: './admin/all-users/all-users.module#AllUsersPageModule' },
  { path: 'update-user', loadChildren: './admin/update-user/update-user.module#UpdateUserPageModule' },
  { path: 'all-hints', loadChildren: './admin/all-hints/all-hints.module#AllHintsPageModule' },
  { path: 'update-hint', loadChildren: './admin/update-hint/update-hint.module#UpdateHintPageModule' },
  { path: 'legal-info', loadChildren: './legal-info/legal-info.module#LegalInfoPageModule' },
  { path: 'privacy-policy', loadChildren: './legal-info/privacy-policy/privacy-policy.module#PrivacyPolicyPageModule' },
  { path: 'terms-use', loadChildren: './legal-info/terms-use/terms-use.module#TermsUsePageModule' },
  { path: 'news', loadChildren: './news/news.module#NewsPageModule' },
  { path: 'add-news', loadChildren: './admin/add-news/add-news.module#AddNewsPageModule' },
  { path: 'all-news', loadChildren: './admin/all-news/all-news.module#AllNewsPageModule' },
  { path: 'update-news', loadChildren: './admin/update-news/update-news.module#UpdateNewsPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
