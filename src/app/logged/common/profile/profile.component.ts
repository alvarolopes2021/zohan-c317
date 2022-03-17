import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private authService : AuthService
  ) { }

  userInfo : Map<string, string> | null = new Map<string, string>();

  ngOnInit(): void {
    this.userInfo = this.authService.getTokenInformation();
  }

}
