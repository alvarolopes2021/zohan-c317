import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IconServiceService } from 'src/assets/icon-service.service';
import { AuthService } from '../services/auth.service';
import { Constants } from 'src/constants';
import { User } from '../models/user.model';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { catchError } from 'rxjs';
import { ErrorHandler } from '../services/errorHandler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /* FLAGS */

  isLoggingIn: boolean = false;

  mode: ProgressSpinnerMode = 'indeterminate';

  readonly CONSTANTS = Constants;

  errors: Map<string, string> = new Map<string, string>();

  icons: Map<string, any> = new Map<string, any>();

  loginForm = new FormGroup({
    userPhone: new FormControl('', [Validators.required]),
    userPsw: new FormControl('', [Validators.required, Validators.min(6)]),
  });

  constructor(
    private iconService: IconServiceService,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.icons = this.iconService.getIcons();
  }

  async login() {
    
    if(this.errors.has(Constants.Errors.ERROR)){
      this.errors.delete(Constants.Errors.ERROR);
    }

    let formValue = this.loginForm;

    if(!formValue.valid){
      alert('Todos os campos devem ser preenchidos!');
      return;
    }

    this.isLoggingIn = true;

    let user: User = new User();

    user.phone = formValue.get('userPhone')?.value;
    user.password = formValue.get('userPsw')?.value;

    this.authService.login(user)?.pipe(catchError(ErrorHandler.handleError)).subscribe((value) => {

      if(value instanceof Map){ //if it came from ErrorHandler class, it is a Map (something went wrong in the server)
        if(value.has(Constants.Errors.ERROR)){
          this.errors.set(Constants.Errors.ERROR, value.get(Constants.Errors.ERROR));
        }
      }

      this.isLoggingIn = false;
    });

  }

}
