import { Injectable, OnInit } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';

@Injectable()
export class PlatformService {

    constructor(public splashScreen: SplashScreen,
        private keyboard: Keyboard,
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