export const RUDIMENTS: any[] = [
    {
        id: 1,
        name: "Paraddidle(right)",
        imgSrc: "assets/images/diddle-right.png",
        interval: 4,
        beats: 2,
        startingHand: 'R',
        lastHand: 'R',
        tremoloNotes: null,
        tiedNotes: null,
        voicing: [
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false }
        ] // beats = 2
    },
    {
        id: 2,
        name: "Paradiddle(left)",
        imgSrc: "assets/images/diddle-left.png",
        interval: 4,
        beats: 2,
        startingHand: 'L',
        lastHand: 'L',
        tremoloNotes: null,
        tiedNotes: null,
        voicing: [
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false }
        ] // beats = 2
    },
    {
        id: 3,
        name: "Double Paradiddle(right)",
        imgSrc: "assets/images/diddle-double-right.png",
        interval: 4,
        beats: 3,
        startingHand: 'R',
        tremoloNotes: null,
        tiedNotes: null,
        voicing: [
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false }
        ] // beats = 3
    },
    {
        id: 4,
        name: "Double Paraddidle(left)",
        imgSrc: "assets/images/diddle-double-left.png",
        interval: 4,
        beats: 3,
        startingHand: 'L',
        lastHand: 'L',
        tremoloNotes: null,
        tiedNotes: null,
        voicing: [
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false }
        ] // beats = 3
    },
    {
        id: 5,
        name: "Paradiddle-Diddle(right)",
        imgSrc: "assets/images/diddle-diddle-right.png",
        interval: 4,
        beats: 3,
        startingHand: 'R',
        lastHand: 'L',
        tremoloNotes: null,
        tiedNotes: null,
        voicing: [
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false }
        ] // beats = 3
    },
    {
        id: 6,
        name: "Paradiddle-Diddle(left)",
        imgSrc: "assets/images/diddle-diddle-left.png",
        interval: 4,
        beats: 3,
        startingHand: 'L',
        lastHand: 'R',
        tremoloNotes: null,
        tiedNotes: null,
        voicing: [
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false }
        ] // beats = 3
    },
    {
        id: 7,
        name: "Single Dragadiddle(right)",
        imgSrc: "assets/images/diddle-single-drag-right.png",
        interval: 4,
        beats: 2,
        startingHand: 'R',
        lastHand: 'R',
        tremoloNotes: [0],
        tiedNotes: null,
        voicing: [
            { sticking: 'R', note: '8d', value: .5, flam: false, double: true },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
        ] // beats = 2
    },
    {
        id: 8,
        name: "Single Dragadiddle(left)",
        imgSrc: "assets/images/diddle-single-drag-left.png",
        interval: 4,
        beats: 2,
        startingHand: 'L',
        lastHand: 'L',
        tremoloNotes: [0],
        tiedNotes: null,
        voicing: [
            { sticking: 'L', note: '8d', value: .5, flam: false, double: true },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
        ] // beats = 2
    },
    {
        id: 9,
        name: "Drag Paradiddle #1(right)",
        imgSrc: "assets/images/diddle-drag-1-right.png",
        interval: 4,
        beats: 3,
        startingHand: 'R',
        lastHand: 'R',
        tremoloNotes: null,
        tiedNotes: [1, 2],
        voicing: [
            { sticking: 'R', note: '16d', value: .25, flam: false, double: false },
            { sticking: '', note: '16r', value: .25, flam: false, double: false },
            { sticking: 'L', note: '16d', value: .25, flam: false, double: false },
            { sticking: 'L', note: '16d', value: .25, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
        ] // beats = 3
    },
    {
        id: 10,
        name: "Drag Paradiddle #1(left)",
        imgSrc: "assets/images/diddle-drag-1-left.png",
        interval: 4,
        beats: 3,
        startingHand: 'L',
        lastHand: 'L',
        tremoloNotes: null,
        tiedNotes: [1, 2],
        voicing: [
            { sticking: 'L', note: '16d', value: .25, flam: false, double: false },
            { sticking: '', note: '16r', value: .25, flam: false, double: false },
            { sticking: 'R', note: '16d', value: .25, flam: false, double: false },
            { sticking: 'R', note: '16d', value: .25, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
            { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
        ] // beats = 3
    }
];