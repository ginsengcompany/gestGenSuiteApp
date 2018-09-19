import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the ImageDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-image-details',
  templateUrl: 'image-details.html',
})
export class ImageDetailsPage {

  public foto;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl : ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageDetailsPage');
    this.foto = this.navParams.get('foto');
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

}
