import { EventEmitter } from '@angular/core';
/**
 * Metronome
 */
const numBeatsPerBar = 4;
const maxNoteQueLength = 5;

const scheduleInterval = 25.0; // ms. How often the scheduling is called.
const scheduleAheadTime = .1; // Seconds

export class Metronome {

    private tempo: number; // beats per minute (BPM)
    private isPlaying: boolean = false;
    private audioContext: AudioContext;
    private soundBuffer: any;
    private soundSource: any;
    private audioLoopTimerHandle: any;
    private canSuspend: boolean = false;
    private usesWorker: boolean = false;
    private intervalWorker: Worker;
    private suspendTimerId: any;
    private nextNoteTime: number = 0;
    private next4thNote: number = 0;
    public settings: any;

    private noteQue: { progress: number, time: number, tempo: number }[];
    public tick: EventEmitter<boolean> = new EventEmitter();

    constructor() {
        // Safari needs prefix webkitAudioContext
        this.audioContext = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();
        this.loadSound();

        // --Suspend/resume--
        this.canSuspend = (() => {
            if (typeof (<any>this.audioContext).resume !== 'function') {
                return false;
            }

            if (typeof (<any>this.audioContext).suspend !== 'function') {
                return false;
            }
            return true;
        })();

        if (this.canSuspend) {
            clearTimeout(this.suspendTimerId);
            (<any>this.audioContext).suspend();
        }

        // --Web worker--
        this.usesWorker = (<any>window).Worker ? true : false;

        if (this.usesWorker) {
            this.intervalWorker = new Worker('assets/js/IntervalWorker.js');
            this.intervalWorker.onmessage = (event) => {
                if (event.data === 'tick') {
                    this.scheduler();
                } else {
                    console.log('Data from intervalWorker: ', event.data);
                }
            };
        }
    }

    play(): void {
        if (!this.isPlaying) {
            if (this.canSuspend) (<any>this.audioContext).resume();
            this.isPlaying = true;
            this.audioLoop();
        }
    }

    pause(): void {
        if (this.isPlaying) {
            this.stopAudioLoop();
            this.isPlaying = false;

            if (this.canSuspend) {
                this.suspendTimerId = setTimeout(() => {
                    (<any>this.audioContext).suspend();
                }, scheduleAheadTime * 1000 * 2);
            }
        }
    }

    toggle(): boolean {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
        return this.isPlaying;
    }

    setTempo(tempo: number): void {
        this.tempo = Number(tempo);
    }

    getCurrentTime() {
        return this.audioContext.currentTime;
    }

    readNoteQue(): { progress: number, time: number, tempo: number } {
        return this.noteQue.pop();
    }

    private flushNoteQue() {
        while (this.noteQue.length > 0) {
            this.noteQue.pop();
        }
    }

    private stopAudioLoop() {
        if (this.usesWorker) {
            this.intervalWorker.postMessage({ 'interval': 0 });
        } else {
            clearInterval(this.audioLoopTimerHandle);
        }
        this.flushNoteQue();
    }

    private audioLoop() {
        this.nextNoteTime = this.audioContext.currentTime + 0.1;
        this.next4thNote = 0;

        this.noteQue = [];

        this.noteQue.push({
            time: this.nextNoteTime,
            tempo: this.tempo,
            progress: this.next4thNote / 4,
        });

        if (this.usesWorker) {
            this.intervalWorker.postMessage({ 'interval': scheduleInterval });
        } else {
            this.audioLoopTimerHandle = setInterval(() => {
                if (!this.isPlaying) return;
                this.scheduler();
            }, scheduleInterval);
        }
    }

    private scheduler() {
        while (this.nextNoteTime < this.audioContext.currentTime + scheduleAheadTime) {
            this.playSound();
            let secondsPerBeat = 60.0 / this.tempo;
            this.nextNoteTime += secondsPerBeat;
            this.next4thNote = (this.next4thNote + 1) % numBeatsPerBar;

            if (this.noteQue.length > maxNoteQueLength) this.noteQue.pop();

            this.noteQue.push({
                time: this.nextNoteTime,
                tempo: this.tempo,
                progress: (this.next4thNote) / 4,
            });
        }
    }

    public loadSound() {
        let request = new XMLHttpRequest();
        request.open('GET', this.settings ? this.settings.clickSound : 'assets/sounds/pink.wav', true);
        request.responseType = 'arraybuffer';

        // Decode asynchronously
        request.onload = () => {
            this.audioContext.decodeAudioData(request.response, (buffer) => {
                this.soundBuffer = buffer;
                this.makeBufferSource();
            });
        }
        request.send();
    }

    makeBufferSource() {
        this.soundSource = this.audioContext.createBufferSource();
        this.soundSource.buffer = this.soundBuffer;
        this.soundSource.connect(this.audioContext.destination);

        // toggle volume
        let gain = this.audioContext.createGain();
        gain.gain.value = 5;
        this.soundSource.connect(gain);
        gain.connect(this.audioContext.destination);
    }

    playSound() {
        this.soundSource.start(this.nextNoteTime);
        this.tick.emit(true);
        this.makeBufferSource();
    }
}

