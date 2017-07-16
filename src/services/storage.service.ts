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
            },
            error => console.error('Error storing item', error)
            );
    }

    loadSettings() {
        return new Promise((resolve, reject) => {
            this.nativeStorage.getItem('settings')
                .then((data) => {
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

    deletePatternByName(name) {
        this.nativeStorage.remove(name);
        this.loadPatternNames()
            .then((names: any[]) => {
                let index = names.findIndex((o) => {
                    return name === name;
                });
                names.splice(index, 1);
                this.nativeStorage.setItem('patternNames', JSON.stringify(names));
            });
    }

}