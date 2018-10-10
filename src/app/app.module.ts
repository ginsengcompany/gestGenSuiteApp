import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { CalendarModule } from "ion2-calendar";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SaldoPage } from '../pages/saldo/saldo';
import { InserimentoPage } from '../pages/inserimento/inserimento';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from "../pages/login/login";
import { HttpClientModule } from "@angular/common/http";
import {Camera} from "@ionic-native/camera";

import { IonCurrencyMaskModule } from '@pluritech/ion-currencymask';
import {ProdottiPage} from "../pages/prodotti/prodotti";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SaldoPage,
    InserimentoPage,
    ProdottiPage,
    LoginPage
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    IonCurrencyMaskModule,
    IonicModule.forRoot(MyApp),
    CalendarModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SaldoPage,
    InserimentoPage,
    ProdottiPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: LOCALE_ID, useValue: "it-IT" },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
