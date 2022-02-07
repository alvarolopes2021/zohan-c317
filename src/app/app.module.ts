import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { AppComponent } from './app.component';
import { HomeNavComponent } from './navs/home-nav/home-nav.component';
import { LoggedNavComponent } from './navs/logged-nav/logged-nav.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LocationComponent } from './home/location/location.component';
import { PricesComponent } from './home/prices/prices.component';
import { AdsComponent } from './home/ads/ads.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeNavComponent,
    LoggedNavComponent,
    HomeComponent,
    SignupComponent,
    LocationComponent,
    PricesComponent,
    AdsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
