import { Injectable } from '@angular/core';

import * as MidiWriter from 'midi-writer-js';
import * as MidiPlayer from 'midi-player-js';
import * as SoundfontPlayer from 'soundfont-player';

@Injectable()
export class PlayaService {

    constructor() {
    }

    initialize(voice: any) {
        let track = this.trackFromVoice(voice);
        track.setTempo(60);
        let writer = new MidiWriter.Writer([track]);
        this.playTrack(writer);
    }

    trackFromVoice(voice) {
        let track = new MidiWriter.Track();;
        let wait;
        let pitches = [];

        voice.tickables.forEach((tickable) => {
            pitches = [];

            if (tickable.noteType === 'n') {
                tickable.keys.forEach((key) => {
                    // build array of pitches
                    pitches.push(this.convertPitch(key));
                });
            } else if (tickable.noteType === 'r') {
                // move on to the next tickable and use this rest as a `wait` property for the next event
                wait = this.convertDuration(tickable);
                return;
            }

            if (tickable.modifiers.length) {
                tickable.modifiers.forEach((modifier) => {
                    if (modifier.grace_notes) {
                        track.addEvent(new MidiWriter.NoteEvent({ pitch: pitches, duration: '16', wait: wait }));
                    }
                });
            }

            track.addEvent(new MidiWriter.NoteEvent({ pitch: pitches, duration: this.convertDuration(tickable), wait: wait }));

            // reset wait
            wait = 0;
        });

        return track;
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
                    instrument.play(event.noteName, null, { gain: 5 });
                }
            });

            // Load a MIDI file
            Player.loadDataUri(track.dataUri());
            Player.play();
        });
    }
}