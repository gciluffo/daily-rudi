import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Metronome, RudimentService, VexRendererService } from '../../services';
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
  private resetSlider: boolean = false;

  constructor(public navCtrl: NavController,
    private rudimentService: RudimentService,
    private vexRendererService: VexRendererService) {
  }

  ngAfterViewInit() {
    let domElement = this.ogStaff.nativeElement;
    this.vexRendererService.renderStaff(domElement, this.rudiments);
  }

  ngOnInit() {
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
      this.sliderPosition += this.vexRendererService.meanDistanceNotes;
      console.log('slider position', this.sliderPosition);

      if (this.sliderPosition >= this.notePositions.lastNotePos) {
        this.sliderPosition = this.notePositions.firstNotePos + this.vexRendererService.meanDistanceNotes;
      }
    }, (60.0 / this.bpm) * 1000);
  }
}
