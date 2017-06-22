export const RUDIMENTS: any[] = [
    {
        name: "Paraddidle(right)",
        interval: 4,
        beats: 2,
        startingHand: 'R',
        lastHand: 'R',
        isTriplet: false,
        tiedNotes: null,
        voicing: [
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false }
        ]
    },
    {
        name: "Paradiddle(left)",
        interval: 4,
        beats: 2,
        startingHand: 'L',
        lastHand: 'L',
        isTriplet: false,
        tiedNotes: null,
        voicing: [
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false }
        ]
    },
    {
        name: "Double Paradiddle(right)",
        interval: 4,
        beats: 3,
        startingHand: 'R',
        lastHand: 'R',
        isTriplet: false,
        tiedNotes: null,
        voicing: [
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false }
        ]
    },
    {
        name: "Double Paraddidle(left)",
        interval: 4,
        beats: 3,
        startingHand: 'L',
        lastHand: 'L',
        isTriplet: false,
        tiedNotes: null,
        voicing: [
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false }
        ]
    },
    {
        name: "Paradiddle-Diddle(right)",
        interval: 4,
        beats: 3,
        startingHand: 'R',
        lastHand: 'L',
        isTriplet: false,
        tiedNotes: null,
        voicing: [
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false }
        ]
    },
    {
        name: "Paradiddle-Diddle(left)",
        interval: 4,
        beats: 3,
        startingHand: 'L',
        lastHand: 'R',
        isTriplet: false,
        tiedNotes: null,
        voicing: [
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false }
        ]
    },
    {
        name: "Single Dragadiddle(right)",
        interval: 4,
        beats: 2,
        startingHand: 'R',
        lastHand: 'R',
        isTriplet: false,
        tiedNotes: null,
        voicing: [
            { sticking: 'R', note: '8d', value: .5, flam: false, double: true },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
        ]
    },
    {
        name: "Single Dragadiddle(left)",
        interval: 4,
        beats: 2,
        startingHand: 'L',
        lastHand: 'L',
        isTriplet: false,
        tiedNotes: null,
        voicing: [
            { sticking: 'L', note: '8d', value: .5, flam: false, double: true },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
        ]
    },
    {
        name: "Drag Paradiddle #1(right)",
        interval: 4,
        beats: 3,
        startingHand: 'R',
        lastHand: 'R',
        isTriplet: false,
        tiedNotes: [2, 3],
        voicing: [
            { sticking: 'R', note: '16d', value: .25, flam: false, double: false },
            { sticking: '', note: '16r', value: .25, flam: false, double: false },
            { sticking: 'L', note: '16d', value: .25, flam: false, double: false },
            { sticking: 'L', note: '16d', value: .25, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
        ]
    },
    {
        name: "Drag Paradiddle #1(left)",
        interval: 4,
        beats: 3,
        startingHand: 'L',
        lastHand: 'L',
        isTriplet: false,
        tiedNotes: [2, 3],
        voicing: [
            { sticking: 'L', note: '16d', value: .25, flam: false, double: false },
            { sticking: '', note: '16r', value: .25, flam: false, double: false },
            { sticking: 'R', note: '16d', value: .25, flam: false, double: false },
            { sticking: 'R', note: '16d', value: .25, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
        ]
    },
    {
        name: "Flam Paradiddle (right)",
        interval: 4,
        beats: 2,
        startingHand: 'R',
        lastHand: 'R',
        isTriplet: false,
        tiedNotes: null,
        voicing: [
            { sticking: 'R', note: '8d', value: .5, flam: true, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false }
        ]
    },
    {
        name: "Flam Paradiddle (left)",
        interval: 4,
        beats: 2,
        startingHand: 'L',
        lastHand: 'L',
        isTriplet: false,
        tiedNotes: null,
        voicing: [
            { sticking: 'L', note: '8d', value: .5, flam: true, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false }
        ]
    },
    {
        name: "Flamacue (right)",
        interval: 4,
        beats: 4,
        startingHand: 'R',
        lastHand: 'R',
        isTriplet: false,
        tiedNotes: null,
        voicing: [
            { sticking: 'R', note: '8d', value: .5, flam: true, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: 'q', value: 1, flam: true, double: false },
            { sticking: '', note: 'qr', value: 1, flam: false, double: false }
        ]
    },
    {
        name: "Flamacue (left)",
        interval: 4,
        beats: 4,
        startingHand: 'L',
        lastHand: 'L',
        isTriplet: false,
        tiedNotes: null,
        voicing: [
            { sticking: 'L', note: '8d', value: .5, flam: true, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: 'q', value: 1, flam: true, double: false },
            { sticking: '', note: 'qr', value: 1, flam: false, double: false }
        ]
    },
    {
        name: "Flam Accent (right)",
        interval: 4,
        beats: 2,
        startingHand: 'R',
        lastHand: 'L',
        isTriplet: true,
        tiedNotes: null,
        beamPositions: [[0, 3], [3, 6]],
        voicing: [
            { sticking: 'R', note: '8d', value: .5, flam: true, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: true, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false }
        ]
    },
    {
        name: "Flam Accent (left)",
        interval: 4,
        beats: 2,
        startingHand: 'L',
        lastHand: 'R',
        isTriplet: true,
        tiedNotes: null,
        beamPositions: [[0, 3], [3, 6]],
        voicing: [
            { sticking: 'R', note: '8d', value: .5, flam: true, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: true, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false }
        ]
    }
];