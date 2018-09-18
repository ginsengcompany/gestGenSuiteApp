import { Component } from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public  info;
  public nome;
  public cognome;
  public image;
  public nomeazz;
  public indirizzo;
  public recapito;


  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public http:HttpClient,private sanitizer: DomSanitizer) {

    let retrievedObj = JSON.parse(localStorage.getItem('storedData'));

    this.nome = retrievedObj.nome;
    this.cognome = retrievedObj.cognome;


    this.getStruttura(retrievedObj);


    this.menuCtrl.enable(true, 'myMenu');

  }

  getStruttura(retrievedObj) : void{

    let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


    let data = JSON.stringify({struttura: retrievedObj.struttura});

    this.http.post('http://192.168.125.38:3000/getStruttura',data, headers)
      .subscribe(data => {
          let a = JSON.stringify(data);
          let b= JSON.parse(a);
          this.image = b.id.img;
          this.nomeazz = b.id.nome;
          this.indirizzo =  b.id.indirizzo;
          this.recapito = b.id.recapito;
        },
        err => {
          console.log('Error: ' + err.error);
          console.log('Name: ' + err.name);
          console.log('Message: ' + err.message);
          console.log('Status: ' + err.status);
        });

  }

  getImgContent(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(this.image);
  }

}
