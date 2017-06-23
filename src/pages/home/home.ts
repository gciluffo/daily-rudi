import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { Metronome, RudimentService, VexRendererService, StorageService } from '../../services';
import { SettingsPage } from '../settings/settings';

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
  private interval: any;
  private notePositions: any;
  public settings: any;

  constructor(public navCtrl: NavController,
    private rudimentService: RudimentService,
    private vexRendererService: VexRendererService,
    private storageService: StorageService,
    public modalCtrl: ModalController) {
  }

  ngAfterViewInit() {
    let domElement = this.ogStaff.nativeElement;
    this.vexRendererService.createRenderer(domElement, this.rudiments);
  }

  ngOnInit() {
    this.loadSettings();
    this.rudiments = this.rudimentService.getRudimentPattern();
    this.bpm = 80;
    this.metronome = new Metronome();
    this.notePositions = this.vexRendererService.notePositions;
    this.sliderPosition = this.notePositions.firstNotePos;
  }

  play() {
    this.metronome.setTempo(this.bpm);
    this.metronome.play();
    this.moveRight();
  }

  pause() {
    this.metronome.pause();
    this.sliderPosition = this.notePositions.firstNotePos;
    clearInterval(this.interval);
  }

  moveRight() {
    this.sliderPosition += this.vexRendererService.meanDistanceNotes;
    console.log('slider position', this.sliderPosition);

    this.interval = setInterval(() => {
      if (this.sliderPosition >= this.notePositions.lastNotePos) {
        this.sliderPosition = this.notePositions.firstNotePos;
      } else {
        this.sliderPosition += this.vexRendererService.meanDistanceNotes;
      }
      console.log('slider position', this.sliderPosition);
    }, (60.0 / this.bpm) * 1000);
  }

  createSettingsObject() {
    return {
      useMetronomeSlider: this.settings.useMetronomeSlider,
      useRandomAccents: this.settings.useRandomAccents,
      useRudimentNames: this.settings.useRudimentNames
    }
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
    this.vexRendererService.renderStaff(this.ogStaff.nativeElement, this.rudimentService.getRudimentPattern());
    this.sliderPosition = this.notePositions.firstNotePos;
  }

  loadSettings() {
    this.storageService.loadSettings()
      .then((data) => {
        this.settings = data;
        this.vexRendererService.settings = data;
      }, error => console.log(error));
  }
}
