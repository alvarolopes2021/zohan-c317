import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

import { Constants } from 'src/constants';
import { UserModel } from '../models/user.model';
import { UtilService } from '../utils/util.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

  constructor(
    private http: HttpClient,
    private router : Router
  ) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable(); // {2}
  }
  
  public set setIsLoggedIn(value : boolean){
    this.loggedIn.next(value);
  }


  signup(user: UserModel): Observable<any> | null {
    if (user == null)
      return user;

    if (user.userPsw == null)
      return null;

    user.userPsw = btoa(user.userPsw.toString());  //converts the password to base64  

    return this.http.post<any>(Constants.HttpEndpoints.SIGN_UP, user);

  }

  login(user: UserModel | null): Observable<UserModel> | null {

    if (user == null)
      return user;

    if (user.userPsw == null || user.userPhone == null)
      return null;

    user.userPsw = btoa(user.userPsw.toString());

    return this.http.post<UserModel>(Constants.HttpEndpoints.LOGIN, user, {withCredentials: true });

  }

  logout(){
    UtilService.removeFromLocalStorage(Constants.Auth.TOKEN);
    this.router.navigate(['/login']);
    this.setIsLoggedIn = false;
  }

}
