export const RUDIMENTS: any[] = [
    {
        name: "Paraddidle(R)",
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
        name: "Paradiddle(L)",
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
        name: "Double Paradiddle(R)",
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
        name: "Double Paraddidle(L)",
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
        name: "Paradiddle-Diddle(R)",
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
        name: "Paradiddle-Diddle(L)",
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
        name: "Single Dragadiddle(R)",
        interval: 4,
        beats: 2,
        startingHand: 'R',
        lastHand: 'R',
        isTriplet: false,
        tiedNotes: null,
        voicing: [
            { sticking: 'R', note: '8d', value: .5, flam: false, double: true, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
        ]
    },
    {
        name: "Single Dragadiddle(L)",
        interval: 4,
        beats: 2,
        startingHand: 'L',
        lastHand: 'L',
        isTriplet: false,
        tiedNotes: null,
        voicing: [
            { sticking: 'L', note: '8d', value: .5, flam: false, double: true, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
        ]
    },
    {
        name: "Drag Paradiddle #1(R)",
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
        name: "Drag Paradiddle #1(L)",
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
        name: "Flam Paradiddle (R)",
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
        name: "Flam Paradiddle (L)",
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
        name: "Flamacue (R)",
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
        name: "Flamacue (L)",
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
        name: "Single Stroke Roll(R)",
        interval: 4,
        beats: 2,
        startingHand: 'R',
        lastHand: 'L',
        isTriplet: false,
        tiedNotes: null,
        voicing: [
            { sticking: 'R', note: '8d', value: .5, flam: false, double: true, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: true, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false }
        ]
    },
    {
        name: "Single Stroke Roll(L)",
        interval: 4,
        beats: 2,
        startingHand: 'L',
        lastHand: 'R',
        isTriplet: false,
        tiedNotes: null,
        voicing: [
            { sticking: 'L', note: '8d', value: .5, flam: false, double: true, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: true, accent: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false }
        ]
    }
    // {
    //     name: "Flam Accent (R)",
    //     interval: 4,
    //     beats: 2,
    //     startingHand: 'R',
    //     lastHand: 'L',
    //     isTriplet: true,
    //     tiedNotes: null,
    //     beamPositions: [[0, 3], [3, 6]],
    //     voicing: [
    //         { sticking: 'R', note: '8d', value: .5, flam: true, double: false, accent: true },
    //         { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
    //         { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
    //         { sticking: 'L', note: '8d', value: .5, flam: true, double: false, accent: true },
    //         { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
    //         { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false }
    //     ]
    // },
    // {
    //     name: "Flam Accent (L)",
    //     interval: 4,
    //     beats: 2,
    //     startingHand: 'L',
    //     lastHand: 'R',
    //     isTriplet: true,
    //     tiedNotes: null,
    //     beamPositions: [[0, 3], [3, 6]],
    //     voicing: [
    //         { sticking: 'R', note: '8d', value: .5, flam: true, double: false, accent: true },
    //         { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false },
    //         { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
    //         { sticking: 'L', note: '8d', value: .5, flam: true, double: false, accent: true },
    //         { sticking: 'R', note: '8d', value: .5, flam: false, double: false, accent: false },
    //         { sticking: 'L', note: '8d', value: .5, flam: false, double: false, accent: false }
    //     ]
    // }
];