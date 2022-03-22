import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
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
import { ListClientsComponent } from './logged/adm/list-clients/list-clients.component';
import { AddAdsComponent } from './logged/adm/add-ads/add-ads.component';
import { ProfileComponent } from './logged/common/profile/profile.component';
import { AddServicesComponent } from './logged/adm/add-services/add-services.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home', data: {animation: 'HomePageAnimation'}},
  {path: 'home', component: HomeComponent, data: {animation: 'HomePageAnimation'}},
  {path: 'ads', component: AdsComponent, data: {animation: 'AdsAnimation'}},
  {path: 'prices', component: PricesComponent, data: {animation: 'PricesAnimation'}},
  {path: 'location', component: LocationComponent, data: {animation: 'LocationAnimation'}},
  {path: 'signup', component: SignupComponent, data: {animation: 'SignUpAnimation'}},
  {path: 'login', component: LoginComponent},
  {path: 'logged/client', component: ClientHomeComponent},
  {path: 'logged/location', component: LocationComponent},
  {path: 'logged/admin', component: AdminHomeComponent}, 
  {path: 'logged/create-schedule', component: CreateScheduleComponent},
  {path: 'logged/edit-schedule', component: EditScheduleComponent},
  {path: 'logged/list-clients', component: ListClientsComponent},
  {path: 'logged/add-ads', component: AddAdsComponent},
  {path: 'logged/add-services', component: AddServicesComponent},
  {path: 'logged/profile', component: ProfileComponent}
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
