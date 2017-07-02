import { Injectable, EventEmitter } from '@angular/core';

import * as MidiWriter from 'midi-writer-js';
import * as MidiPlayer from 'midi-player-js';
import * as SoundfontPlayer from 'soundfont-player';

@Injectable()
export class PlayaService {

    private midi: any;
    private voice: any;
    private instrument: any;
    private metronomeIsPlaying: boolean = false;
    public midiHasStarted: EventEmitter<boolean> = new EventEmitter();

    constructor() {
        this.intitializeInstrument();
    }

    initializeVoice(voice: any, bpm: number) {
        let tracks = this.trackFromVoice(voice, bpm);
        console.log('tracks', tracks);
        console.log('voice', voice);
        this.midi = new MidiWriter.Writer(tracks);
    }

    trackFromVoice(voice, tempo) {
        let tracks = [];
        tracks[0] = new MidiWriter.Track();
        tracks[0].setTimeSignature(4, 4);
        tracks[0].setTempo(tempo);
        let velocity = 50;
        let note;

        tracks[1] = new MidiWriter.Track();

        voice.tickables.forEach((tickable) => {
            console.log('derp')
            // check for grace notes
            if (tickable.modifiers.length) {
                tickable.modifiers.forEach((modifier) => {
                    if (modifier.grace_notes) {
                        // notes.push(new MidiWriter.NoteEvent({ pitch: pitches, duration: '64' }));
                    }
                    if (modifier.type === 'a>') { // increase veolocity for accented notes
                        velocity = 70
                    }
                });
            }

            note = new MidiWriter.NoteEvent({ pitch: ['b4'], duration: this.convertDuration(tickable), velocity: velocity });
            tracks[1].addEvent(note);
            velocity = 50;
        });

        return tracks;
    }

    addNoteEventToTrack(track: any, event: any) {
        new MidiWriter.NoteEvent(event);
        track.addEvent(event);
    }

    convertDuration(note) {
        if (note.tupletStack.length) {
            return note.duration + 't';
        }

        switch (note.duration) {
            case 'w':
                return '1';
            case 'h':
                return note.getDots() ? 'd2' : '2';
            case 'q':
                return note.getDots() ? 'd4' : '4';
            case '8':
                return note.getDots() ? 'd8' : '8';
        }

        return note.duration;
    }

    public playTrack() {
        this.metronomeIsPlaying = true;
        // Initialize player and register event handler
        let Player = new MidiPlayer.Player((event) => {
            if (event.name == 'Note on') {
                if (this.metronomeIsPlaying) {
                    this.midiHasStarted.emit(true);
                    this.metronomeIsPlaying = false;
                }

                console.log(event);
                this.instrument.play(event.noteName, null, { gain: event.velocity / 10 });
            }
        });

        // Load a MIDI file
        Player.loadDataUri(this.midi.dataUri());
        Player.play();
    }

    intitializeInstrument() {
        SoundfontPlayer.instrument(new AudioContext(), 'woodblock').then((instrument) => {
            this.instrument = instrument;
        });
    }
}