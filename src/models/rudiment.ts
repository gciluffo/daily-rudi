export class Rudiment {
    name: string;
    interval: number;
    beats: number;
    startingHand: string;
    lastHand: string;
    beamPositions: any[];
    tiedNotes: string[];
    voicing: any[];
    isTriplet: boolean;
    firstNotePosition: number; // in pixels
}