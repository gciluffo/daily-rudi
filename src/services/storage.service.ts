import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class StorageService {

    public settings: any;

    constructor(private nativeStorage: NativeStorage) {
    }

    updateSettings(settings: any) {
        this.settings = settings;
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
                    this.settings = data;
                    resolve(data);
                },
                error => {
                    // If no settings, first time opening app
                    console.log('No settings, first time logging in');
                    let dumbData = {
                        useMetronomeSlider: true,
                        useRandomAccents: false,
                        clickSound: 'assets/sounds/pink.wav'
                    };
                    this.initializePatternNames();
                    this.updateSettings(dumbData);
                    resolve(dumbData);
                });
        });
    }

    savePattern(pattern: any[], name) {
        this.nativeStorage.setItem(name, JSON.stringify(pattern))
            .then(() => {
                console.log('Stored pattern with name: ', name);
            },
            error => console.error('Error storing item', error)
            );
    }

    savePatternName(name) {
        this.loadPatternNames()
            .then((names: any) => {
                // if name we are saving isnt already in storage
                if (names.indexOf(name) === -1) {
                    names.push(name);
                    this.nativeStorage.setItem('patternNames', JSON.stringify(names))
                        .then(() => {
                            console.log('Stored names!', names);
                        },
                        error => console.error('Error storing item', error)
                        );
                }
            })
    }

    loadPatternByName(name) {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem(name)
                .then((data) => {
                    console.log('Got pattern!', data);
                    resolve(JSON.parse(data));
                },
                error => {
                    // If no settings, first time opening app
                    console.log('No pattern with given name exists');
                });
        });
    }

    loadPatternNames() {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem('patternNames')
                .then((data) => {
                    console.log('Got pattern names!', data);
                    resolve(JSON.parse(data));
                },
                error => {
                    // If no settings, first time opening app
                    console.log('No pattern names');
                });
        });
    }

    initializePatternNames() {
        this.nativeStorage.setItem('patternNames', JSON.stringify([]))
            .then(() => { }, error => console.error('Error storing item', error));
    }

}