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
  public newArrayList;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public modalCtrl: ModalController,public http:HttpClient, public alertCtrl: AlertController, public loadingCtrl: LoadingController) {

    this.retrievedObj = JSON.parse(localStorage.getItem('storedData'));

    this.menuCtrl.enable(true, 'myMenu');

    let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    this.categoria = "";
    this.fornitore = "";
    this.quantita="";
    this.listaProdotti="";


    let data = JSON.stringify({"struttura": this.retrievedObj.struttura});

    this.http.post('https://gestgensuite.ak12srl.it/categoria',data, headers)
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

    this.http.post('https://gestgensuite.ak12srl.it/fornitore',data, headers)
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

    let data1 = JSON.stringify({"tipo": "multipla", "struttura": this.retrievedObj.struttura});

    this.http.post('https://gestgensuite.ak12srl.it/prodotti',data1, headers)
      .subscribe(data => {
          let a = JSON.stringify(data);
          let b = JSON.parse(a);
          if(b.errore===false){
            this.listaProdotti = b.id;

            const grouped = this.groupBy(this.listaProdotti, pet => pet.fornitore);

            this.http.post('https://gestgensuite.ak12srl.it/distinctFornitori',{"struttura": this.retrievedObj.struttura}, headers)
              .subscribe(data => {
                  let a = JSON.stringify(data);
                  let b = JSON.parse(a);
                  if(b.errore===false){

                    this.newArrayList = [];

                    for(let i =0; i<b.id.length; i++){

                      this.newArrayList.push(grouped.get(b.id[i].fornitore));

                    }

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

            document.getElementById("listaProducts").style.display = "block";

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

  visualizza(){

    document.getElementById("listaProducts").style.display = "none";

    let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

    let data = null;

    if(this.categoria === "" && this.fornitore === ""){

      data = JSON.stringify({"tipo": "multipla", "struttura": this.retrievedObj.struttura});

      this.http.post('https://gestgensuite.ak12srl.it/prodotti',data, headers)
        .subscribe(data => {
            let a = JSON.stringify(data);
            let b = JSON.parse(a);
            if(b.errore===false){
              this.listaProdotti = b.id;

              const grouped = this.groupBy(this.listaProdotti, pet => pet.fornitore);

              this.http.post('https://gestgensuite.ak12srl.it/distinctFornitori',{"struttura": this.retrievedObj.struttura}, headers)
                .subscribe(data => {
                    let a = JSON.stringify(data);
                    let b = JSON.parse(a);
                    if(b.errore===false){

                      this.newArrayList = [];

                      for(let i =0; i<b.id.length; i++){

                        this.newArrayList.push(grouped.get(b.id[i].fornitore));

                      }

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

              document.getElementById("listaProducts").style.display = "block";

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
    } //OK
    else if(this.categoria.length > 0 && this.fornitore.length > 0){

      data = JSON.stringify({"tipo": "double", "struttura": this.retrievedObj.struttura, "fornitore": this.fornitore,"categoria": this.categoria});

      this.http.post('https://gestgensuite.ak12srl.it/prodotti',data, headers)
        .subscribe(data => {
            let a = JSON.stringify(data);
            let b = JSON.parse(a);
            if(b.errore===false){
              this.listaProdotti = b.id;

              const grouped = this.groupBy(this.listaProdotti, pet => pet.fornitore);

              this.newArrayList = [];

              this.newArrayList.push(grouped.get(this.fornitore));


              document.getElementById("listaProducts").style.display = "block";

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
    } //OK
    else if(this.categoria.length > 0){

      data = JSON.stringify({"tipo": "categoria", "struttura": this.retrievedObj.struttura,"categoria": this.categoria});

      this.http.post('https://gestgensuite.ak12srl.it/prodotti',data, headers)
        .subscribe(data => {
            let a = JSON.stringify(data);
            let b = JSON.parse(a);
            if(b.errore===false){
              this.listaProdotti = b.id;

              const grouped = this.groupBy(this.listaProdotti, pet => pet.fornitore);

              this.http.post('https://gestgensuite.ak12srl.it/distinctCategoria',{"struttura": this.retrievedObj.struttura,"categoria": this.categoria}, headers)
                .subscribe(data => {
                    let a = JSON.stringify(data);
                    let b = JSON.parse(a);
                    if(b.errore===false){

                      this.newArrayList = [];

                      for(let i =0; i<b.id.length; i++){

                        this.newArrayList.push(grouped.get(b.id[i].id));

                      }

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


              document.getElementById("listaProducts").style.display = "block";

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
    } //OK
    else if(this.fornitore.length > 0){

      data = JSON.stringify({"tipo": "fornitore", "struttura": this.retrievedObj.struttura,"fornitore": this.fornitore});

      this.http.post('https://gestgensuite.ak12srl.it/prodotti',data, headers)
        .subscribe(data => {
            let a = JSON.stringify(data);
            let b = JSON.parse(a);
            if(b.errore===false){
              this.listaProdotti = b.id;

              const grouped = this.groupBy(this.listaProdotti, pet => pet.fornitore);

              this.newArrayList = [];

              this.newArrayList.push(grouped.get(this.fornitore));

              document.getElementById("listaProducts").style.display = "block";


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
    } //OK

  }

  inviaemail(data){

    console.log(data);

    let array = [];

    for(let i=0; i<data.length; i++){

      if(data[i].quantita!== null){

        array.push(data[i]);

      }

    }

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
            user_admin :this.retrievedObj.id,
            emailStruttura: b.id.email,
            array: array

          };

          this.http.post('https://gestgensuite.ak12srl.it/invioEmail',dataInvioEmail, headers)
            .subscribe(data => {

                let alert = this.alertCtrl.create({
                  title: 'Richiesta',
                  subTitle: 'Spedita con successo!',
                  buttons: ['OK']
                });
                alert.present();

                document.getElementById("listaProducts").style.display = "none";

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

  onChangeSelection(){

    this.visualizza();

  }

  groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }



}
