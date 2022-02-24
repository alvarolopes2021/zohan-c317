import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from 'src/constants';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  signup(user: User): Observable<User> | null {
    if (user == null)
      return user;

    if (user.password == null)
      return null;

    user.password = btoa(user.password.toString());  //converts the password to base64  
        
    return this.http.post<User>(Constants.HttpEndpoints.SIGN_UP, user);

  }

  login(user: User): Observable<User> | null {
    if(user == null)
      return user;

    if (user.password == null || user.phone == null)
      return null;

    user.password = btoa(user.password.toString());

    return this.http.post<User>(Constants.HttpEndpoints.LOGIN, user);
  }
  
}
