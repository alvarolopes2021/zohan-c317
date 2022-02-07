import { Component, OnInit } from '@angular/core';
import { IconServiceService } from 'src/assets/icon-service.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(

    private iconService: IconServiceService

  ) { }

  icons : Map<string, any> = new Map<string, any>();

  ngOnInit(): void {
    this.icons = this.iconService.getIcons();
  }

  

}
