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
    useRandomAccents: null
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storageService: StorageService,
    public viewCtrl: ViewController,
    private platform: Platform) {
  }

  ngOnInit() {
    this.getNavParams();
    this.overrideBackButton();
  }

  updateSettings() {
    this.storageService.updateSettings(this.settings);
  }

  dismiss() {
    this.viewCtrl.dismiss(this.settings);
  }

  getNavParams() {
    this.settings.useMetronomeSlider = this.navParams.get('useMetronomeSlider');
    this.settings.useRandomAccents = this.navParams.get('useRandomAccents');
  }

  overrideBackButton() {
    this.platform.registerBackButtonAction(() => {
      this.dismiss();
    });
  }
}
