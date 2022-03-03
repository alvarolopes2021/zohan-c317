import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';


import { IconServiceService } from 'src/assets/icon-service.service';
import { AuthService } from '../services/auth.service';
import { Constants } from 'src/constants';
import { User } from '../models/user.model';
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
    private authService: AuthService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.icons = this.iconService.getIcons();
  }

  async login() {

    if (this.errors.has(Constants.Errors.ERROR)) {
      this.errors.delete(Constants.Errors.ERROR);
    }

    let formValue = this.loginForm;

    if (!formValue.valid) {
      alert('Todos os campos devem ser preenchidos!');
      return;
    }

    this.isLoggingIn = true;

    let user: User = {};

    user.userPhone = formValue.get('userPhone')?.value;
    user.userPsw = formValue.get('userPsw')?.value;

    this.authService.login(user)?.pipe(catchError(ErrorHandler.handleError)).subscribe((value) => {

      if (value instanceof Map) { //if it came from ErrorHandler class, it is a Map (something went wrong in the server)
        if (value.has(Constants.Errors.ERROR)) {
          this.errors.set(Constants.Errors.ERROR, value.get(Constants.Errors.ERROR) as string);
          this.isLoggingIn = false;
          return;
        }
      }

      user = (<User>value);

      switch (user.userType) {
        case Constants.Roles.USER:
          this.router.navigate(['/logged/client']);
          this.authService.setIsLoggedIn = true;
          break;
        case Constants.Roles.BARBER:
          this.router.navigate(['/logged/barber']);
          break;
        case Constants.Roles.ADMIN:
          this.router.navigate(['/logged/admin']);
          break;
      }

    });

  }

}
