import { Component, OnInit } from '@angular/core';
import { IconServiceService } from 'src/assets/icon-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Constants } from 'src/constants';

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

  errors : Map<string,string> = new Map<string, string>();

  signupForm = new FormGroup({
    userName: new FormControl('', [Validators.required]),
    userPhone: new FormControl('', [Validators.required]),
    userPsw: new FormControl('', [Validators.required, Validators.min(6)]),
    userConfirmPsw: new FormControl('', [Validators.required, Validators.min(6)]),
  });



  signup(){
    const formValue = this.signupForm;

    if(formValue.get('userName')?.valid && formValue.get('userPsw')?.valid){
      let newPsw = btoa(formValue.get('userPsw')?.value);  //converts the password to base64

    }

    if(!formValue.get('userName')?.valid){
       

    }

  }
  

}
