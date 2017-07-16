import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SettingsPage } from '../pages/settings/settings';
import { NewPatternPage } from '../pages/new-pattern/new-pattern';
import { LoadPatternPage } from '../pages/load-pattern/load-pattern';

import { RudimentService, VexRendererService, StorageService, PlatformService, PlayaService } from '../services';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from '@ionic-native/native-storage';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SettingsPage,
    NewPatternPage,
    LoadPatternPage
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    HomePage,
    NewPatternPage,
    LoadPatternPage
  ],
  providers: [
    PlayaService,
    PlatformService,
    StorageService,
    VexRendererService,
    RudimentService,
    StatusBar,
    NativeStorage,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
