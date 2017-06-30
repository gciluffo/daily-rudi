import { Injectable } from '@angular/core';
import { MediaPlugin, MediaObject } from '@ionic-native/media';
import { File } from '@ionic-native/file';

import * as MidiWriter from 'midi-writer-js';
import * as MidiPlayer from 'midi-player-js';
import * as SoundfontPlayer from 'soundfont-player';

@Injectable()
export class PlayaService {

    private metronome: any;

    constructor(private media: MediaPlugin,
        private file: File) {
        console.log('soundPlayer', SoundfontPlayer);
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

        voice.tickables.forEach((tickable, i) => {
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

            let event = new MidiWriter.NoteEvent({ pitch: pitches, duration: this.convertDuration(voice.tickables[i]), wait: wait });
            track.addEvent(event);

            // reset wait
            wait = 0;
        });

        return track;
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
        SoundfontPlayer.instrument(new AudioContext(), 'woodblock').then((instrument) => {
            // Initialize player and register event handler
            // Initialize player and register event handler
            let Player = new MidiPlayer.Player((event) => {
                if (event.name == 'Note on') {
                    instrument.play(event.noteName, null, { gain: 4 });
                }
            });

            // Load a MIDI file
            Player.loadDataUri(track.dataUri());
            Player.play();
        })
    }
}