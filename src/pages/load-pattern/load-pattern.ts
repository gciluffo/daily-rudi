import { Component, OnInit } from '@angular/core';
import { Platform, NavController, ViewController } from 'ionic-angular';
import { StorageService } from '../../services';

@Component({
  selector: 'page-load-pattern',
  templateUrl: 'load-pattern.html',
})
export class LoadPatternPage implements OnInit {

  private patternNames: any[];
  private selectedPattern: string;

  constructor(public navCtrl: NavController,
    private storageService: StorageService,
    private platform: Platform,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoadPatternPage');
  }

  ngOnInit() {
    this.storageService.loadPatternNames()
      .then((names: any) => {
        console.log('name', names);
        this.patternNames = names;
      })
  }

  loadPattern() {
    this.viewCtrl.dismiss(this.selectedPattern);
  }

  dismiss() {
    this.viewCtrl.dismiss(null);
  }

  overrideBackButton() {
    this.platform.registerBackButtonAction(() => {
      this.dismiss();
    });
  }

  onSelect(event) {
    this.selectedPattern = event
  }

  delete(item) {
    let index = this.patternNames.findIndex((o) => {
      return o === item;
    });
    this.patternNames.splice(index, 1);
    this.storageService.deletePatternByName(item);
  }

}
