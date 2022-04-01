import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandler } from 'src/app/services/errorHandler';
import { UserService } from 'src/app/services/user.service';
import { Constants } from 'src/constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {


  userInfo : Map<string, string> | null = new Map<string, string>();

  userModel : UserModel = {};

  willChangePassword : boolean = false;
  
  form : FormGroup = new FormGroup({
    willChangePassword: new FormControl(false)
  })

  constructor(
    private authService : AuthService,
    private userService: UserService
  ) { }


  ngOnInit(): void {
    this.userInfo = this.authService.getTokenInformation();
    
    if(this.userInfo != null && this.userInfo != undefined){
      let userId = this.userInfo.get(Constants.Keys.SESSION_CLIENT_ID);

      if(userId != null && userId != undefined)
        this.userService.getUserProfile(userId)?.pipe(catchError(ErrorHandler.handleError)).subscribe((user)=>{

          if(user instanceof Map){
            return;
          }
          this.userModel = <UserModel>user;

          let username = this.userInfo?.get(Constants.Keys.USERNAME);

          if(username != null && username != undefined)
            this.userModel.userName = username;

        });
    }    
  }

  changePassword(){
    
  }

}
