import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';


@Component({
  selector: 'page-new-pattern',
  templateUrl: 'new-pattern.html',
})
export class NewPatternPage {

  private patternName: string;
  @ViewChild('input') myInput;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private platform: Platform
  ) {
  }

  ionViewDidLoad() {
    this.patternName = null;
    setTimeout(() => {
      this.myInput.setFocus();
    }, 600);
  }

  savePattern() {
    this.viewCtrl.dismiss(this.patternName);
  }

  dismiss() {
    this.viewCtrl.dismiss(null);
  }

  overrideBackButton() {
    this.platform.registerBackButtonAction(() => {
      this.dismiss();
    });
  }

}
