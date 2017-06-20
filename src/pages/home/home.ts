import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Metronome, RudimentService, VexRendererService } from '../../services';
import * as vexflow from 'vexflow';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  @ViewChild('ogStaff') ogStaff: ElementRef;

  private metronome: any;
  private VF: any;
  public bpm: number;
  public isPlaying: boolean = false;
  public rudiments: any[];
  public metronomeSlider: string;


  constructor(public navCtrl: NavController,
    private rudimentService: RudimentService,
    private vexRendererService: VexRendererService) {
  }

  ngAfterViewInit() {
    let domElement = this.ogStaff.nativeElement;
    this.VF = vexflow.Flow;
    this.vexRendererService.renderStaff(domElement, this.VF);
  }

  ngOnInit() {
    this.rudiments = this.rudimentService.getRudimentPattern();
    this.bpm = 120;
    this.metronome = new Metronome();
    console.log('the pattern:', this.rudiments);
  }

  play() {
    this.metronome.setTempo(this.bpm);
    this.metronome.play();
    this.metronomeSlider = 'start';
  }

  pause() {
    this.metronome.pause();
    this.metronomeSlider = 'stop';
  }
}
