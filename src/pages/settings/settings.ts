import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController, Platform } from 'ionic-angular';
import { StorageService } from '../../services';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit {

  public settings: any = {
    useMetronomeSlider: null,
    useRandomAccents: null,
    clickSound: null
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storageService: StorageService,
    public viewCtrl: ViewController,
    private platform: Platform) {
  }

  ngOnInit() {
    this.overrideBackButton();
    this.settings = this.storageService.settings;
  }

  updateSettings() {
    this.storageService.updateSettings(this.settings);
  }

  dismiss() {
    this.viewCtrl.dismiss(this.settings);
  }

  overrideBackButton() {
    this.platform.registerBackButtonAction(() => {
      this.dismiss();
    });
  }
}
