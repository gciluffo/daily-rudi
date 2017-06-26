import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';

import {
  Metronome, RudimentService, VexRendererService,
  StorageService, TimerService, NotificationService, SplashService
} from '../../services';
import { Rudiment } from '../../models/rudiment';
import { SettingsPage } from '../settings/settings';

import moment from 'moment';

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
  public pattern: Rudiment[];
  public sliderPosition: number = 0;
  private sliderInterval: any;
  private counter: number = 0;
  public numOfRefreshes: number;
  public settings: any;

  constructor(public navCtrl: NavController,
    public rudimentService: RudimentService,
    private vexRendererService: VexRendererService,
    private storageService: StorageService,
    private timerService: TimerService,
    public modalCtrl: ModalController,
    public platform: Platform,
    private _ngZone: NgZone,
    private notifcationService: NotificationService,
    public splashService: SplashService) {
  }

  ionViewDidLoad() {
    console.log('hide deh plash from home');
    this.splashService.hide();
  }

  ngOnInit() {
    console.log('oninit');

    this.timerService.resetRefreshes.subscribe((flag: boolean) => {
      this.numOfRefreshes = this.rudimentService.getNumberOfRefreshes();
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
    this.sliderPosition = this.vexRendererService.notePositions.firstNotePos;
    this.moveRight();
  }

  play() {
    this.sliderPosition = this.vexRendererService.notePositions.firstNotePos;
    this.metronome.setTempo(this.bpm);
    this.metronome.play();
    this.counter = 0;
  }

  pause() {
    this.metronome.pause();
    this.sliderPosition = this.vexRendererService.notePositions.firstNotePos;
    clearInterval(this.sliderInterval);
    this.counter = 0;
  }

  tempoChange() {
    if (this.isPlaying) {
      this.metronome.setTempo(this.bpm);
      clearInterval(this.sliderInterval);
    }
  }

  moveRight() {
    this.metronome.tick.subscribe((flag: boolean) => {
      this._ngZone.run(() => {
        this.counter++;
        if (this.counter === 5) { // assuming we are in 4/4 time
          this.sliderPosition = this.vexRendererService.notePositions.firstNotePos;
          this.counter = 1;
        } else if (this.counter === 1) {
          // no no
        } else {
          this.sliderPosition += this.vexRendererService.meanDistanceNotes;
        }
      });
    });
  }

  createSettingsObject() {
    return {
      useMetronomeSlider: this.settings.useMetronomeSlider,
      useRandomAccents: this.settings.useRandomAccents,
      useRudimentNames: this.settings.useRudimentNames,
      useNotifications: this.settings.useNotifications
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
    if (!this.vexRendererService.context) {
      let domElement = this.ogStaff.nativeElement;
      this.vexRendererService.createRenderer(domElement)
        .then((context: any) => {
          console.log('first time setting up context');
          this.drawPattern(pattern);
        });
    } else {
      this.numOfRefreshes--;
      this.vexRendererService.context.clear();
      this.drawPattern(pattern);
    }
  }

  drawPattern(pattern: Rudiment[]) {
    this.vexRendererService.renderStaff(pattern);
    this.sliderPosition = this.vexRendererService.notePositions.firstNotePos;
    this.pattern = pattern;
  }

  loadSettings() {
    this.storageService.loadSettings()
      .then((data: any) => {
        this.settings = data;
        this.vexRendererService.settings = data;
        this.numOfRefreshes = data.numOfRefreshes;

        if (data.logOutTime) {
          this.timerService.updateCurrentTimerOnOpen(data.timeLeft, data.logOutTime);
          this.timerService.startInterval();
          console.log('the pattern from storage', data.pattern);
          let pattern = JSON.parse(data.pattern)
          this.renderPattern(pattern);
        } else { // else first time logging in 
          this.numOfRefreshes = this.rudimentService.getNumberOfRefreshes();
          this.numOfRefreshes--;
          this.renderPattern(this.rudimentService.getRudimentPattern());
        }
      }, error => console.log(error));
  }

  saveSettings() {
    this.timerService.clearTimerInterval();
    this.settings.timeLeft = this.timerService.timeLeft.format('YYYY-MM-DD HH:mm');
    this.settings.logOutTime = moment().format('YYYY-MM-DD HH:mm');
    this.settings.numOfRefreshes = this.numOfRefreshes;
    console.log('pattern to save', this.pattern);
    this.settings.pattern = JSON.stringify(this.pattern);
    this.storageService.updateSettings(this.settings);
    this.pause();
  }
}
