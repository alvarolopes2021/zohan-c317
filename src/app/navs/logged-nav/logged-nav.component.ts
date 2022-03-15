import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { IconServiceService } from 'src/assets/icon-service.service';
import { Constants } from 'src/constants';
import { UtilService } from '../../utils/util.service';

@Component({
  selector: 'app-logged-nav',
  templateUrl: './logged-nav.component.html',
  styleUrls: ['./logged-nav.component.css']
})

export class LoggedNavComponent implements OnInit {

  icons: Map<string, any> = new Map<string, any>();

  userInfo: Map<string, string> | null = new Map<string, string>();

  readonly CONSTANTS = Constants;

  constructor(
    private iconService : IconServiceService,
    private authService : AuthService
  ) {}

  ngOnInit(): void {
    this.icons = this.iconService.getIcons();
    this.userInfo = this.authService.getTokenInformation();        
  }

  logout(){
    let willLogout = confirm('Você tem cerrteza que deseja SAIR?');
    if(willLogout)
      this.authService.logout();
  }

}
