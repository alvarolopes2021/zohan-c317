import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/constants';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<any> | null{
    let params : HttpParams = new HttpParams().append(Constants.Keys.ROLE, Constants.Roles.USER);
    return this.http.get<any>(Constants.HttpEndpoints.Users.GET_ALL_USERS, {params: params});        
  }

  getUserProfile(id: string): Observable<any> | null{
    let params : HttpParams = new HttpParams().append(Constants.Keys.SESSION_CLIENT_ID, id);
    return this.http.get(Constants.HttpEndpoints.Users.USER_PROFILE, {params: params} );
  }

}
