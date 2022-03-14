import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

import { slideInAnimation } from './animations/slideAnimation';
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
    let token = this.authService.getTokenInformation();

    if (token != null && token.size > 0) {
      this.authService.setIsLoggedIn = true;

      switch (token.get(Constants.Keys.ROLE)){
        case Constants.Roles.USER:
          this.router.navigate(['/logged/client']);
          break;
        case Constants.Roles.BARBER:
          this.router.navigate(['/logged/barber']);
          break;
        case Constants.Roles.ADMIN:
          this.router.navigate(['/logged/admin']);
          break;
        default:
          this.router.navigate(['/login']);
          break;
      }

      return;
    }
    
  }

}
