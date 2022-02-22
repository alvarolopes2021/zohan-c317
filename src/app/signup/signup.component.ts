import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';


import { IconServiceService } from 'src/assets/icon-service.service';
import { AuthService } from '../services/auth.service';
import { Constants } from 'src/constants';
import { User } from '../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {

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

      let user = new User();

      user.username = formValue.get('userName')?.value;
      user.phone = formValue.get('userPhone')?.value
      user.password = formValue.get('userPsw')?.value
      user.type = Constants.Roles.USER;

      let response = this.authService.signup(user)?.subscribe((value) => {
        console.log(value);
      });


      if (response == null) {
        console.log('')
      }

    }

    else
      alert('todos os campos precisam ser preenchidos');

    if (!formValue.get('userName')?.valid)
      this.errors.set(Constants.Errors.USERNAME_EMPTY, 'O usuário não pode ser vazio');

    if (!formValue.get('userPhone')?.valid)
      this.errors.set(Constants.Errors.USER_PHONE_EMPTY, 'O telefone não pode ser vazio');

    if (!formValue.get('userPsw')?.valid)
      this.errors.set(Constants.Errors.PASSWORD_EMPTY, 'A senha não pode ser vazia');

  }

  phoneMask(){
    
  }


}
