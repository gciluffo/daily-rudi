import { Component, EventEmitter, Output } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  @Output() closeSlides: EventEmitter<boolean> = new EventEmitter();

  private slides = [
    {
      title: "Swipe Right to generate a new pattern",
      image: "assets/img/slide1.png",
    },
    {
      title: "Use these buttons to save and load patterns",
      image: "assets/img/slide2.png",
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroPage');
  }

  toHome() {
    this.closeSlides.emit(true);
  }

}
