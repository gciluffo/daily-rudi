import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Rudiment } from '../models/rudiment';
import { PlayaService } from './playa.service';
import { PlatformService } from './platform.service';
import * as vexflow from 'vexflow';

const OFFSET = 15;
const STEMDIRECTION = -1
const TUPLETLOCATION = vexflow.Flow.Tuplet.LOCATION_TOP;

@Injectable()
export class VexRendererService {

    public meanDistanceNotes: number;
    public firstBeatPositions: any[] = [];
    public firstBeatWidths: any[] = [];
    public voice: any;
    public bpm: number;
    public stave: any;
    public context: any;
    public settings: any = {
        useRandomAccents: false
    };
    public screenDimensions: any = {
        width: 0,
        height: 0
    };

    constructor(private platform: Platform,
        private playaService: PlayaService,
        private platformService: PlatformService) {
    }

    getScreenDimensions() {
        return new Promise((resolve, reject) => {
            this.platform.ready().then((readySource) => {
                this.screenDimensions.width = this.platform.width();
                this.screenDimensions.height = this.platform.height();
                resolve();
            });
        });
    }

    createRenderer(domElement: any) {
        return new Promise((resolve, reject) => {
            this.getScreenDimensions().then(() => {
                let renderer = new vexflow.Flow.Renderer(domElement, vexflow.Flow.Renderer.Backends.SVG);

                renderer.resize(this.screenDimensions.width, this.screenDimensions.height);
                this.context = renderer.getContext();
                this.context.setFont("Arial", 10, 0).setBackgroundFillStyle("#eed");
                resolve(this.context);
            });
        });
    }

    renderStaff(pattern: Rudiment[]) {
        let options = {
            vertical_bar_width: 10,       // Width around vertical bar end-marker
            glyph_spacing_px: 10,
            num_lines: 5,
            fill_style: '#999999',
            left_bar: true,               // draw vertical bar on left
            right_bar: true,               // draw vertical bar on right
            spacing_between_lines_px: this.platformService.isTablet() || this.platformService.isIPad() ? 40 : 20, // in pixels
            space_above_staff_ln: 4,      // in staff lines
            space_below_staff_ln: 10,      // in staff lines
            top_text_position: 1
        };

        // Create a stave of width 400 at position 10, 40 on the canvas.
        this.stave = new vexflow.Flow.Stave(-2, 15, this.screenDimensions.width, options);
        this.stave.setContext(this.context).draw();

        this.renderPattern(pattern);
    }

    renderPattern(pattern: Rudiment[]) {
        console.log('pattern to draw', pattern);
        let allNotes = [];
        let beams = [];
        let tripletPositions = [];

        // Create an array of an array of notes
        for (let i = 0; i < pattern.length; i++) {
            allNotes.push(this.createNoteArray(pattern[i]));
        }
        // Create a beam for each array of notes
        for (let i = 0; i < allNotes.length; i++) {
            if (pattern[i].isTriplet) {
                tripletPositions.push(i);
                beams = [...beams, new vexflow.Flow.Beam(allNotes[i]).setContext(this.context)];
            } else if (allNotes[i].length !== 1) {
                beams = [...beams, new vexflow.Flow.Beam(allNotes[i]).setContext(this.context)];
            }
        }

        let mergedNotes = [].concat.apply([], allNotes);
        this.draw(mergedNotes, beams, tripletPositions, allNotes, pattern);
        this.setDistancesBetweenPatterns(pattern, mergedNotes);
        this.getOffsetOfFirstBeats(mergedNotes, pattern);
    }

    createNoteArray(rudiment: Rudiment) {
        let notes: any = [];

        for (let i = 0; i < rudiment.voicing.length; i++) {
            let note = new vexflow.Flow.StaveNote({ keys: ["d/5"], duration: rudiment.voicing[i].note, stem_direction: STEMDIRECTION });

            this.addSticking(note, rudiment.voicing[i].sticking);

            if (rudiment.voicing[i].double) {
                this.addTremoloToNote(note);
            }

            if (rudiment.voicing[i].flam) {
                this.addFlam(note, rudiment.voicing[i]);
            }

            if (rudiment.voicing[i].accent && !this.settings.useRandomAccents) {
                this.addAccentToNote(note);
            }

            if (rudiment.voicing[i].doubleGrace) {
                this.addDoubleGraceNote(note, rudiment.voicing[i]);
            }
            notes.push(note);
        }

        if (this.settings.useRandomAccents) { this.addRandomAccentToRudiment(notes, rudiment.voicing) }
        return notes;
    }

