import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs';
import { ServicesModel } from 'src/app/models/services.model';
import { ErrorHandler } from 'src/app/services/errorHandler';
import { ServicesService } from 'src/app/services/services.service';
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

  icons: Map<string, any> = new Map<string, any>();

  services: ServicesModel[] = [];

  constructor(
    private iconService: IconServiceService,
    private servicesService : ServicesService
  ) { }


  ngOnInit(): void {
    this.icons = this.iconService.getIcons();
  }

  addToList() {
    let serviceModel: ServicesModel = {};

    serviceModel.serviceId = (this.services.length + 1).toString();
    serviceModel.serviceDescription = "CORTE";
    serviceModel.serviceValue = "R$25.00"

    let nextId = 0;
    if (this.services.length > 0) {
      let lastId = this.services[this.services.length - 1].serviceId;

      if (lastId != null && lastId != undefined) {
        nextId = parseInt(lastId) + 1;
        serviceModel.serviceId = nextId.toString();
      }
    }

    this.services.push(serviceModel);
  }

  deleteFromList(item: ServicesModel) {
    if (this.services.includes(item)) {
      let index = this.services.indexOf(item);
      if (index != -1)
        this.services.splice(index, 1);
    }
  }

  editItemInList(item: ServicesModel) {
    let editDescription = "description_";
    let editValue = "value_";

    if (item.serviceId !== undefined) {

      let descriptionById = document.getElementById(editDescription + item.serviceId) as HTMLInputElement;
      let valueById = document.getElementById(editValue + item.serviceId) as HTMLInputElement;

      if (descriptionById != null && descriptionById !== undefined && valueById !== null && valueById != undefined) {

        let index = this.services.indexOf(item);
        if (index != -1) {
          this.services[index].serviceDescription = descriptionById.value;
          this.services[index].serviceValue = valueById.value;
        }
      }

      let descriptionSpan = document.getElementsByClassName("description") as HTMLCollection;
      let valueSpan = document.getElementsByClassName("value") as HTMLCollection;

      if (descriptionSpan !== null && valueSpan !== null) {
        for (let i = 0; i < descriptionSpan.length; i++) {
          console.log(descriptionSpan[i].id);
          if (descriptionSpan[i].id.toString() === item.serviceId) {

            if (descriptionById != null && descriptionById !== undefined && valueById !== null && valueById != undefined) {
              descriptionSpan[i].innerHTML = `<span id="${item.serviceId}" class="description">${item.serviceDescription}</span>`;

              valueSpan[i].innerHTML = `<span id="${item.serviceId}" class="value">${item.serviceValue}</span>`;

              return;
            }

            descriptionSpan[i].innerHTML =
              `<input type='text' value='${item.serviceDescription}' id='${editDescription + item.serviceId}'>`;

            valueSpan[i].innerHTML =
              `<input type='text' value='${item.serviceValue}' id='${editValue + item.serviceId}'>`;
          }
        }
      }
    }
  }

  addServices() {
    this.servicesService.insertServices(this.services)?.pipe(catchError(ErrorHandler.handleError)).subscribe((value) => {
      console.log(value);
    });
  }


}
