import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Rudiment } from '../models/rudiment'
import * as vexflow from 'vexflow';

const notePosOffset = -2; // pixels

@Injectable()
export class VexRendererService {

    private VF: any;
    public context: any;
    public stave: any;
    public meanDistanceNotes: number;
    public settings: any = {
        useRandomAccents: false
    };
    public notePositions: any = {
        firstNotePos: 0,
        lastNotePos: 0
    };
    public screenDimensions: any = {
        width: 0,
        height: 0
    };

    constructor(private platform: Platform) {
        this.VF = vexflow.Flow;
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
                let renderer = new this.VF.Renderer(domElement, this.VF.Renderer.Backends.SVG);

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
            spacing_between_lines_px: 20, // in pixels
            space_above_staff_ln: 4,      // in staff lines
            space_below_staff_ln: 4,      // in staff lines
            top_text_position: 1,          // in staff lines
        };

        // Create a stave of width 400 at position 10, 40 on the canvas.
        this.stave = new this.VF.Stave(-2, 15, this.screenDimensions.width, options);
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
            } else if (allNotes[i].length !== 1) {
                beams = [...beams, new this.VF.Beam(allNotes[i]).setContext(this.context)];
            }
        }

        let mergedNotes = [].concat.apply([], allNotes);
        this.draw(mergedNotes, beams, tripletPositions, allNotes, pattern);
        this.setFirstLastNotePositions(mergedNotes);
        this.setDistancesBetweenPatterns(pattern, mergedNotes);
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

    createNoteArray(rudiment: Rudiment) {
        let notes: any = [];

        for (let i = 0; i < rudiment.voicing.length; i++) {
            let note = new vexflow.Flow.StaveNote({ keys: ["b/4"], duration: rudiment.voicing[i].note });
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
            return new this.VF.Beam(notes.slice(i[0], i[1]));
        });

        for (let beams of rudiment.beamPositions) {
            triplets.push(new vexflow.Flow.Tuplet(notes.slice(beams[0], beams[1])));
        }
        // Now create the tuplets:
        // this.VF.Formatter.FormatAndDraw(this.context, this.stave, notes);

        beams.forEach(beam => {
            beam.setContext(this.context).draw();
        });

        triplets.forEach(triplet => {
            triplet.setContext(this.context).draw();
        });
    }

    setFirstLastNotePositions(notes: any[]) {
        this.notePositions.firstNotePos = notes[0].getNoteHeadEndX() + notePosOffset;
        this.notePositions.lastNotePos = notes[notes.length - 1].getNoteHeadEndX() + notePosOffset;
        this.getMeanNoteDistance(notes);
    }

    getMeanNoteDistance(notes: any[]) {
        let meanDistance = 0;

        for (let i = 0; i + 1 < notes.length; i++) {
            let delta = (notes[i + 1].getNoteHeadEndX() + notePosOffset) - (notes[i].getNoteHeadEndX() + notePosOffset);
            meanDistance += delta;
        }

        this.meanDistanceNotes = (this.notePositions.lastNotePos - this.notePositions.firstNotePos) / 4;
        this.notePositions.staveWidth = this.stave.getWidth();
        this.notePositions.staveOffset = this.stave.getWidth() - ((this.notePositions.lastNotePos - this.notePositions.firstNotePos)
            + (this.stave.getWidth() - this.notePositions.lastNotePos));
    }

    getFirstNotePositionsOfPattern(pattern: Rudiment[], mergedNotes: any[]) {
        let indices = [0];
        let index = 0;

        for (let i = 0; i < pattern.length - 1; i++) {
            index += pattern[i].voicing.length;
            indices.push(index);
        }

        return indices;
    }

    setDistancesBetweenPatterns(pattern: Rudiment[], mergedNotes: any[]) {
        let indicies = this.getFirstNotePositionsOfPattern(pattern, mergedNotes);
        for (let i = 0; i < indicies.length; i++) {
            pattern[i].firstNotePosition = mergedNotes[indicies[i]].getNoteHeadEndX();
        }
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

    setGraceNoteShift(gracenote: any) {
        gracenote.setXShift(0);
    }

    addGraceNoteSticking(gracenote: any, voice) {
        let annotation = new vexflow.Flow.Annotation(voice.sticking === 'R' ? 'L' : 'R')
            .setFont("Arial", 8, 'italic')
            .setVerticalJustification(vexflow.Flow.Annotation.VerticalJustify.BOTTOM);

        gracenote.addModifier(0, annotation);
    }

    addFlam(staveNote: any, voice: any) {
        let gracenote = new vexflow.Flow.GraceNote({ keys: ["b/4"], duration: '8d' });

        this.addGraceNoteSticking(gracenote, voice);
        this.setGraceNoteShift(gracenote);
        let gracenotegroup = new vexflow.Flow.GraceNoteGroup([gracenote], true);
        staveNote.addModifier(0, gracenotegroup.beamNotes());
    }

    addDoubleGraceNote(staveNote: any, voice) {
        let gracenote1 = new vexflow.Flow.GraceNote({ keys: ["b/4"], duration: '16d' });
        this.addGraceNoteSticking(gracenote1, voice);

        let gracenote2 = new vexflow.Flow.GraceNote({ keys: ["b/4"], duration: '16d' });
        this.addGraceNoteSticking(gracenote2, voice);

        let gracenotegroup = new vexflow.Flow.GraceNoteGroup([gracenote1, gracenote2], true);
        staveNote.addModifier(0, gracenotegroup.beamNotes());
    }

    draw(mergedNotes: any[], beams: any[], tripletPositions: any[], allNotes: any[], pattern: Rudiment[]) {
        vexflow.Flow.Formatter.FormatAndDraw(this.context, this.stave, mergedNotes);
        if (tripletPositions.length) {
            let positionsObj = this.getTripletPositionsFromMergedNotes(mergedNotes, allNotes, tripletPositions, pattern);
            for (let i = 0; i < positionsObj.positions.length; i++) {
                this.renderTripletRudiment(pattern[positionsObj.patternIndex[i]], mergedNotes.slice(positionsObj.positions[i][0], positionsObj.positions[i][1]));
            }
        }
        beams.forEach(b => b.draw());
    }
}