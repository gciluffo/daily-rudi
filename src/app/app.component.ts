import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import { HomePage } from '../pages/home/home';
import { StorageService, VexRendererService, SplashService } from '../services';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    private storageService: StorageService,
    private screenOrientation: ScreenOrientation,
    private vexRendererService: VexRendererService,
    public splashService: SplashService) {
    this.splashService.show();
    this.platformReady();
  }

  platformReady() {
    this.platform.ready().then(() => {
      this.vexRendererService.screenDimensions.width = this.platform.width();
      this.vexRendererService.screenDimensions.height = this.platform.height();
      console.log('dimensions', this.vexRendererService.screenDimensions);
      this.statusBar.styleDefault();
    });
  }
}
