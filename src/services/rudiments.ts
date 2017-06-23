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
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: true },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false }
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
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: true },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false }
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
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: true },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false }
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
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: true },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false }
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
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: true },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false }
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
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: true },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false }
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
            { sticking: 'R', note: '8d', value: .5, flam: false, double: true, accent: true },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
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
            { sticking: 'L', note: '8d', value: .5, flam: false, double: true, accent: true },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
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
            { sticking: 'R', note: '16d', value: .25, flam: false, double: false, accent: true },
            { sticking: '', note: '16r', value: .25, flam: false, double: false, accent: false },
            { sticking: 'L', note: '16d', value: .25, flam: false, double: false, accent: false },
            { sticking: 'L', note: '16d', value: .25, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
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
            { sticking: 'L', note: '16d', value: .25, flam: false, double: false, accent: true },
            { sticking: '', note: '16r', value: .25, flam: false, double: false, accent: false },
            { sticking: 'R', note: '16d', value: .25, flam: false, double: false, accent: false },
            { sticking: 'R', note: '16d', value: .25, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
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
            { sticking: 'R', note: '8d', value: .5, flam: true, double: false, accent: true },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false }
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
            { sticking: 'L', note: '8d', value: .5, flam: true, double: false, accent: true },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false }
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
            { sticking: 'R', note: '8d', value: .5, flam: true, double: false, accent: true },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: 'q', value: 1, flam: true, double: false, accent: true },
            { sticking: '', note: 'qr', value: 1, flam: false, double: false, accent: false }
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
            { sticking: 'L', note: '8d', value: .5, flam: true, double: false, accent: true },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: 'q', value: 1, flam: true, double: false, accent: true },
            { sticking: '', note: 'qr', value: 1, flam: false, double: false, accent: false }
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
            { sticking: 'R', note: '8d', value: .5, flam: true, double: false, accent: true },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: true, double: false, accent: true },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false }
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
            { sticking: 'R', note: '8d', value: .5, flam: true, double: false, accent: true },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: true, double: false, accent: true },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false }
        ]
    }
];