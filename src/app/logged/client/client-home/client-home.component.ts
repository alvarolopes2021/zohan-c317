import { Component, OnInit } from '@angular/core';
import { ServicesModel } from 'src/app/models/services.model';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(this.services);
  }

  services : ServicesModel[] = [
    {serviceId: "a", serviceDescription: "CORTE", serviceValue: "25.00"},
    {serviceId: "a", serviceDescription: "BARBA", serviceValue: "15.00"}
  ];

}
