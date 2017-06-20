import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Rudiment } from '../models/rudiment'
import * as vexflow from 'vexflow';

@Injectable()
export class VexRendererService {

    private context: any;
    private VF: any;
    private stave: any;
    public screenDimensions: any = {
        width: 0,
        height: 0
    };

    constructor(private platform: Platform) {
        this.VF = vexflow.Flow;
    }

    renderStaff(domElement: any, pattern: Rudiment[]) {
        this.platform.ready().then((readySource) => {
            this.screenDimensions.width = this.platform.width();
            this.screenDimensions.height = this.platform.height();

            let renderer = new this.VF.Renderer(domElement, this.VF.Renderer.Backends.SVG);

            renderer.resize(this.screenDimensions.width - 50, 500);
            this.context = renderer.getContext();
            this.context.setFont("Arial", 10, 0).setBackgroundFillStyle("#eed");

            let options = {
                spacing_between_lines_px: 25, // in pixels
                space_above_staff_ln: 2,      // in staff lines
                space_below_staff_ln: 4,      // in staff lines
                top_text_position: 1          // in staff lines
            };

            // Create a stave of width 400 at position 10, 40 on the canvas.
            this.stave = new this.VF.Stave(10, 10, this.screenDimensions.width, options);
            this.stave.setContext(this.context).draw();

            this.renderPattern(pattern);
        });
    }

    renderPattern(pattern: Rudiment[]) {
        console.log('pattern to draw', pattern);
        let allNotes = [];
        let beams = [];

        // create an array of an array of notes
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
    }

    addSticking(staveNote: any, annotation: string) {
        staveNote
            .addModifier(0, new vexflow.Flow.Annotation(annotation)
                .setFont("Arial", 16, 'italic')
                .setVerticalJustification(vexflow.Flow.Annotation.VerticalJustify.BOTTOM));
    }

    addAccentToFirstBeat(notes: any[]) {
        notes[0].addArticulation(0, new vexflow.Flow.Articulation("a>").setPosition(vexflow.Flow.Modifier.Position.ABOVE));
        return notes;
    }

    createNoteArray(rudiment: Rudiment) {
        // voicing: [
        //     { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
        //     { sticking: 'L', note: '8d', value: .5, flam: false, double: false },
        //     { sticking: 'R', note: '8d', value: .5, flam: false, double: false },
        //     { sticking: 'R', note: '8d', value: .5, flam: false, double: false }
        // ]

        let notes: any = [];

        for (let i = 0; i < rudiment.voicing.length; i++) {
            let note = new vexflow.Flow.StaveNote({ keys: ["b/4"], duration: rudiment.voicing[i].note });
            this.addSticking(note, rudiment.voicing[i].sticking);

            notes.push(note);
        }

        let n = this.addAccentToFirstBeat(notes.splice(0));
        return n;
    }
}