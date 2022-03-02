import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';


import { IconServiceService } from 'src/assets/icon-service.service';
import { AuthService } from '../services/auth.service';
import { Constants } from 'src/constants';
import { User } from '../models/user.model';
import { catchError } from 'rxjs';
import { ErrorHandler } from '../services/errorHandler';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

  /* FLAGS */

  isSigningUp: boolean = false;

  readonly CONSTANTS = Constants;

  mode: ProgressSpinnerMode = 'indeterminate';

  errors: Map<string, string> = new Map<string, string>();

  icons: Map<string, any> = new Map<string, any>();

  signupForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    userPhone: new FormControl('', [Validators.required]),
    userPsw: new FormControl('', [Validators.required, Validators.min(6)]),
    userConfirmPsw: new FormControl('', [Validators.required, Validators.min(6)]),
  });

  constructor(
    private iconService: IconServiceService,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.icons = this.iconService.getIcons();
  }

  async signup() {

    const formValue = this.signupForm;


    if (formValue.valid) {

      if (formValue.get('userPsw')?.value != formValue.get('userConfirmPsw')?.value) {
        this.errors.set(Constants.Errors.PASSWORD_DONT_MATCH, 'As senhas não batem');
        return;
      }

      this.isSigningUp = true;

      let user = new User();

      user.username = formValue.get('userName')?.value;
      user.phone = formValue.get('userPhone')?.value
      user.password = formValue.get('userPsw')?.value
      user.type = Constants.Roles.USER;

      this.authService.signup(user)?.pipe(catchError(ErrorHandler.handleError)).subscribe((value) => {

        if(value instanceof Map){
          if(value.has(Constants.Errors.ERROR)){
            this.errors.set(Constants.Errors.ERROR, value.get(Constants.Errors.ERROR));
          }
        }

        this.isSigningUp = false;
      });

    }
    else
      alert('Todos os campos precisam ser preenchidos!');

  }


}
