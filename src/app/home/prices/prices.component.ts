import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { catchError } from 'rxjs';
import { ServicesModel } from 'src/app/models/services.model';
import { ErrorHandler } from 'src/app/services/errorHandler';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PricesComponent implements OnInit {

  services: ServicesModel[] = [];

  constructor(private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.servicesService.getServices()?.pipe(catchError(ErrorHandler.handleError)).subscribe((value)=> {

      if(value instanceof Map){
        return;
      }     

      this.services = <ServicesModel[]>value;
    });    
  }

}
