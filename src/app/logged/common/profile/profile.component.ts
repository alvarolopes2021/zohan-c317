import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {


  userInfo : Map<string, string> | null = new Map<string, string>();

  willChangePassword : boolean = false;
  
  form : FormGroup = new FormGroup({
    willChangePassword: new FormControl(false)
  })

  constructor(
    private authService : AuthService
  ) { }


  ngOnInit(): void {
    this.userInfo = this.authService.getTokenInformation();
  }

  changePassword(){
    
  }

}
