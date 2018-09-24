import { Component } from '@angular/core';
import {MenuController, NavController} from 'ionic-angular';
import {HomePage} from "../home/home";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

  username:string;
  password:string;
  admin:boolean;
  passwordType:string = 'password';
  passwordShown:boolean = false;

  constructor(public navCtrl: NavController, public menuCtrl: MenuController, public http:HttpClient, public alertCtrl: AlertController) {

    this.admin = false;
    this.menuCtrl.enable(false, 'myMenu');

  }

  login() {

    let headers = { headers: new HttpHeaders().set('Content-Type', 'application/json') };


    let data = JSON.stringify({"username": this.username, "password":this.password, "admin": this.admin});

    this.http.post('https://gestgensuite.ak12srl.it/loginApp',data, headers)
      .subscribe(data => {
          let a = JSON.stringify(data);
          let b = JSON.parse(a);
          if(b.errore===false){
            window.localStorage.setItem('storedData', JSON.stringify(b.id));
            this.navCtrl.setRoot(HomePage);
          }
          else if(b.errore===true){
            let alert = this.alertCtrl.create({
              title: 'Attenzione!',
              subTitle: 'Inserire le credenziali correttamente!',
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

  togglePassword(){
    if(this.passwordShown){

      this.passwordShown = false;
      this.passwordType = 'password';

    }
    else {

      this.passwordShown = true;
      this.passwordType = 'text';

    }
  }

}
