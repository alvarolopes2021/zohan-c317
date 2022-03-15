import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { AppComponent } from './app.component';
import { HomeNavComponent } from './navs/home-nav/home-nav.component';
import { LoggedNavComponent } from './navs/logged-nav/logged-nav.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LocationComponent } from './home/location/location.component';
import { PricesComponent } from './home/prices/prices.component';
import { AdsComponent } from './home/ads/ads.component';
import { LoginComponent } from './login/login.component';
import { ClientHomeComponent } from './logged/client/client-home/client-home.component';
import { AdminHomeComponent } from './logged/adm/admin-home/admin-home.component';
import { CreateScheduleComponent } from './logged/adm/create-schedule/create-schedule.component';
import { EditScheduleComponent } from './logged/adm/edit-schedule/edit-schedule.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeNavComponent,
    LoggedNavComponent,
    HomeComponent,
    SignupComponent,
    LocationComponent,
    PricesComponent,
    AdsComponent,
    LoginComponent,
    ClientHomeComponent,
    AdminHomeComponent,
    CreateScheduleComponent,
    EditScheduleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
