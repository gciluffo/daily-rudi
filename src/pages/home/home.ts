import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';

import { Metronome, RudimentService, VexRendererService, StorageService } from '../../services';
import { SettingsPage } from '../settings/settings';
import moment from 'moment';

import { Rudiment } from '../../models/rudiment';

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
  public settings: any;

  constructor(public navCtrl: NavController,
    private rudimentService: RudimentService,
    private vexRendererService: VexRendererService,
    private storageService: StorageService,
    public modalCtrl: ModalController,
    public platform: Platform) {
  }

  ngAfterViewInit() {
    let domElement = this.ogStaff.nativeElement;
    this.vexRendererService.createRenderer(domElement, this.rudiments);
  }

  ngOnInit() {
    this.platform.pause.subscribe(() => {
      console.log('[INFO] App paused');
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
      .then((data) => {
        this.settings = data;
        this.vexRendererService.settings = data;
      }, error => console.log(error));
  }
}
