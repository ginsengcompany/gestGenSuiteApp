import { Component } from '@angular/core';
import {AlertController, MenuController, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Camera, CameraOptions  } from '@ionic-native/camera';
import {FormBuilder, Validators} from "@angular/forms";


@Component({
  selector: 'page-inserimento',
  templateUrl: 'inserimento.html'
})
export class InserimentoPage {

  public retrievedObj;
  public tipo;
  public modalita;
  public cliente;
  public descrizione;
  public today;
  public price;
  public foto;
  public modeKeys;

  public formTest;



  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public http:HttpClient, public alertCtrl: AlertController,public camera: Camera,private formBuilder: FormBuilder) {

    this.price = 0;

    this.formTest = formBuilder.group({
      maskMoney: ['', Validators.required]
    });

    let dt = new Date();
    dt.setHours( dt.getHours() + 2 );

    this.today = dt.toISOString();

    this.retrievedObj = JSON.parse(localStorage.getItem('storedData'));

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


  takePhoto(sourceType:number) {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType:sourceType,
    };

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.foto = base64Image;
    }, (err) => {
      // Handle error
    });
  }


  salva (){

    let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


    let data = JSON.stringify({"data": this.today, "tipo":this.tipo, "modalita": this.modalita, "cliente": this.cliente, "importo" : this.price, "foto" : this.foto,"descrizione" : this.descrizione , "utente":this.retrievedObj.username, "struttura":this.retrievedObj.struttura});

    this.http.post('https://gestgensuite.ak12srl.it/salvaSaldo',data, headers)
      .subscribe(data => {
          console.log(data);
          let a = JSON.stringify(data);
          let b = JSON.parse(a);
          if(b===true){
            let alert = this.alertCtrl.create({
              title: 'Salvataggio',
              subTitle: 'Effettuato con Successo!',
              buttons: ['OK']
            });
            alert.present();
            this.navCtrl.setRoot(HomePage,{'info':b.id});
          }
          else if(b===false){
            let alert = this.alertCtrl.create({
              title: 'Attenzione!',
              subTitle: 'Inserire i dati correttamente!',
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

  };

  presentPrompt() {
    let alert = this.alertCtrl.create({
      title: 'Aggiungi Cliente',
      inputs: [
        {
          name: 'cliente',
          placeholder: 'Cliente'
        }
      ],
      buttons: [
        {
          text: 'Annulla',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Salva',
          handler: data => {
            if (data.cliente) {

              let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


              let data1 = JSON.stringify({"value": data.cliente, "struttura":this.retrievedObj.struttura});

              this.http.post('https://gestgensuite.ak12srl.it/salvaCliente',data1, headers)
                .subscribe(data => {
                    console.log(data);
                    let a = JSON.stringify(data);
                    let b = JSON.parse(a);
                    if(b===true){
                      let alert = this.alertCtrl.create({
                        title: 'Salvataggio',
                        subTitle: 'Effettuato con Successo!',
                        buttons: ['OK']
                      });
                      alert.present();
                      this.navCtrl.setRoot(this.navCtrl.getActive().component);
                    }
                    else if(b===false){
                      let alert = this.alertCtrl.create({
                        title: 'Attenzione!',
                        subTitle: 'Inserire i dati correttamente!',
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

            } else {

              return false;
            }
          }
        }
      ]
    });
    alert.present();
  };

}
