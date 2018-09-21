import { Component } from '@angular/core';
import {AlertController, LoadingController, MenuController, ModalController, NavController} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Component({
  selector: 'page-prodotti',
  templateUrl: 'prodotti.html'
})

export class ProdottiPage {

  public retrievedObj;
  public modeKeys;
  public categoria;
  public modeKeystwo;
  public fornitore;
  public listaProdotti;
  public quantita;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public modalCtrl: ModalController,public http:HttpClient, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

    this.retrievedObj = JSON.parse(localStorage.getItem('storedData'));

    this.menuCtrl.enable(true, 'myMenu');

    let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    this.categoria = "";
    this.fornitore = "";
    this.quantita="";
    this.listaProdotti="";


    let data = JSON.stringify({"struttura": this.retrievedObj.struttura});

    this.http.post('http://127.0.0.1:3000/categoria',data, headers)
      .subscribe(data => {
          let a = JSON.stringify(data);
          let b = JSON.parse(a);
          if(b.errore===false){
            this.modeKeys = b.id;

          }
          else if(b.errore===true){
            let alert = this.alertCtrl.create({
              title: 'Attenzione!',
              subTitle: 'Nessuna categoria presente!',
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

    this.http.post('http://127.0.0.1:3000/fornitore',data, headers)
      .subscribe(data => {
          let a = JSON.stringify(data);
          let b = JSON.parse(a);
          if(b.errore===false){
            this.modeKeystwo = b.id;

          }
          else if(b.errore===true){
            let alert = this.alertCtrl.create({
              title: 'Attenzione!',
              subTitle: 'Nessuna fornitore presente!',
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

  visualizza(){

    document.getElementById("listaProducts").style.display = "none";

    let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    let data = null;

    if(this.categoria === "" && this.fornitore === ""){

      data = JSON.stringify({"tipo": "multipla", "struttura": this.retrievedObj.struttura});

      this.http.post('http://127.0.0.1:3000/prodotti',data, headers)
        .subscribe(data => {
            let a = JSON.stringify(data);
            let b = JSON.parse(a);
            if(b.errore===false){
              this.listaProdotti = b.id;

              document.getElementById("listaProducts").style.display = "block";

              this.categoria = "";
              this.fornitore = "";

            }
            else if(b.errore===true){
              let alert = this.alertCtrl.create({
                title: 'Attenzione!',
                subTitle: 'Nessun prodotto presente!',
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
    else if(this.categoria.length > 0){

      data = JSON.stringify({"tipo": "categoria", "struttura": this.retrievedObj.struttura,"categoria": this.categoria});

      this.http.post('http://127.0.0.1:3000/prodotti',data, headers)
        .subscribe(data => {
            let a = JSON.stringify(data);
            let b = JSON.parse(a);
            if(b.errore===false){
              this.listaProdotti = b.id;

              document.getElementById("listaProducts").style.display = "block";

              this.categoria = "";
              this.fornitore = "";

            }
            else if(b.errore===true){
              let alert = this.alertCtrl.create({
                title: 'Attenzione!',
                subTitle: 'Nessun prodotto presente per questo filtro!',
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
    else if(this.fornitore.length > 0){

      data = JSON.stringify({"tipo": "fornitore", "struttura": this.retrievedObj.struttura,"fornitore": this.fornitore});

      this.http.post('http://127.0.0.1:3000/prodotti',data, headers)
        .subscribe(data => {
            let a = JSON.stringify(data);
            let b = JSON.parse(a);
            if(b.errore===false){
              this.listaProdotti = b.id;

              document.getElementById("listaProducts").style.display = "block";

              this.categoria = "";
              this.fornitore = "";

            }
            else if(b.errore===true){
              let alert = this.alertCtrl.create({
                title: 'Attenzione!',
                subTitle: 'Nessun prodotto presente per questo filtro!',
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
    else if(this.categoria.length > 0 && this.fornitore.length > 0){

      data = JSON.stringify({"tipo": "double", "struttura": this.retrievedObj.struttura, "fornitore": this.fornitore,"categoria": this.categoria});

      this.http.post('http://127.0.0.1:3000/prodotti',data, headers)
        .subscribe(data => {
            let a = JSON.stringify(data);
            let b = JSON.parse(a);
            if(b.errore===false){
              this.listaProdotti = b.id;

              document.getElementById("listaProducts").style.display = "block";

              this.categoria = "";
              this.fornitore = "";

            }
            else if(b.errore===true){
              let alert = this.alertCtrl.create({
                title: 'Attenzione!',
                subTitle: 'Nessun prodotto presente per questo filtro!',
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

  }

  inviaemail(data){

    if(this.quantita!== undefined){

      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Inoltro richiesta...',
        duration: 3000
      });

      loading.present();

      let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


      let dataPost = JSON.stringify({struttura: this.retrievedObj.struttura});

      this.http.post('https://gestgensuite.ak12srl.it/getStruttura',dataPost, headers)
        .subscribe(data1 => {
            let a = JSON.stringify(data1);
            let b = JSON.parse(a);
            console.log(data);
            console.log(this.retrievedObj);
            console.log(b.id);

            let dataInvioEmail={
              struttura: b.id.id,
              fornitore: data.id,
              codice : data.codice,
              descrizione_prodotto :data.descrizione,
              quantita : this.quantita,
              user_admin :this.retrievedObj.id,
              emailFornitore: data.email,
              emailStruttura: b.id.email

            };

            this.http.post('http://127.0.0.1:3000/invioEmail',dataInvioEmail, headers)
              .subscribe(data => {
                  let a = JSON.stringify(data);
                  let b = JSON.parse(a);

                  let alert = this.alertCtrl.create({
                    title: 'Richiesta',
                    subTitle: 'Spedita con successo!',
                    buttons: ['OK']
                  });
                  alert.present();

                  this.categoria = "";
                  this.fornitore = "";
                  this.quantita="";
                  this.listaProdotti="";

                },
                err => {
                  console.log('Error: ' + err.error);
                  console.log('Name: ' + err.name);
                  console.log('Message: ' + err.message);
                  console.log('Status: ' + err.status);
                });

          },
          err => {
            console.log('Error: ' + err.error);
            console.log('Name: ' + err.name);
            console.log('Message: ' + err.message);
            console.log('Status: ' + err.status);
          });

    }
    else{

      let alert = this.alertCtrl.create({
        title: 'Attenzione',
        subTitle: 'Inserire bene la quantità!',
        buttons: ['OK']
      });
      alert.present();

    }



  }



}
