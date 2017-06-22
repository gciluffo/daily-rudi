import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Rudiment } from '../models/rudiment'
import * as vexflow from 'vexflow';

const notePosOffset = 10; // pixels

@Injectable()
export class VexRendererService {

    private VF: any;
    private noteTies: any[] = [];
    public context: any;
    public stave: any;
    public meanDistanceNotes: number;
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

    createRenderer(domElement: any, pattern: Rudiment[]) {
        this.getScreenDimensions().then(() => {
            let renderer = new this.VF.Renderer(domElement, this.VF.Renderer.Backends.SVG);

            renderer.resize(this.screenDimensions.width, 500);
            this.context = renderer.getContext();
            this.context.setFont("Arial", 10, 0).setBackgroundFillStyle("#eed");
            this.renderStaff(domElement, pattern);
        });
    }

    renderStaff(domElement: any, pattern: Rudiment[]) {
        let options = {
            spacing_between_lines_px: 25, // in pixels
            space_above_staff_ln: 2,      // in staff lines
            space_below_staff_ln: 4,      // in staff lines
            top_text_position: 1          // in staff lines
        };

        // Create a stave of width 400 at position 10, 40 on the canvas.
        this.stave = new this.VF.Stave(-10, 10, this.screenDimensions.width, options);
        this.stave.setContext(this.context).draw();

        this.renderPattern(pattern);
    }

    renderPattern(pattern: Rudiment[]) {
        console.log('pattern to draw', pattern);
        let allNotes = [];
        let beams = [];

        // Create an array of an array of notes
        for (let rudiment of pattern) {
            allNotes.push(this.createNoteArray(rudiment));
        }

        // Create a beam for each group of notes
        for (let notes of allNotes) {
            beams = [...beams, new this.VF.Beam(notes).setContext(this.context)];
        }

        let mergedNotes = [].concat.apply([], allNotes);
        vexflow.Flow.Formatter.FormatAndDraw(this.context, this.stave, mergedNotes);
        beams.forEach(b => b.draw());
        if (this.noteTies.length) { this.noteTies.forEach(t => t.draw()); };
        this.setFirstLastNotePositions(mergedNotes);
    }

    createNoteArray(rudiment: Rudiment) {
        let notes: any = [];

        for (let i = 0; i < rudiment.voicing.length; i++) {
            let note = new vexflow.Flow.StaveNote({ keys: ["b/4"], duration: rudiment.voicing[i].note });
            this.addSticking(note, rudiment.voicing[i].sticking);

            // If note is doubled
            if (rudiment.voicing[i].double) {
                this.addTremoloToNote(note);
            }

            if (rudiment.voicing[i].flam) {
                this.addFlam(note, rudiment.voicing[i]);
            }

            notes.push(note);
        }

        let n = this.addAccentToFirstBeat(notes.splice(0));
        if (rudiment.tiedNotes) { this.addTiedNotes(rudiment.tiedNotes, n); }
        // if (rudiment.isTriplet) { this.renderTripletRudiment(n, rudiment) }
        return n;
    }

    renderTripletRudiment(notes: any[], rudiment: Rudiment) {
        // Setup the beams: we do this before defining tuplets so that default bracketing will work.
        let beams = rudiment.beamPositions.map(i => {
            return new vexflow.Flow.Beam(notes.slice(i[0], i[1])).setContext(this.context);
        });

        // Now create the tuplets:
        let quarterNoteTriplet = new vexflow.Flow.Tuplet(notes, {
            num_notes: 6, beats_occupied: 2
        });

        this.VF.Formatter.FormatAndDraw(this.context, this.stave, notes);

        // Draw the beams:
        beams.forEach(beam => {
            beam.draw();
        });

        // Draw the tuplets:
        [quarterNoteTriplet]
            .forEach(tuplet => {
                tuplet.setContext(this.context).draw();
            });
    }

    setFirstLastNotePositions(notes: any[]) {
        this.notePositions.firstNotePos = notes[0].getNoteHeadEndX() + notePosOffset;
        this.notePositions.lastNotePos = notes[notes.length - 1].getNoteHeadEndX() + notePosOffset;
        console.log('note positions: ', this.notePositions);
        this.getMeanNoteDistance(notes);
    }

    getMeanNoteDistance(notes: any[]) {
        let meanDistance = 0;

        for (let i = 0; i + 1 < notes.length; i++) {
            let delta = (notes[i + 1].getNoteHeadEndX() + notePosOffset) - (notes[i].getNoteHeadEndX() + notePosOffset);
            meanDistance += delta;
        }

        this.meanDistanceNotes = meanDistance / 4;
        console.log('meanDistance', this.meanDistanceNotes);
    }

    addSticking(staveNote: any, annotation: string) {
        staveNote
            .addModifier(0, new vexflow.Flow.Annotation(annotation)
                .setFont("Arial", 16, 'italic')
                .setVerticalJustification(vexflow.Flow.Annotation.VerticalJustify.BOTTOM));
    }

    addAccentToFirstBeat(notes: any[]) {
        notes[0].addArticulation(0, new vexflow.Flow.Articulation("a>")
            .setPosition(vexflow.Flow.Modifier.Position.ABOVE));
        return notes;
    }

    addTremoloToNote(staveNote: any) {
        staveNote.addArticulation(0, new vexflow.Flow.Tremolo(1)
            .setPosition(vexflow.Flow.Modifier.Position.ABOVE));
    }

    addTiedNotes(positions: any[], notes) {
        let numOfTies = positions.length / 2;

        for (let i = 0; i < numOfTies; i++) {
            this.noteTies.push(new this.VF.StaveTie({
                first_note: notes[positions[i]],
                last_note: notes[positions[i + 1]],
                first_indices: [0],
                last_indices: [0]
            }).setContext(this.context));
        }
    }

    addFlam(note: any, voice: any) {
        let gracenote = new vexflow.Flow.GraceNote({ keys: ["b/4"], duration: '8d', slash: true })
            .addModifier(0, new vexflow.Flow.Annotation(voice.sticking === 'R' ? 'L' : 'R')
                .setFont("Arial", 8, 'italic')
                .setVerticalJustification(vexflow.Flow.Annotation.VerticalJustify.BOTTOM));
        let gracenotegroup = new vexflow.Flow.GraceNoteGroup([gracenote], true);
        note.addModifier(0, gracenotegroup.beamNotes());
    }
}