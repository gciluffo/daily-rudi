import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, ModalController, Platform, AlertController } from 'ionic-angular';

import { Metronome, RudimentService, VexRendererService, StorageService, PlatformService, PlayaService } from '../../services';

import { Rudiment } from '../../models/rudiment';
import { SettingsPage } from '../settings/settings';
import { NewPatternPage } from '../new-pattern/new-pattern';
import { LoadPatternPage } from '../load-pattern/load-pattern';

const offset = 20;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  @ViewChild('ogStaff') ogStaff: ElementRef;

  public metronome: Metronome;
  public bpm: number;
  public isPlaying: boolean = false;
  public playMidi: boolean = false;
  public showRange: boolean = false;
  public pattern: Rudiment[];
  public sliderPosition: number = 0;
  private counter: number = 0;
  public settings: any;
  public notePositions: any;

  constructor(public navCtrl: NavController,
    public platformService: PlatformService,
    public rudimentService: RudimentService,
    public vexRendererService: VexRendererService,
    private storageService: StorageService,
    public modalCtrl: ModalController,
    public platform: Platform,
    private _ngZone: NgZone,
    private playaService: PlayaService,
    public splashService: PlatformService,
    private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.splashService.hide();
  }

  ngOnInit() {
    this.platform.pause.subscribe(() => {
      console.log('[INFO] App paused');
      this.saveSettings();
      this.platformService.removeZombie();
    });

    this.platform.resume.subscribe(() => {
      this.platformService.makeZombie();
      console.log('[INFO] App resumed');
    });

    this.metronome = new Metronome();
    this.loadSettings();
    this.moveRight();
  }

  playAll() {
    if (this.playMidi) {
      this.playaService.playTrack();
    }
    this.playMetronome();
  }

  playMetronome() {
    this.metronome.setTempo(this.bpm);
    this.metronome.play();
    this.counter = 0;
  }

  pause() {
    this.metronome.pause();
    this.playaService.stop();
    this.sliderPosition = this.vexRendererService.firstBeatPositions[0] - offset;
    this.counter = 0;
  }

  toggleMidi() {
    if (this.playMidi) {
      this.initializeMidi();
      this.showRange = false;
    }

    if (this.isPlaying && !this.playMidi) {
      this.playaService.stop();
    }
  }

  tempoChange() {
    if (this.isPlaying) {
      this.metronome.setTempo(this.bpm);
    }
  }

  moveRight() {
    this.metronome.tick.subscribe((flag: boolean) => {
      this._ngZone.run(() => {
        this.counter++;
        if (this.counter === 5) { // assuming we are in 4/4 time
          this.sliderPosition = this.vexRendererService.firstBeatPositions[0] - offset;
          this.counter = 1;
        } else if (this.counter === 1) {
          // no no
        } else {
          this.sliderPosition = this.vexRendererService.firstBeatPositions[this.counter - 1] - offset;
        }

        // If playback is on, start it on the first beat
        if (this.counter === 1 && this.playMidi && !this.playaService.isPlaying()) {
          this.playaService.playTrack();
        }
      });
    });
  }

  openSettings() {
    let settingsModal = this.modalCtrl.create(SettingsPage);
    settingsModal.onDidDismiss(data => {
      this.settings = data;
      this.vexRendererService.settings = data;
      this.metronome.settings = data;
      this.metronome.loadSound();
    });
    settingsModal.present();
  }

  renderPattern(pattern: Rudiment[]) {
    this.playaService.stop();
    if (!this.vexRendererService.context) { // first time loading up the app
      let domElement = this.ogStaff.nativeElement;
      this.vexRendererService.createRenderer(domElement)
        .then((context: any) => {
          this.splashService.hide();
          this.drawPattern(pattern);
          if (this.playMidi) {
            this.initializeMidi();
          }
        });
    } else {
      this.vexRendererService.context.clear();
      this.drawPattern(pattern);
      if (this.playMidi) {
        this.initializeMidi();
      }
    }
  }

  drawPattern(pattern: Rudiment[]) {
    this.vexRendererService.bpm = this.bpm;
    this.vexRendererService.renderStaff(pattern);
    this.sliderPosition = this.vexRendererService.firstBeatPositions[0] - offset;
    this.pattern = pattern;
  }

  loadSettings() {
    this.storageService.loadSettings()
      .then((data: any) => {
        this.settings = data;
        this.vexRendererService.settings = data;
        this.metronome.settings = data;
        this.metronome.loadSound();
        this.bpm = +data.bpm;

        if (data.pattern) {
          let pattern = JSON.parse(data.pattern)
          this.renderPattern(pattern);
        } else { // else first time logging in 
          this.renderPattern(this.rudimentService.getRudimentPattern());
        }
      }, error => console.log(error));
  }

  saveSettings() {
    this.settings.pattern = JSON.stringify(this.pattern);
    this.settings.bpm = this.bpm.toString();
    this.storageService.updateSettings(this.settings);
    this.pause();
  }

  initializeMidi() {
    this.playaService.initializeVoice(this.vexRendererService.voice, this.bpm);
  }

  addMinusOneBpm(operation: string) {
    if (operation === 'add') {
      this.bpm += 1;
    } else {
      this.bpm -= 1;
    }

    this.tempoChange();
  }

  openSavePatternAlert() {
    let newPatternModal = this.modalCtrl.create(NewPatternPage);
    newPatternModal.onDidDismiss(name => {
      if (name) {
        this.storageService.savePattern(this.pattern, name);
        this.storageService.savePatternName(name);
      }
    });
    newPatternModal.present();
  }

  openPatternsAlert() {
    let loadPatternModal = this.modalCtrl.create(LoadPatternPage);
    loadPatternModal.onDidDismiss(name => {
      if (name) {
        this.storageService.loadPatternByName(name)
          .then((pattern: any) => {
            this.renderPattern(pattern);
          });
      }
    });
    loadPatternModal.present();
  }

  swipeEvent(swipe) {
    if (swipe.deltaX < -100) {
      this.renderPattern(this.rudimentService.getRudimentPattern())
    }
  }
}
