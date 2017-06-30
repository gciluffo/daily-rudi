import { Injectable } from '@angular/core';

import * as MidiWriter from 'midi-writer-js';
import * as MidiPlayer from 'midi-player-js';
import * as SoundfontPlayer from 'soundfont-player';

@Injectable()
export class PlayaService {

    constructor() {
    }

    initialize(voice: any) {
        let tracks = this.trackFromVoice(voice);
        let write = new MidiWriter.Writer(tracks);
        this.playTrack(write);
    }

    trackFromVoice(voice) {
        let tracks = [];
        tracks[0] = new MidiWriter.Track();
        tracks[0].setTimeSignature(4, 4);
        tracks[0].setTempo(100);
        let wait;
        let pitches = [];

        tracks[1] = new MidiWriter.Track();
        voice.tickables.forEach((tickable) => {
            pitches = [];

            if (tickable.noteType === 'n') {
                tickable.keys.forEach((key) => {
                    // build array of pitches
                    pitches.push(this.convertPitch(key));
                });
            }

            if (tickable.modifiers.length) {
                tickable.modifiers.forEach((modifier) => {
                    if (modifier.grace_notes) {
                        // track.addEvent(new MidiWriter.NoteEvent({ pitch: pitches, duration: '16', wait: wait, velocity: 30 }));
                    }
                });
            }

            tracks[1].addEvent(new MidiWriter.NoteEvent({ pitch: pitches, duration: this.convertDuration(tickable) }));
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

        return note.duration;
    }

    playTrack(track: any) {
        SoundfontPlayer.instrument(new AudioContext(), 'melodic_tom').then((instrument) => {
            // Initialize player and register event handler
            // Initialize player and register event handler
            let Player = new MidiPlayer.Player((event) => {
                if (event.name == 'Note on') {
                    console.log(event);
                    instrument.play(event.noteName, null, { gain: 7 });
                }
            });

            // Load a MIDI file
            Player.loadDataUri(track.dataUri());
            Player.play();
        });
    }


    generateZelda() {
        var tracks = [];

        tracks[0] = new MidiWriter.Track();
        tracks[0].setTimeSignature(3, 4);
        tracks[0].setTempo(40);

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


        var write = new MidiWriter.Writer(tracks);

        return write;
    }
}