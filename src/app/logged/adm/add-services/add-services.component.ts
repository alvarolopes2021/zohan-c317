import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';

import { ServicesModel } from 'src/app/models/services.model';
import { ErrorHandler } from 'src/app/services/errorHandler';
import { ServicesService } from 'src/app/services/services.service';
import { IconServiceService } from 'src/assets/icon-service.service';

@Component({
  selector: 'app-add-services',
  templateUrl: './add-services.component.html',
  styleUrls: ['./add-services.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AddServicesComponent implements OnInit {

  form = new FormGroup({
    serviceToInsert: new FormControl('')
  })

  icons: Map<string, any> = new Map<string, any>();

  services: ServicesModel[] = [];

  constructor(
    private iconService: IconServiceService,
    private servicesService: ServicesService,
    private snackBar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.icons = this.iconService.getIcons();
    this.servicesService.getServices()?.pipe(catchError(ErrorHandler.handleError)).subscribe((services)=> {
      if(services instanceof Map){
        return;
      }

      this.services = <ServicesModel[]>services[0]
    })
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

    this.servicesService.insertServices([serviceModel])?.pipe(catchError(ErrorHandler.handleError)).subscribe((service) => {

      if (service instanceof Map) {
        return;
      }

      this.services.push(<ServicesModel>service[0]);

    })

  }

  deleteFromList(item: ServicesModel) {

    let op = confirm("Deseja deletar este serviço?");

    if(!op)
      return;

    if (this.services.includes(item)) {
      let index = this.services.indexOf(item);
      if (index != -1) {

        this.servicesService.deleteService([item.serviceId!])?.pipe(catchError(ErrorHandler.handleError)).subscribe((service) => {

          if (service instanceof Map) {
            return;
          }

          this.services.splice(index, 1);

        });

      }
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

          let copy = this.services[index];
          copy.serviceDescription = descriptionById.value;
          copy.serviceValue = valueById.value;

          this.servicesService.updateService(copy)?.pipe(catchError(ErrorHandler.handleError)).subscribe((value) => {

            if(value instanceof Map){
              return;
            }

            this.services[index].serviceDescription = descriptionById.value;
            this.services[index].serviceValue = valueById.value;

          })
        }
      }

      let descriptionSpan = document.getElementsByClassName("description") as HTMLCollection;
      let valueSpan = document.getElementsByClassName("value") as HTMLCollection;

      if (descriptionSpan !== null && valueSpan !== null) {

        for (let i = 0; i < descriptionSpan.length; i++) {
          
          if (descriptionSpan[i].id.toString() === item.serviceId) {

            if (descriptionById != null && descriptionById !== undefined && valueById !== null && valueById != undefined) {
              descriptionSpan[i].innerHTML = `<span id="${item.serviceId}" class="description">${item.serviceDescription}</span>`;

              valueSpan[i].innerHTML = `<span id="${item.serviceId}" class="value">${item.serviceValue}</span>`;

              return;
            }

            descriptionSpan[i].innerHTML =
              `<input type='text' value='${item.serviceDescription}' id='${editDescription + item.serviceId}' class='description'>`;

            valueSpan[i].innerHTML =
              `<input type='text' value='${item.serviceValue}' id='${editValue + item.serviceId}' class='value'>`;
          }
        }

      }
    }
  }

  addServices() {
    this.servicesService.insertServices(this.services)?.pipe(catchError(ErrorHandler.handleError)).subscribe((value) => {
      if (value instanceof Map) {
        return;
      }

      this.snackBar.open("Serviços cadastrados com sucesso ✅",
        "OK",
        { duration: 5000, panelClass: ['blue-snackbar'] }
      );

    });
  }


}
