import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Constants } from 'src/constants';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers(): Observable<any> | null {
    let params: HttpParams = new HttpParams().append(Constants.Keys.ROLE, Constants.Roles.USER);
    return this.http.get<any>(Constants.HttpEndpoints.Users.GET_ALL_USERS, { params: params });
  }

  getUserProfile(id: string): Observable<any> | null {
    let params: HttpParams = new HttpParams().append(Constants.Keys.SESSION_CLIENT_ID, id);
    return this.http.get(Constants.HttpEndpoints.Users.USER_PROFILE, { params: params });
  }

  updateUserProfile(user: UserModel) {
    if (user == null || user == undefined)
      return;

    if (user.userpsw != null && user.newpsw != null) {
      user.userpsw = btoa(user.userpsw!);
      user.newpsw = btoa(user.newpsw!);
    }

    return this.http.put(Constants.HttpEndpoints.Users.UPDATE_USER_PROFILE, user);
  }

  deleteAccount(user: UserModel): Observable<any> | null {
    return this.http.delete(Constants.HttpEndpoints.Users.DELETE_ACCOUNT, { body: user });
  }

}