    renderTripletRudiment(rudiment: Rudiment, notes: any[]) {
        let triplets = [];
        // Setup the beams: we do this before defining tuplets so that default bracketing will work.
        let beams = rudiment.beamPositions.map(i => {
            return new vexflow.Flow.Beam(notes.slice(i[0], i[1]));
        });

        for (let beams of rudiment.beamPositions) {
            let tuplet = new vexflow.Flow.Tuplet(notes.slice(beams[0], beams[1]));
            tuplet.setTupletLocation(TUPLETLOCATION);
            tuplet.setBracketed(true);
            triplets.push(tuplet);
        }

        beams.forEach(beam => {
            beam.setContext(this.context).draw();
        });

        triplets.forEach(triplet => {
            triplet.setContext(this.context).draw();
        });
    }

    addSticking(staveNote: any, annotation: string) {
        staveNote
            .addModifier(0, new vexflow.Flow.Annotation(annotation)
                .setFont("Arial", 16, 'italic')
                .setVerticalJustification(vexflow.Flow.Annotation.VerticalJustify.BOTTOM));
    }

    addAccentToNote(staveNote: any) {
        staveNote.addArticulation(0, new vexflow.Flow.Articulation("a>")
            .setPosition(vexflow.Flow.Modifier.Position.ABOVE));
    }

    addRandomAccentToRudiment(notes: any[], voicing: any[]) {
        while (true) {
            let indexRandom = Math.floor(Math.random() * notes.length)

            if (!voicing[indexRandom].double) {
                this.addAccentToNote(notes[indexRandom]);
                break;
            }
        }
    }

    addTremoloToNote(staveNote: any) {
        let tremolo = new vexflow.Flow.Tremolo(1);

        staveNote.addArticulation(0, tremolo);
    }

    addGraceNoteSticking(gracenote: any, voice) {
        let annotation = new vexflow.Flow.Annotation(voice.sticking === 'R' ? 'L' : 'R')
            .setFont("Arial", 8, 'italic')
            .setVerticalJustification(vexflow.Flow.Annotation.VerticalJustify.BOTTOM)
            .setPosition(vexflow.Flow.Modifier.Position.RIGHT);

        gracenote.addModifier(0, annotation);
    }

    addFlam(staveNote: any, voice: any) {
        let gracenote = new vexflow.Flow.GraceNote({ keys: ["d/5"], duration: '8d', stem_direction: STEMDIRECTION });

        this.addGraceNoteSticking(gracenote, voice);
        let gracenotegroup = new vexflow.Flow.GraceNoteGroup([gracenote], true);
        staveNote.addModifier(0, gracenotegroup.beamNotes());
    }

    addDoubleGraceNote(staveNote: any, voice) {
        let gracenote1 = new vexflow.Flow.GraceNote({ keys: ["d/5"], duration: '16d', stem_direction: STEMDIRECTION });
        this.addGraceNoteSticking(gracenote1, voice);

        let gracenote2 = new vexflow.Flow.GraceNote({ keys: ["d/5"], duration: '16d', stem_direction: STEMDIRECTION });
        this.addGraceNoteSticking(gracenote2, voice);

        let gracenotegroup = new vexflow.Flow.GraceNoteGroup([gracenote1, gracenote2], true);
        staveNote.addModifier(0, gracenotegroup.beamNotes());
    }

    // TODO: Finish dis
    addFourOnFloorPattern(mergedNotes: any[], pattern: Rudiment[]) {
        let positions = this.getFirstBeatPositionsOfNotes(pattern);

        for (let position of positions) {

        }
    }

