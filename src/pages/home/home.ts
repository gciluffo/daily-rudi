import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Metronome, RudimentService } from '../../services';
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
    private rudimentService: RudimentService) {
  }

  ngAfterViewInit() {
    let domElement = this.ogStaff.nativeElement;
    this.renderStaff(domElement);
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

  renderStaff(domElement: any) {
    this.VF = vexflow.Flow;
    // Create an SVG renderer and attach it to the DIV element named "boo".
    let renderer = new this.VF.Renderer(domElement, this.VF.Renderer.Backends.SVG);

    // Configure the rendering context.
    renderer.resize(500, 500);
    var context = renderer.getContext();
    context.setFont("Arial", 10, 0).setBackgroundFillStyle("#eed");

    // Create a stave of width 400 at position 10, 40 on the canvas.
    var stave = new this.VF.Stave(10, 40, 350);

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();
  }

}
