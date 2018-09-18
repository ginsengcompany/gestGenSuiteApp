import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';

/**
 * Generated class for the ModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {

  public title;
  public displayData;

  constructor(public navCtrl: NavController, public viewCtrl : ViewController ,public navParams: NavParams) {


  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    this.title = this.navParams.get('message');
    console.log(this.navParams.get('array'));
    let stringifiedData = JSON.stringify(this.navParams.get('array'));
    let parsedData = JSON.parse(stringifiedData);

    this.displayData = parsedData;

  }

  formatDate(date) {

    date = new Date(date);

    let monthNames = [
      'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
    ];

    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }



}
