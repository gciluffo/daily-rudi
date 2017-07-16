import { Injectable } from '@angular/core';

import * as MidiWriter from 'midi-writer-js';
import * as MidiPlayer from 'midi-player-js';

@Injectable()
export class PlayaService {

    private midi: any;
    private player: any;
    private midiLoop: any;
    private bpm: number = 50;
    private audioContext: any;
    private mixGain: any;
    private filterGain: any;

    constructor() {
        this.initializeWebAudio();
    }

    initializeWebAudio() {
        this.audioContext = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();
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
                this.scheduleTone();
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

}