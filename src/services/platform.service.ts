import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Insomnia } from '@ionic-native/insomnia';


@Injectable()
export class PlatformService {

    constructor(public splashScreen: SplashScreen,
        private insomnia: Insomnia,
        public platform: Platform) {
    }

    makeZombie() {
        this.insomnia.keepAwake()
            .then(
            () => console.log('success'),
            () => console.log('error')
            );
    }

    removeZombie() {
        this.insomnia.allowSleepAgain()
            .then(
            () => console.log('success'),
            () => console.log('error')
            );
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