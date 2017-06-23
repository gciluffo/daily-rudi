import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { StorageService } from '../../services';


/**
 * Generated class for the SettingsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage implements OnInit {

  public settings: any = {
    useMetronomeSlider: null,
    useRandomAccents: null,
    useRudimentNames: null
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storageService: StorageService,
    public viewCtrl: ViewController) {
  }

  ngOnInit() {
    this.getNavParams();
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
    this.settings.useRudimentNames = this.navParams.get('useRudimentNames');
  }
}
