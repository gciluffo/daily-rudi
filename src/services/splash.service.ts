import { Injectable, EventEmitter } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';

@Injectable()
export class SplashService {

    constructor(public splashScreen: SplashScreen) {
    }

    show() {
        this.splashScreen.show();
    }

    hide() {
        this.splashScreen.hide();
    }
}