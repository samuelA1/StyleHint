import { BusinessService } from './_services/business.service';
import { NewsService } from './_services/news.service';
import { ClosetService } from './_services/closet.service';
import { FriendService } from './_services/friend.service';
import { HintsService } from './_services/hints.service';
import { AuthService } from './_services/auth.service';
import { CustomizeService } from './_services/customize.service';
import { AdminService } from './_services/admin.service';
import { DesignerService } from './_services/designer.service';
import { TitleService } from './_services/title.service';
import { WeatherService } from './_services/weather.service';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';





import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TipService } from './_services/tip.service';
import { NotificationService } from './_services/notification.service';
import { Crop } from '@ionic-native/crop/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    ScreenOrientation,
    SocialSharing,
    Stripe,
    Camera,
    Crop,
    OneSignal,
    WeatherService,
    TitleService,
    AdminService,
    DesignerService,
    BusinessService,
    ClosetService,
    CustomizeService,
    AuthService,
    HintsService,
    FriendService,
    TipService,
    NotificationService,
    NewsService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
