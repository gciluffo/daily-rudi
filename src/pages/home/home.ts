import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Metronome } from '../../services/metronome';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  private metronome: any;
  public bpm: number;
  public isPlaying: boolean = false;

  constructor(public navCtrl: NavController) {
  }

  ngOnInit() {
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
