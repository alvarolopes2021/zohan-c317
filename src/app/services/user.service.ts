import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/constants';

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

}
