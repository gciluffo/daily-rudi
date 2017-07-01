import { Injectable } from '@angular/core';

import * as MidiWriter from 'midi-writer-js';
import * as MidiPlayer from 'midi-player-js';
import * as SoundfontPlayer from 'soundfont-player';

@Injectable()
export class PlayaService {

    private midi: any;
    private voice: any;

    constructor() {
    }

    initializeVoice(voice: any, bpm: number) {
        let tracks = this.trackFromVoice(voice, bpm);
        this.midi = new MidiWriter.Writer(tracks);
        // this.midi = this.generateZelda();
    }

    trackFromVoice(voice, tempo) {
        let tracks = [];
        tracks[0] = new MidiWriter.Track();
        tracks[0].setTimeSignature(4, 4);
        tracks[0].setTempo(tempo);
        let wait;
        let velocity = 50;
        let pitches = [];
        let notes = [];

        tracks[1] = new MidiWriter.Track();
        voice.tickables.forEach((tickable) => {
            pitches = [];
            notes = [];

            if (tickable.noteType === 'n') {
                tickable.keys.forEach((key) => {
                    // build array of pitches
                    pitches.push(this.convertPitch(key));
                });
            }

            if (tickable.modifiers.length) {
                tickable.modifiers.forEach((modifier) => {
                    if (modifier.grace_notes) {
                        notes.push(new MidiWriter.NoteEvent({ pitch: pitches, duration: '64' }));
                    }
                    // if (annotation.accent) {
                    //     velocity = 70
                    // }
                });
            }

            notes.push(new MidiWriter.NoteEvent({ pitch: pitches, duration: this.convertDuration(tickable), velocity: velocity }));
            tracks[1].addEvent(notes);
            velocity = 50;
        });

        return tracks;
    }

    addNoteEventToTrack(track: any, event: any) {
        new MidiWriter.NoteEvent(event);
        track.addEvent(event);
    }

    convertPitch(pitch) {
        return pitch.replace('/', '');
    }

    convertDuration(note) {
        switch (note.duration) {
            case 'w':
                return '1';
            case 'h':
                return note.isDotted() ? 'd2' : '2';
            case 'q':
                return note.isDotted() ? 'd4' : '4';
            case '8':
                return note.isDotted() ? 'd8' : '8';
        }

        if (note.tupletStack.length) {
            return '8t';
        }

        return note.duration;
    }

    public playTrack() {
        return new Promise((resolve, reject) => {
            SoundfontPlayer.instrument(new AudioContext(), 'acoustic_grand_piano').then((instrument) => {

                // Initialize player and register event handler
                let Player = new MidiPlayer.Player((event) => {
                    resolve();
                    if (event.name == 'Note on') {
                        console.log(event);
                        instrument.play(event.noteName, null, { gain: 7 });
                    }
                });

                // Load a MIDI file
                Player.loadDataUri(this.midi.dataUri());
                Player.play();
            });
        });

    }

    generateZelda() {
        var tracks = [];

        tracks[0] = new MidiWriter.Track();
        tracks[0].setTimeSignature(3, 4);
        tracks[0].setTempo(60);

        var notes;

        // melody
        tracks[1] = new MidiWriter.Track();
        notes = new MidiWriter.NoteEvent({ pitch: ['C#5', 'E5'], duration: '2' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['C#5', 'E5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['C#5', 'E5'], duration: '2' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['A4', 'C#5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['B4', 'D5'], duration: '2' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['G#4', 'E5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['A4', 'C#5'], duration: '2' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['A4'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['C#5', 'E5'], duration: '2' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['C#5', 'E5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['C#5', 'E5'], duration: '2' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['A4', 'C#5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['B4', 'D5'], duration: '2' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['G#4', 'E5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['A4', 'C#5'], duration: '2' });
        tracks[1].addEvent(notes);
        // note how the previous rest is handled: it became the wait
        notes = new MidiWriter.NoteEvent({ wait: '4', pitch: ['E5', 'E5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['D#5', 'F#5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['D5', 'G#5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['C#5', 'A5'], duration: '2' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['E5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['E5', 'E5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['D#5', 'F#5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['D5', 'G#5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['C#5', 'A5'], duration: '2' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ wait: '4', pitch: ['C#5', 'E5'], duration: '2' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['C#5', 'E5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['C#5', 'E5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['A5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['A4', 'C#5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['C#5', 'E5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['B4', 'D5'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['G#4', 'B4'], duration: '4' });
        tracks[1].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ pitch: ['A4'], duration: '2' });
        tracks[1].addEvent(notes);

        // bass
        tracks[2] = new MidiWriter.Track();
        notes = new MidiWriter.NoteEvent({ pitch: ['A3'], duration: '2' });
        tracks[2].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ wait: '4', pitch: ['A3'], duration: '2' });
        tracks[2].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ wait: '4', pitch: ['E3'], duration: '2' });
        tracks[2].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ wait: '4', pitch: ['A3'], duration: '2' });
        tracks[2].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ wait: '4', pitch: ['A3'], duration: '2' });
        tracks[2].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ wait: '4', pitch: ['A3'], duration: '2' });
        tracks[2].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ wait: '4', pitch: ['E3'], duration: '2' });
        tracks[2].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ wait: '4', pitch: ['A3'], duration: '2' });
        tracks[2].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ wait: '4', pitch: ['E3'], duration: '2' });
        tracks[2].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ wait: '4', pitch: ['A3'], duration: '2' });
        tracks[2].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ wait: '4', pitch: ['E3'], duration: '2' });
        tracks[2].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ wait: '4', pitch: ['A3'], duration: '2' });
        tracks[2].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ wait: '4', pitch: ['A3'], duration: '2' });
        tracks[2].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ wait: '4', pitch: ['A3'], duration: '2' });
        tracks[2].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ wait: '4', pitch: ['E3'], duration: '2' });
        tracks[2].addEvent(notes);
        notes = new MidiWriter.NoteEvent({ wait: '4', pitch: ['A3'], duration: '2' });
        tracks[2].addEvent(notes);

        console.log('zelda tracks', tracks);

        var write = new MidiWriter.Writer(tracks);

        return write;
    }
}