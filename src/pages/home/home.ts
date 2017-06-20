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

  private metronome: any;
  private VF: any;
  public bpm: number;
  public isPlaying: boolean = false;
  public rudiments: Rudiment[];
  public metronomeSlider: string;

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
    this.bpm = 120;
    this.metronome = new Metronome();
  }

  play() {
    this.metronome.setTempo(this.bpm);
    this.metronome.play();
  }

  pause() {
    this.metronome.pause();
  }
}
