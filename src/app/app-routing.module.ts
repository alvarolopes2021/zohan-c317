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
import { AllOrdersComponent } from './logged/adm/all-orders/all-orders.component';
import { SchedulingComponent } from './logged/common/scheduling/scheduling.component';
import { LoggedLocationComponent } from './logged/common/logged-location/logged-location.component';
import { RoleGuardService } from './services/role-guard.service';
import { Constants } from 'src/constants';
import { AuthGuardService } from './services/auth-guard.service';
import { ForbidenComponent } from './logged/common/forbiden/forbiden.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/home', data: {animation: 'HomePageAnimation'}},
  {path: 'forbiden', component: ForbidenComponent},
  {path: 'home', component: HomeComponent, data: {animation: 'HomePageAnimation'}},
  {path: 'ads', component: AdsComponent, data: {animation: 'AdsAnimation'}},
  {path: 'prices', component: PricesComponent, data: {animation: 'PricesAnimation'}},
  {path: 'location', component: LocationComponent, data: {animation: 'LocationAnimation'}},
  {path: 'signup', component: SignupComponent, data: {animation: 'SignUpAnimation'}},
  {path: 'login', component: LoginComponent},
  {path: 'logged/client', component: ClientHomeComponent, canActivate: [RoleGuardService], data: {expectedRole: Constants.Roles.USER}},
  {path: 'logged/admin', component: AdminHomeComponent, canActivate: [RoleGuardService], data: {expectedRole: Constants.Roles.ADMIN}}, 
  {path: 'logged/create-schedule', component: CreateScheduleComponent, canActivate: [RoleGuardService], data: {expectedRole: Constants.Roles.ADMIN}},
  {path: 'logged/edit-schedule', component: EditScheduleComponent, canActivate: [RoleGuardService], data: {expectedRole: Constants.Roles.ADMIN}},
  {path: 'logged/list-clients', component: ListClientsComponent, canActivate: [RoleGuardService], data: {expectedRole: Constants.Roles.ADMIN}},
  {path: 'logged/add-ads', component: AddAdsComponent, canActivate: [RoleGuardService], data: {expectedRole: Constants.Roles.ADMIN}},
  {path: 'logged/add-services', component: AddServicesComponent, canActivate: [RoleGuardService], data: {expectedRole: Constants.Roles.ADMIN}},
  {path: 'logged/profile', component: ProfileComponent, canActivate: [AuthGuardService]},
  {path: 'logged/all-orders', component: AllOrdersComponent, canActivate: [RoleGuardService], data: {expectedRole: Constants.Roles.ADMIN}},
  {path: 'logged/scheduling', component: SchedulingComponent, canActivate: [RoleGuardService], data: {expectedRole: Constants.Roles.USER}},
  {path: 'logged/location', component: LoggedLocationComponent, canActivate: [RoleGuardService], data: {expectedRole: Constants.Roles.USER}}
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