    draw(mergedNotes: any[], beams: any[], tripletPositions: any[], allNotes: any[], pattern: Rudiment[]) {
        let staveNoteGroup = this.context.openGroup();
        this.addFourOnFloorPattern(mergedNotes, pattern);

        vexflow.Flow.Formatter.FormatAndDraw(this.context, this.stave, mergedNotes);
        if (tripletPositions.length) {
            let positionsObj = this.getTripletPositionsFromMergedNotes(mergedNotes, allNotes, tripletPositions, pattern);
            for (let i = 0; i < positionsObj.positions.length; i++) {
                this.renderTripletRudiment(pattern[positionsObj.patternIndex[i]], mergedNotes.slice(positionsObj.positions[i][0], positionsObj.positions[i][1]));
            }
        }
        beams.forEach(b => b.draw());

        this.context.closeGroup();
        // TODO: Get this working increase note size for tablets
        staveNoteGroup.style.fontsize = "20";
        console.log('merged notes', mergedNotes);
    }


    createMIDITrack(notes: any[]) {
        this.voice = new vexflow.Flow.Voice({ num_beats: 4, beat_value: 1 });
        this.voice.addTickables(notes);
        // this.playaService.initializeVoice(voice, this.bpm);
        // this.playaService.playTrack();
    }

    ///// UTILITY FUNCTIONS ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    getFirstNotePositionsOfPattern(pattern: Rudiment[], mergedNotes: any[]) {
        let indices = [0];
        let index = 0;

        for (let i = 0; i < pattern.length - 1; i++) {
            index += pattern[i].voicing.length;
            indices.push(index);
        }

        return indices;
    }

    getFirstBeatPositionsOfNotes(pattern: Rudiment[]) {
        let notes = [];
        for (let rudiment of pattern) {
            notes = [...notes, ...rudiment.voicing];
        }

        let positions = [0];
        let beat = 0;
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].note === 'q') {
                beat = beat + 1;
            } else if (notes[i].note === '16d' && notes[i].isTriplet) {
                beat = beat + .17;
            } else if (notes[i].note === '8d' && notes[i].isTriplet) {
                beat = beat + .34;
            } else if (notes[i].note === '8d') {
                beat = beat + .5;
            } else if (notes[i].note === '16d') {
                beat = beat + .25;
            }

            if (beat >= 1) {
                positions.push(i + 1);
                beat = 0;
            }
        }

        return positions.slice(0, -1);
    }

    getOffsetOfFirstBeats(mergedNotes: any[], pattern: Rudiment[]) {
        let positions = this.getFirstBeatPositionsOfNotes(pattern);

        for (let i = 0; i < positions.length; i++) {
            positions[i] = mergedNotes[positions[i]].getNoteHeadEndX();
        }

        this.getWidthsOfFirstBeats(positions);
        this.firstBeatPositions = positions;
    }

    getWidthsOfFirstBeats(positions: any[]) {
        for (let i = 0; i < positions.length; i++) {
            if (i === positions.length - 1) {
                this.firstBeatWidths[i] = (this.stave.getWidth() - positions[i] - OFFSET) + 13;
            } else {
                this.firstBeatWidths[i] = positions[i + 1] - positions[i] - OFFSET;
            }
        }
    }

    setDistancesBetweenPatterns(pattern: Rudiment[], mergedNotes: any[]) {
        let indicies = this.getFirstNotePositionsOfPattern(pattern, mergedNotes);
        for (let i = 0; i < indicies.length; i++) {
            pattern[i].firstNotePosition = mergedNotes[indicies[i]].getNoteHeadEndX();
        }
    }

    getTripletPositionsFromMergedNotes(mergedNotes: any[], allNotes: any[], tripletPositions: any[], pattern: Rudiment[]) {
        let positionsObj = {
            positions: [],
            patternIndex: []
        };
        let firstNotePositions = this.getFirstNotePositionsOfPattern(pattern, mergedNotes);

        for (let index of tripletPositions) {
            let notes = allNotes[index];
            positionsObj.positions.push([firstNotePositions[index], firstNotePositions[index] + notes.length]);
            positionsObj.patternIndex.push(index);
        }

        return positionsObj;
    }

}