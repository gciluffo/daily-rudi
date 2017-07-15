import { Component, ViewChild } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { Nav } from 'ionic-angular';

import { HomePage } from '../pages/home/home';
import { StorageService, VexRendererService, PlatformService } from '../services';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;

  constructor(private storageService: StorageService,
    private vexRendererService: VexRendererService,
    public platformService: PlatformService) {
    this.platformService.show();
  }
}
