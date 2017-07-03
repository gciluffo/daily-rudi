import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';

import { Metronome, RudimentService, VexRendererService, StorageService, SplashService, PlayaService } from '../../services';

import { Rudiment } from '../../models/rudiment';
import { SettingsPage } from '../settings/settings';

const offset = 10;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  @ViewChild('ogStaff') ogStaff: ElementRef;
  @ViewChild('ogBar') ogBar: ElementRef;

  public metronome: any;
  public bpm: number;
  public isPlaying: boolean = false;
  public playMidi: boolean = false;
  public pattern: Rudiment[];
  public sliderPosition: number = 0;
  private sliderInterval: any;
  private counter: number = 0;
  public settings: any;
  public notePositions: any;

  constructor(public navCtrl: NavController,
    public rudimentService: RudimentService,
    public vexRendererService: VexRendererService,
    private storageService: StorageService,
    public modalCtrl: ModalController,
    public platform: Platform,
    private _ngZone: NgZone,
    private playaService: PlayaService,
    public splashService: SplashService) {
  }

  ionViewDidLoad() {
    this.splashService.hide();
  }

  ngOnInit() {
    this.playaService.midiHasStarted
      .subscribe(() => {
        this.playMetronome();
      });

    this.platform.pause.subscribe(() => {
      console.log('[INFO] App paused');
      this.saveSettings();
    });

    this.platform.resume.subscribe(() => {
      console.log('[INFO] App resumed');
    });

    this.loadSettings();
    this.bpm = 60;
    this.metronome = new Metronome();
    this.moveRight();
  }

  playAll() {
    if (this.playMidi) {
      this.playaService.playTrack();
    } else {
      this.playMetronome();
    }
  }

  playMetronome() {
    this.metronome.setTempo(this.bpm);
    this.metronome.play();
    this.counter = 0;
  }

  pause() {
    this.metronome.pause();
    this.playaService.stopPlayer();
    this.sliderPosition = this.vexRendererService.firstBeatPositions[0] - offset;
    clearInterval(this.sliderInterval);
    this.counter = 0;
  }

  setMidi() {
    if (this.playMidi) {
      if (this.isPlaying) {
        // TODO: find a way to start the player at beginning of the stave
      }
      this.initializeMidi();
    }
  }

  tempoChange() {
    if (this.isPlaying) {
      this.metronome.setTempo(this.bpm);
      clearInterval(this.sliderInterval);
    }
  }

  tempoOnRelease() {
    this.initializeMidi();
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
      });
    });
  }

  createSettingsObject() {
    return {
      useMetronomeSlider: this.settings.useMetronomeSlider,
      useRandomAccents: this.settings.useRandomAccents
    };
  }

  openSettings() {
    let settingsModal = this.modalCtrl.create(SettingsPage, this.createSettingsObject());
    settingsModal.onDidDismiss(data => {
      this.settings = data;
      this.vexRendererService.settings = data;
    });
    settingsModal.present();
  }

  renderPattern(pattern: Rudiment[]) {
    this.playaService.stopPlayer();
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
    this.storageService.updateSettings(this.settings);
    this.pause();
  }

  initializeMidi() {
    this.playaService.initializeVoice(this.vexRendererService.voice, this.bpm);
  }
}
