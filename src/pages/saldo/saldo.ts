import { Component } from '@angular/core';
import {AlertController, MenuController, ModalController, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {CalendarModal, CalendarModalOptions, CalendarResult} from "ion2-calendar";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'page-saldo',
  templateUrl: 'saldo.html'
})

export class SaldoPage {

  public tipo;
  public retrievedObj;
  public entrate;
  public uscite;
  public saldo;
  public saldDate;
  public giornaliero;
  public settimanale;
  public cliente;
  public modeKeys;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public modalCtrl: ModalController,public http:HttpClient, public alertCtrl: AlertController) {

    this.retrievedObj = JSON.parse(localStorage.getItem('storedData'));

    this.entrate=0;
    this.uscite=0;
    this.saldo=0;
    this.cliente="";


    if (this.retrievedObj.tipo === false) {
      this.navCtrl.setRoot(HomePage);
    }

    this.menuCtrl.enable(true, 'myMenu');

    let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


    let data = JSON.stringify({"struttura": this.retrievedObj.struttura});

    this.http.post('https://gestgensuite.ak12srl.it/cliente',data, headers)
      .subscribe(data => {
          let a = JSON.stringify(data);
          let b = JSON.parse(a);
          if(b.errore===false){
            this.modeKeys = b.id;

          }
          else if(b.errore===true){
            let alert = this.alertCtrl.create({
              title: 'Attenzione!',
              subTitle: 'Nessun cliente presente!',
              buttons: ['OK']
            });
            alert.present();
          }
        },
        err => {
          console.log(data);
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        });

  }

  onChangeSelection(tipo){

    if(tipo==="settimanale"){

      document.getElementById("settimanale").style.display = "block";
      document.getElementById("giornaliero").style.display = "none";
      document.getElementById("settimanale1").style.display = "block";
      document.getElementById("giornaliero1").style.display = "none";

      this.entrate=0;
      this.uscite=0;
      this.saldo=0;
      this.saldDate ="";
      this.cliente ="";

    }
    else if(tipo==="giornaliero"){

      document.getElementById("giornaliero").style.display = "block";
      document.getElementById("settimanale").style.display = "none";
      document.getElementById("settimanale1").style.display = "none";
      document.getElementById("giornaliero1").style.display = "block";

      this.entrate=0;
      this.uscite=0;
      this.saldo=0;

      this.saldDate ="";
      this.cliente ="";

    }

  }


  openCalendar() {
    const options: CalendarModalOptions = {
      pickMode: 'range',
      title: 'SALDO',
      monthFormat: 'MMMM YYYY',
      weekdays: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
      weekStart: 1,
      defaultDate: new Date(),
      canBackwardsSelected: true
    };

    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {
      let monthNames = [
        'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
      ];

      let dateA = new Date(date.from.string);

      let day = dateA.getDate();
      let monthIndex = dateA.getMonth();
      let year = dateA.getFullYear();

      let dateB = new Date(date.to.string);

      let day1 = dateB.getDate();
      let monthIndex1 = dateB.getMonth();
      let year1 = dateB.getFullYear();

      this.saldDate = day + ' ' + monthNames[monthIndex] + ' ' + year + ' al '+day1 + ' ' + monthNames[monthIndex1] + ' ' + year1;

      let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

      if(this.cliente){

        let data = JSON.stringify({"data": date, "tipo":"rangecli", "struttura": this.retrievedObj.struttura, "cliente": this.cliente});

        this.http.post('https://gestgensuite.ak12srl.it/getSaldo',data, headers)
          .subscribe(data => {
              let a = JSON.stringify(data);
              let b = JSON.parse(a);
              if(b.errore===false){
                console.log(b);
                this.settimanale = b.id;
                let ent = [];
                let usc = [];
                for(let i=0;i<b.id.length;i++){
                  if(b.id[i].tipo==='incasso'){


                    ent.push(parseFloat(b.id[i].importo));

                  }
                  if(b.id[i].tipo==='pagamento'){



                    usc.push(parseFloat(b.id[i].importo));


                  }
                }
                this.entrate = ent.reduce((a, b) => a + b, 0);
                this.uscite = usc.reduce((a, b) => a + b, 0);
                this.saldo = this.entrate - this.uscite;
                console.log(ent);
                console.log(usc);

              }
              else if(b.errore===true){
                this.entrate=0;
                this.uscite=0;
                this.saldo=0;
                this.giornaliero=[];
                this.settimanale=[];
                this.cliente="";
                let alert = this.alertCtrl.create({
                  title: 'Attenzione!',
                  subTitle: 'Nessun saldo presente!',
                  buttons: ['OK']
                });
                alert.present();
              }
            },
            err => {
              console.log(data);
              console.log('Error: ' + err.error);
              console.log('Name: ' + err.name);
              console.log('Message: ' + err.message);
              console.log('Status: ' + err.status);
            });


      }

      else{

        let data = JSON.stringify({"data": date, "tipo":"range", "struttura": this.retrievedObj.struttura});

        this.http.post('https://gestgensuite.ak12srl.it/getSaldo',data, headers)
          .subscribe(data => {
              let a = JSON.stringify(data);
              let b = JSON.parse(a);
              if(b.errore===false){
                console.log(b);
                this.settimanale = b.id;
                let ent = [];
                let usc = [];
                for(let i=0;i<b.id.length;i++){
                  if(b.id[i].tipo==='incasso'){


                    ent.push(parseFloat(b.id[i].importo));

                  }
                  if(b.id[i].tipo==='pagamento'){



                    usc.push(parseFloat(b.id[i].importo));


                  }
                }
                this.entrate = ent.reduce((a, b) => a + b, 0);
                this.uscite = usc.reduce((a, b) => a + b, 0);
                this.saldo = this.entrate - this.uscite;
                console.log(ent);
                console.log(usc);

              }
              else if(b.errore===true){
                this.entrate=0;
                this.uscite=0;
                this.saldo=0;
                this.giornaliero=[];
                this.settimanale=[];
                let alert = this.alertCtrl.create({
                  title: 'Attenzione!',
                  subTitle: 'Nessun saldo presente!',
                  buttons: ['OK']
                });
                alert.present();
              }
            },
            err => {
              console.log(data);
              console.log('Error: ' + err.error);
              console.log('Name: ' + err.name);
              console.log('Message: ' + err.message);
              console.log('Status: ' + err.status);
            });


      }

    });
  }

  openCalendar1() {

    const options: CalendarModalOptions = {
      title: 'SALDO',
      monthFormat: 'MMMM YYYY',
      weekdays: ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
      weekStart: 1,
      defaultDate: new Date(),
      canBackwardsSelected: true
    };
    let myCalendar =  this.modalCtrl.create(CalendarModal, {
      options: options
    });

    myCalendar.present();

    myCalendar.onDidDismiss((date: CalendarResult, type: string) => {

      let monthNames = [
        'Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
      ];

      let dateA = new Date(date.string);

      let day = dateA.getDate();
      let monthIndex = dateA.getMonth();
      let year = dateA.getFullYear();

      this.saldDate = day + ' ' + monthNames[monthIndex] + ' ' + year;

      let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


      if(this.cliente){

        let data = JSON.stringify({"data": date, "tipo":"giornocli", "struttura": this.retrievedObj.struttura, "cliente": this.cliente});

        this.http.post('https://gestgensuite.ak12srl.it/getSaldo',data, headers)
          .subscribe(data => {
              let a = JSON.stringify(data);
              let b = JSON.parse(a);
              if(b.errore===false){
                console.log(b);
                this.giornaliero = b.id;
                let ent = [];
                let usc = [];
                for(let i=0;i<b.id.length;i++){
                  if(b.id[i].tipo==='incasso'){


                    ent.push(parseFloat(b.id[i].importo));

                  }
                  if(b.id[i].tipo==='pagamento'){



                    usc.push(parseFloat(b.id[i].importo));


                  }
                }
                this.entrate = ent.reduce((a, b) => a + b, 0);
                this.uscite = usc.reduce((a, b) => a + b, 0);
                this.saldo = this.entrate - this.uscite;
                console.log(ent);
                console.log(usc);
              }
              else if(b.errore===true){
                this.entrate=0;
                this.uscite=0;
                this.saldo=0;
                this.giornaliero=[];
                this.settimanale=[];
                this.cliente="";
                let alert = this.alertCtrl.create({
                  title: 'Attenzione!',
                  subTitle: 'Nessun saldo presente!',
                  buttons: ['OK']
                });
                alert.present();
              }
            },
            err => {
              console.log(data);
              console.log('Error: ' + err.error);
              console.log('Name: ' + err.name);
              console.log('Message: ' + err.message);
              console.log('Status: ' + err.status);
            });


      }
      else{

        let data = JSON.stringify({"data": date, "tipo":"giorno", "struttura": this.retrievedObj.struttura});

        this.http.post('https://gestgensuite.ak12srl.it/getSaldo',data, headers)
          .subscribe(data => {
              let a = JSON.stringify(data);
              let b = JSON.parse(a);
              if(b.errore===false){
                console.log(b);
                this.giornaliero = b.id;
                let ent = [];
                let usc = [];
                for(let i=0;i<b.id.length;i++){
                  if(b.id[i].tipo==='incasso'){


                    ent.push(parseFloat(b.id[i].importo));

                  }
                  if(b.id[i].tipo==='pagamento'){



                    usc.push(parseFloat(b.id[i].importo));


                  }
                }
                this.entrate = ent.reduce((a, b) => a + b, 0);
                this.uscite = usc.reduce((a, b) => a + b, 0);
                this.saldo = this.entrate - this.uscite;
                console.log(ent);
                console.log(usc);
              }
              else if(b.errore===true){
                this.entrate=0;
                this.uscite=0;
                this.saldo=0;
                this.giornaliero=[];
                this.settimanale=[];
                this.cliente="";
                let alert = this.alertCtrl.create({
                  title: 'Attenzione!',
                  subTitle: 'Nessun saldo presente!',
                  buttons: ['OK']
                });
                alert.present();
              }
            },
            err => {
              console.log(data);
              console.log('Error: ' + err.error);
              console.log('Name: ' + err.name);
              console.log('Message: ' + err.message);
              console.log('Status: ' + err.status);
            });

      }

    })
  }

  openDettaglio(){

    let data = { message : 'Dettaglio Settimanale', array: this.settimanale };
    let modalPage = this.modalCtrl.create('ModalPage',data);
    modalPage.present();

  }

  openDettaglio1(){

    let data = { message : 'Dettaglio Giornaliero', array: this.giornaliero };
    let modalPage = this.modalCtrl.create('ModalPage',data);
    modalPage.present();


  }

}
