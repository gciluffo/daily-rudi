import { Injectable } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Injectable()
export class NotificationService {

    constructor(private localNotifications: LocalNotifications) {
    }

    scheduleNotificationAtTime(moment: any) {
        // Schedule delayed notification
        this.localNotifications.schedule({
            title: 'Daily Rude',
            text: 'New Rudiments to Practice!',
            at: moment.toDate(),
            led: 'FF0000',
            icon: 'assets/images/icon.png',
            sound: null
        });
    }

    cancelAllNotifications() {
        this.localNotifications.cancelAll();
    }
}