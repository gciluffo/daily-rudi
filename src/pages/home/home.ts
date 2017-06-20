import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Metronome, RudimentService } from '../../services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  private metronome: any;
  public bpm: number;
  public isPlaying: boolean = false;
  public rudiments: any[];

  constructor(public navCtrl: NavController,
    private rudimentService: RudimentService) {
  }

  ngOnInit() {
    this.rudiments = this.rudimentService.getRudimentPattern();
    console.log('the pattern:', this.rudiments);
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
