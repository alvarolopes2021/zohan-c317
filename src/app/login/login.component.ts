import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IconServiceService } from 'src/assets/icon-service.service';
import { AuthService } from '../services/auth.service';
import { Constants } from 'src/constants';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  /* FLAGS */

  isSigningUp: boolean = false;


  errors: Map<string, string> = new Map<string, string>();

  icons: Map<string, any> = new Map<string, any>();

  loginForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
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

    this.authService.login(null);

  }

}
