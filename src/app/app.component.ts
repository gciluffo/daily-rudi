import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { HomePage } from '../pages/home/home';
import { StorageService, VexRendererService } from '../services';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storageService: StorageService,
    private screenOrientation: ScreenOrientation,
    private vexRendererService: VexRendererService) {
    this.splashScreen.show();
    this.platformReady();
  }

  platformReady() {
    this.platform.ready().then(() => {
      this.vexRendererService.screenDimensions.width = this.platform.width();
      this.vexRendererService.screenDimensions.height = this.platform.height();
      console.log('dimensions', this.vexRendererService.screenDimensions);
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
