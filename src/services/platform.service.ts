import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

@Injectable()
export class PlatformService {

    constructor(public splashScreen: SplashScreen,
        public platform: Platform) {
    }

    isAndroid() {
        return this.platform.is('android');
    }

    isTablet() {
        return this.platform.is('tablet');
    }

    isIPad() {
        return this.platform.is('ipad');
    }

    show() {
        this.splashScreen.show();
    }

    hide() {
        this.splashScreen.hide();
    }
}