import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LocationComponent } from './home/location/location.component';
import { PricesComponent } from './home/prices/prices.component';
import { AdsComponent } from './home/ads/ads.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home', data: {animation: 'HomePageAnimation'}},
  {path: 'home', component: HomeComponent, data: {animation: 'HomePageAnimation'}},
  {path: 'ads', component: AdsComponent, data: {animation: 'AdsAnimation'}},
  {path: 'prices', component: PricesComponent, data: {animation: 'PricesAnimation'}},
  {path: 'location', component: LocationComponent, data: {animation: 'LocationAnimation'}},
  {path: 'signup', component: SignupComponent, data: {animation: 'SignUpAnimation'}},
  {path: 'login', component: LoginComponent}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
