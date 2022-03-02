import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { Constants } from 'src/constants';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }

  signup(user: User): Observable<any> | null {
    if (user == null)
      return user;

    if (user.password == null)
      return null;

    user.password = btoa(user.password.toString());  //converts the password to base64  

    return this.http.post<any>(Constants.HttpEndpoints.SIGN_UP, user);

  }

  login(user: User | null): Observable<any> | null {

    if (user == null)
      return user;

    if (user.password == null || user.phone == null)
      return null;

    user.password = btoa(user.password.toString());

    return this.http.post<any>(Constants.HttpEndpoints.LOGIN, user);

  }

}
