import { Injectable } from '@angular/core';


@Injectable()
export class RudimentService {

    private rudiments: any[] = [
        {
            id: 1,
            name: "Paraddidle(right)",
            imgSrc: "assets/images/diddle-right.png",
            interval: 4,
            beats: 4,
            startingHand: 'R',
            lastHand: 'R'
        },
        {
            id: 2,
            name: "Paradiddle(left)",
            imgSrc: "assets/images/diddle-left.png",
            interval: 4,
            beats: 4,
            startingHand: 'L',
            lastHand: 'L'
        },
        {
            id: 3,
            name: "Double Paradiddle(right)",
            imgSrc: "assets/images/diddle-double-right.png",
            interval: 4,
            beats: 6,
            startingHand: 'R',
            lastHand: 'R'
        },
        {
            id: 4,
            name: "Double Paraddidle(left)",
            imgSrc: "assets/images/diddle-double-left.png",
            interval: 4,
            beats: 6,
            startingHand: 'L',
            lastHand: 'L'
        },
        {
            id: 5,
            name: "Paradiddle-Diddle(right)",
            imgSrc: "assets/images/diddle-diddle-right.png",
            interval: 4,
            beats: 6,
            startingHand: 'R',
            lastHand: 'L'
        },
        {
            id: 6,
            name: "Paradiddle-Diddle(left)",
            imgSrc: "assets/images/diddle-diddle-left.png",
            interval: 4,
            beats: 6,
            startingHand: 'L',
            lastHand: 'R'
        },
        {
            id: 7,
            name: "Single Dragadiddle(right)",
            imgSrc: "assets/images/diddle-single-drag-right.png",
            interval: 4,
            beats: 4,
            startingHand: 'R',
            lastHand: 'R'
        },
        {
            id: 8,
            name: "Single Dragadiddle(left)",
            imgSrc: "assets/images/diddle-single-drag-left.png",
            interval: 4,
            beats: 4,
            startingHand: 'L',
            lastHand: 'L'
        },
        {
            id: 9,
            name: "Drag Paradiddle #1(right)",
            imgSrc: "assets/images/diddle-drag-1-right.png",
            interval: 4,
            beats: 6,
            startingHand: 'R',
            lastHand: 'R'
        },
        {
            id: 10,
            name: "Drag Paradiddle #1(left)",
            imgSrc: "assets/images/diddle-drag-1-left.png",
            interval: 4,
            beats: 6,
            startingHand: 'L',
            lastHand: 'L'
        }
    ];

    constructor() {
    }

    getRudiments() {
        return this.rudiments;
    }

    getRudimentPattern() {
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
            let shuffledArray = this.shuffleArray(this.rudiments.slice(0));

            for (let i = 0; i < shuffledArray.length; i++) {
                totalbeats += shuffledArray[i].beats;

                if (totalbeats === 16) {
                    return shuffledArray.splice(0, i + 1);
                } else if (totalbeats > 16) {
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
}