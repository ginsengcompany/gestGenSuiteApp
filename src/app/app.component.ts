import { Component, ViewChild } from '@angular/core';
import {AlertController, App, Nav, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { SaldoPage } from '../pages/saldo/saldo';
import { InserimentoPage } from '../pages/inserimento/inserimento';
import { LoginPage } from "../pages/login/login";
import {ProdottiPage} from "../pages/prodotti/prodotti";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public alertCtrl: AlertController,public app : App) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home'},
      { title: 'Saldo', component: SaldoPage, icon: 'logo-usd'},
      { title: 'Inserimento', component: InserimentoPage , icon: 'archive'},
      { title: 'Prodotti', component: ProdottiPage, icon: 'logo-buffer'},
      { title: 'Log out', component: LoginPage, icon: 'exit'}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {

    let retrievedObj = JSON.parse(localStorage.getItem('storedData'));
    console.log(retrievedObj.tipo);
    console.log(page.title);

    if(page.title==="Home") {
      this.app.getRootNav().setRoot(HomePage);
    }

    if(page.title==="Inserimento") {
      this.app.getRootNav().setRoot(InserimentoPage);
    }

    if(page.title==="Prodotti") {
      this.app.getRootNav().setRoot(ProdottiPage);
    }


    if(page.title==="Saldo") {

      if(retrievedObj.tipo===false){
        let alert = this.alertCtrl.create({
          title: 'Accesso Negato',
          subTitle: 'Non hai i permessi per consultare questa pagina!',
          buttons: ['OK']
        });
        alert.present();

        this.app.getRootNav().setRoot(HomePage);
      }

      if(retrievedObj.tipo===true){

        this.nav.setRoot(page.component);

      }

    }



    if(page.title==="Log out"){
      let alert = this.alertCtrl.create({
        title: 'Logout',
        subTitle: 'Effettuato con Successo!',
        buttons: ['OK']
      });
      alert.present();
      this.app.getRootNav().setRoot(LoginPage);
    }

  }
}
