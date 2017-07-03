import { Injectable, EventEmitter } from '@angular/core';

import * as MidiWriter from 'midi-writer-js';
import * as MidiPlayer from 'midi-player-js';
import * as SoundfontPlayer from 'soundfont-player';

@Injectable()
export class PlayaService {

    private midi: any;
    private instrument: any;
    private metronomeIsPlaying: boolean = false;
    private player: any;
    private trackLength: number;
    public midiHasStarted: EventEmitter<boolean> = new EventEmitter();
    private midiLoop: any;
    private bpm: number = 60;

    constructor() {
        this.intitializeInstrument();
    }

    initializeVoice(voice: any, bpm: number) {
        this.bpm = bpm - .25;
        let tracks = this.trackFromVoice(voice, this.bpm);
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

        this.trackLength = tracks[1].events.length + 1;
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

    public playMidi() {
        // Initialize player and register event handler
        this.player = new MidiPlayer.Player((event) => {
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
        this.player.loadDataUri(this.midi.dataUri());
        this.player.play();
    }

    playTrack() {
        this.metronomeIsPlaying = true;
        this.playMidi();
        this.midiLoop = setInterval(() => {
            this.playMidi();
        }, ((60.0 / this.bpm) * 1000) * 4);
    }

    intitializeInstrument() {
        SoundfontPlayer.instrument(new AudioContext(), 'woodblock').then((instrument) => {
            this.instrument = instrument;
        });
    }

    stopPlayer() {
        if (this.player) {
            this.player.stop();
            clearInterval(this.midiLoop);
        }
    }

    play() {
        if (this.player) {
            this.player.play();
        }
    }

    changePlayerTempo(bpm) {
        if (this.player) {
            this.player.tempo = bpm;
        }
    }
}