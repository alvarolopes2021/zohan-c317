import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServicesModel } from 'src/app/models/services.model';
import { IconServiceService } from 'src/assets/icon-service.service';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css']
})
export class AddServicesComponent implements OnInit {

  form = new FormGroup({
    serviceToInsert: new FormControl('')
  })
  
  icons : Map<string, any> = new Map<string, any>();

  services: ServicesModel[] = [];

  constructor(private iconService: IconServiceService){}


  ngOnInit(): void {
    this.icons = this.iconService.getIcons();
  }

  addToList(){
    let serviceModel: ServicesModel = {};
    serviceModel.serviceId = (this.services.length + 1).toString();
    serviceModel.serviceDescription = "CORTE";
    serviceModel.serviceValue = "R$25.00"    
    this.services.push(serviceModel);
  }

  addServices(){

  }


}
