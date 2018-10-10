import { Component } from '@angular/core';
import {AlertController, IonicPage, ModalController, NavController, NavParams, ViewController} from 'ionic-angular';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

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
  public imgUrl;

  constructor(public navCtrl: NavController, public viewCtrl : ViewController ,public navParams: NavParams,private sanitizer: DomSanitizer,public modalCtrl: ModalController, public alertCtrl: AlertController){


  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalPage');
    this.title = this.navParams.get('message');
    console.log(this.navParams.get('array'));

    if(this.navParams.get('array')=== undefined){

      let alert = this.alertCtrl.create({
        title: 'Attenzione!',
        subTitle: 'Selezionare prima una Giornata o un Periodo per visualizzare il Dettaglio!',
        buttons: ['OK']
      });
      alert.present();

    }
    else{
      let stringifiedData = JSON.stringify(this.navParams.get('array'));
      let parsedData = JSON.parse(stringifiedData);

      this.displayData = parsedData;
    }

  }

  displayImage(foto) {
    this.imgUrl = this.getImgContent(foto);
    let data = { foto : this.imgUrl};
    let imagePage = this.modalCtrl.create('ImageDetailsPage',data);
    imagePage.present();
  }

  getImgContent(foto): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(foto);
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
