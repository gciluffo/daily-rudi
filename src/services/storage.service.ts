import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class StorageService {

    public settings: any;

    constructor(private nativeStorage: NativeStorage) {
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
                    // If no settings
                    console.log('No settings');
                    let dumbData = {
                        useMetronomeSlider: true,
                        useRandomAccents: false,
                        useRudimentNames: true,
                        useNotifications: false
                    };
                    this.updateSettings(dumbData);
                    resolve(dumbData);
                });
        });
    }

}