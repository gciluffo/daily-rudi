import { Injectable } from '@angular/core';

import * as MidiWriter from 'midi-writer-js';
import * as MidiPlayer from 'midi-player-js';
import * as SoundfontPlayer from 'soundfont-player';

@Injectable()
export class PlayaService {

    private midi: any;
    private instrument: any;
    private player: any;
    private midiLoop: any;
    private bpm: number = 50;
    private audioContext: any;
    private mixGain: any;
    private filterGain: any;

    constructor() {
        this.intitializeInstrument();
        this.initializeWebAudio();
    }

    initializeWebAudio() {
        this.audioContext = new AudioContext();
        this.filterGain = this.audioContext.createGain();
        this.mixGain = this.audioContext.createGain();
        this.mixGain.connect(this.audioContext.destination);
        this.mixGain.gain.value = 0;
        this.filterGain.gain.value = 0;
    }

    initializeVoice(voice: any, bpm: number) {
        this.bpm = bpm;
        let tracks = this.trackFromVoice(voice, this.bpm);
        console.log('tracks', tracks[1].events);
        console.log('voice', voice);
        this.midi = new MidiWriter.Writer(tracks);
    }

    trackFromVoice(voice, tempo) {
        let tracks = [];
        tracks[0] = new MidiWriter.Track();
        tracks[0].setTimeSignature(4, 4);
        tracks[0].setTempo(tempo);
        let notes = [];
        let tremolo = false;
        tracks[1] = new MidiWriter.Track();

        voice.tickables.forEach((tickable) => {
            notes = [];

            // check for grace notes
            if (tickable.modifiers.length) {
                tickable.modifiers.forEach((modifier) => {
                    if (modifier.grace_notes && modifier.grace_notes.length === 1) { // if its a flam
                        // notes.push(new MidiWriter.NoteEvent({ pitch: ['b4'], duration: '4', grace: ['b4'] }));
                    }
                    if (modifier.grace_notes && modifier.grace_notes.length === 2) { // if its a grace note roll
                        // notes.push(new MidiWriter.NoteEvent({ pitch: ['b4'], duration: '16', velocity: 10 }));
                        // notes.push(new MidiWriter.NoteEvent({ pitch: ['b4'], duration: '16', velocity: 10 }));
                    }
                    if (modifier.type === 'a>') { // increase veolocity for accented notes

                    }
                    if (modifier.code === 'v74') { // if tremolo
                        tremolo = true;
                        notes.push(new MidiWriter.NoteEvent({ pitch: ['b4'], duration: '32' }));
                    }
                });
            }

            notes.push(new MidiWriter.NoteEvent({ pitch: ['b4'], duration: tremolo ? '32' : this.convertDuration(tickable) }));
            tracks[1].addEvent(notes);
            tremolo = false;
        });

        return tracks;
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
                console.log(event);
                // this.instrument.play(event.noteName, null, { gain: 2 });
                // this.snare();
                this.snare();
            }
        });

        // Load a MIDI file
        this.player.loadDataUri(this.midi.dataUri());
        this.player.play();
    }

    playTrack() {
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

    stop() {
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

    isPlaying() {
        if (!this.player) {
            return false;
        } else {
            return this.player.isPlaying();
        }
    }

    changePlayerTempo(bpm) {
        if (this.player) {
            this.player.tempo = bpm;
        }
    }

    private scheduleTone(): void {
        let osc = this.audioContext.createOscillator();
        osc.connect(this.audioContext.destination);

        osc.frequency.value = 700;
        osc.start(this.audioContext.currentTime + .1);
        osc.stop(this.audioContext.currentTime + .1 + .020);
    }

    snare() {
        var osc3 = this.audioContext.createOscillator();
        var gainOsc3 = this.audioContext.createGain();

        this.filterGain.gain.setValueAtTime(1, this.audioContext.currentTime);
        this.filterGain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

        osc3.type = "triangle";
        osc3.frequency.value = 100;
        gainOsc3.gain.value = 0;

        gainOsc3.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainOsc3.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);

        osc3.connect(gainOsc3);
        gainOsc3.connect(this.mixGain);

        this.mixGain.gain.value = 1;

        osc3.start(this.audioContext.currentTime);
        osc3.stop(this.audioContext.currentTime + 0.2);

        var node = this.audioContext.createBufferSource(),
            buffer = this.audioContext.createBuffer(1, 4096, this.audioContext.sampleRate),
            data = buffer.getChannelData(0);

        var filter = this.audioContext.createBiquadFilter();
        filter.type = "highpass";
        filter.frequency.setValueAtTime(100, this.audioContext.currentTime);
        filter.frequency.linearRampToValueAtTime(1000, this.audioContext.currentTime + 0.2);


        for (var i = 0; i < 4096; i++) {
            data[i] = Math.random();
        }
        node.buffer = buffer;
        node.loop = true;
        node.connect(filter);
        filter.connect(this.filterGain);
        this.filterGain.connect(this.mixGain);
        node.start(this.audioContext.currentTime);
        node.stop(this.audioContext.currentTime + 0.020);
    };
}