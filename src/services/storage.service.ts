import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { TimerService } from './timer.service';
import { NotificationService } from './notification.service';

@Injectable()
export class StorageService {

    public settings: any;

    constructor(private nativeStorage: NativeStorage,
        private timerService: TimerService,
        private notificationService: NotificationService) {
    }

    updateSettings(settings: any) {
        this.nativeStorage.setItem('settings', settings)
            .then(() => {
                console.log('Stored item!', settings);
            },
            error => console.error('Error storing item', error)
            );
    }

    loadSettings() {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem('settings')
                .then((data) => {
                    console.log('Got item!', data)
                    resolve(data);
                },
                error => {
                    // If no settings, first time opening app
                    console.log('No settings, first time logging in');
                    let dumbData = {
                        useMetronomeSlider: true,
                        useRandomAccents: false,
                        useRudimentNames: true,
                        useNotifications: true
                    };
                    this.timerService.resetTimeLeft();
                    this.timerService.startInterval();
                    this.notificationService.scheduleNotificationAtTime(this.timerService.getRestartDate());
                    this.updateSettings(dumbData);
                    resolve(dumbData);
                });
        });
    }

}