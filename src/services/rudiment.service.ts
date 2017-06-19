import { Injectable } from '@angular/core';


@Injectable()
export class RudimentService {

    private rudiments: any[] = [
        {
            id: 1,
            name: "diddle-right",
            imgSrc: "assets/images/diddle-right.png",
            interval: 4,
            notes: 4,
            startingHand: 'R',
            lastHand: 'R'
        },
        {
            id: 2,
            name: "diddle-left",
            imgSrc: "assets/images/diddle-left.png",
            interval: 4,
            notes: 4,
            startingHand: 'L',
            lastHand: 'L'
        },
        {
            id: 3,
            name: "diddle-double-right",
            imgSrc: "assets/images/diddle-double-right.png",
            interval: 4,
            notes: 6,
            startingHand: 'R',
            lastHand: 'R'
        },
        {
            id: 4,
            name: "diddle-double-left",
            imgSrc: "assets/images/diddle-double-right.png",
            interval: 4,
            notes: 6,
            startingHand: 'L',
            lastHand: 'L'
        },
        {
            id: 5,
            name: "diddle-diddle-right",
            imgSrc: "assets/images/diddle-diddle-right.png",
            interval: 4,
            notes: 6,
            startingHand: 'R',
            lastHand: 'L'
        },
        {
            id: 6,
            name: "diddle-diddle-left",
            imgSrc: "assets/images/diddle-diddle-left.png",
            interval: 4,
            notes: 6,
            startingHand: 'L',
            lastHand: 'R'
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
            if (pattern) {
                for (let i = 0; i < pattern.length; i++) {
                    if (i === pattern.length - 1) {
                        return pattern;
                    } else if (i + 1 <= pattern.length && pattern[i].lastHand === pattern[i + 1].startingHand) {
                        break;
                    }
                }
            }
        }
    }

    get16NotePattern() {
        while (true) {
            let totalNotes = 0;
            let shuffledArray = this.shuffleArray(this.rudiments);

            for (let i = 0; i < shuffledArray.length; i++) {
                totalNotes += shuffledArray[i].notes;

                if (totalNotes === 16) {
                    return shuffledArray.splice(0, i + 1);
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