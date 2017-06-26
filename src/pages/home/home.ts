import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';

import { Metronome, RudimentService, VexRendererService, StorageService, TimerService } from '../../services';
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
  public rudiments: Rudiment[];
  private sliderPosition: number = 0;
  private sliderInterval: any;
  public numOfRefreshes: number;
  public settings: any;

  constructor(public navCtrl: NavController,
    private rudimentService: RudimentService,
    private vexRendererService: VexRendererService,
    private storageService: StorageService,
    private timerService: TimerService,
    public modalCtrl: ModalController,
    public platform: Platform) {
  }

  ngAfterViewInit() {
    let domElement = this.ogStaff.nativeElement;
    this.vexRendererService.createRenderer(domElement, this.rudiments);
  }

  ngOnInit() {
    this.timerService.resetRefreshes.subscribe((flag: boolean) => {
      if (flag) {
        this.numOfRefreshes = this.rudimentService.getNumberOfRefreshes();
      }
    });

    this.platform.pause.subscribe(() => {
      console.log('[INFO] App paused');
      this.timerService.clearTimerInterval();
      this.settings.timeLeft = this.timerService.timeLeft.format('YYYY-MM-DD HH:mm');
      this.settings.logOutTime = moment().format('YYYY-MM-DD HH:mm');
      this.storageService.updateSettings(this.settings);
      this.pause();
    });

    this.platform.resume.subscribe(() => {
      console.log('[INFO] App resumed');
    });

    this.loadSettings();
    this.rudiments = this.rudimentService.getRudimentPattern();
    this.bpm = 60;
    this.metronome = new Metronome();
    this.sliderPosition = this.vexRendererService.notePositions.firstNotePos;
  }

  play() {
    this.sliderPosition = this.vexRendererService.notePositions.firstNotePos;
    this.metronome.setTempo(this.bpm);
    this.metronome.play();
    this.moveRight();
  }

  pause() {
    this.metronome.pause();
    this.sliderPosition = this.vexRendererService.notePositions.firstNotePos;
    clearInterval(this.sliderInterval);
  }

  tempoChange() {
    if (this.isPlaying) {
      this.metronome.setTempo(this.bpm);
      clearInterval(this.sliderInterval);
      this.moveRight();
    }
  }

  moveRight() {
    let counter = 0;

    this.sliderInterval = setInterval(() => {
      counter++;
      if (counter === 4) { // assuming we are in 4/4 time
        this.sliderPosition = this.vexRendererService.notePositions.firstNotePos;
        counter = 0;
      } else {
        this.sliderPosition += this.vexRendererService.meanDistanceNotes;
      }
    }, (60.0 / this.bpm) * 1000);
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

  generateNewPattern() {
    this.vexRendererService.context.clear();
    let rudiments = this.rudimentService.getRudimentPattern();
    this.vexRendererService.renderStaff(this.ogStaff.nativeElement, rudiments);
    this.sliderPosition = this.vexRendererService.notePositions.firstNotePos;
    this.rudiments = rudiments;
  }

  loadSettings() {
    this.storageService.loadSettings()
      .then((data: any) => {
        this.settings = data;
        this.vexRendererService.settings = data;

        if (data.timeLeft) {
          this.timerService.updateCurrentTimerOnOpen(data.timeLeft, data.logOutTime);
          this.timerService.startInterval();
        } else { // else first time logging in 
          this.numOfRefreshes = this.rudimentService.getNumberOfRefreshes();
        }
      }, error => console.log(error));
  }
}
