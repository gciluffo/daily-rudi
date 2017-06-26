import { Injectable } from '@angular/core';
import { Rudiment } from '../models/rudiment';
import { RUDIMENTS } from './rudiments'

const NUM_REFRESHES = 5;

@Injectable()
export class RudimentService {

    constructor() {
    }

    getRudimentPattern(): Rudiment[] {
        while (true) {
            let pattern = this.get16NotePattern();

            // check for valid sticking patterns
            // Last hand of measure cannot equal first hand of next measure
            for (let i = 0; i < pattern.length; i++) {
                if (pattern[pattern.length - 1].lastHand === pattern[0].startingHand) {
                    break;
                }

                if (i === pattern.length - 1) {
                    return pattern;
                } else if (pattern[i].lastHand === pattern[i + 1].startingHand) {
                    break;
                }
            }
        }
    }

    /**
     * Create array of rudiments that equals 16 eight notes or 4 measures of 4/4
     */
    get16NotePattern() {
        while (true) {
            let totalbeats = 0;
            let shuffledArray = this.shuffleArray(RUDIMENTS.slice(0));

            for (let i = 0; i < shuffledArray.length; i++) {
                totalbeats += shuffledArray[i].beats;

                if (totalbeats === 8) {
                    return shuffledArray.splice(0, i + 1);
                } else if (totalbeats > 8) {
                    break;
                }
            }
        }
    }

    shuffleArray(a: any[]) {
        let j, x, i;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }

        return a;
    }

    getNumberOfRefreshes() {
        return NUM_REFRESHES;
    }
}