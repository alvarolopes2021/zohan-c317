import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

import { slideInAnimation } from './animations/slideAnimation';
import { UtilService } from './utils/util.service';
import { Constants } from 'src/constants';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})

export class AppComponent implements OnInit {

  title = 'Zohan - Barber Shop';


  isLoggedIn?: boolean;

  constructor(
    private authService: AuthService,
    private router : Router
  ) { }

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((value) => this.isLoggedIn = value ); // {2}
    this.checkIsLoggedIn();
  }

  async checkIsLoggedIn() {
    let token = UtilService.getFromLocalStorage(Constants.Auth.TOKEN);
    if (token != null && token.length > 0) {
      this.authService.setIsLoggedIn = true;
      this.router.navigate(['/logged/client']);
      return;
    }
    this.router.navigate(['/login']);
  }

}
