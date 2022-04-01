import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { OrdersModel } from 'src/app/models/orders.model';


import { DayTimeModel } from 'src/app/models/dayTime.model';
import { ServicesModel } from 'src/app/models/services.model';
import { ErrorHandler } from 'src/app/services/errorHandler';
import { OrdersService } from 'src/app/services/orders.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ServicesService } from 'src/app/services/services.service';
import { AuthService } from 'src/app/services/auth.service';
import { IconServiceService } from 'src/assets/icon-service.service';
import { Constants } from 'src/constants';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SchedulingComponent implements OnInit {

  selected?: Date | null;
  oldSelection?: Date | null;
  minDate?: Date | null = new Date();

  readonly CONSTANTS = Constants;

  errors: Map<string, string> = new Map<string, string>();

  icons: Map<string, any> = new Map<string, any>();

  services: ServicesModel[] = [];
  schedules: DayTimeModel[] = [];

  selectedService: ServicesModel = {};
  selectedSchedule: DayTimeModel = {};


  form = new FormGroup({
    scheduleToInsert: new FormControl(''),
    schedule: new FormControl('', Validators.required),
    service: new FormControl('', Validators.required)
  });

  constructor(
    private iconsService: IconServiceService,
    private scheduleService: ScheduleService,
    private servicesService: ServicesService,
    private ordersService: OrdersService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.icons = this.iconsService.getIcons();
  }

  selectDiv(scheduleId: string | undefined) {
    let selectableDivs: HTMLCollectionOf<Element> = document.getElementsByClassName("selectable-schedule");
    let selectedDiv: HTMLCollectionOf<Element> = document.getElementsByClassName("selected-div");

    //CLEARS ALL SELECTED DIVs
    if (selectedDiv !== null && selectedDiv !== undefined) {
      for (let i = 0; i < selectedDiv.length; i++) {
        selectedDiv[i].className = "selectable-schedule";
      }
    }

    //STARTS LOOKING FOR THE SELECTED DIV
    for (let i = 0; i < selectableDivs.length; i++) {
      if (selectableDivs[i].id === scheduleId) {
        selectableDivs[i].className = "selected-div";
        let index = this.schedules.findIndex((value) => value.dayTimeId === scheduleId);
        if (index !== null)
          this.selectedSchedule = this.schedules[index];
      }
      else {
        selectableDivs[i].className = "selectable-schedule";
      }
    }
  }

  selectService(serviceid: string | undefined) {
    let selectableDivs: HTMLCollectionOf<Element> = document.getElementsByClassName("selectable-service");
    let selectedDiv: HTMLCollectionOf<Element> = document.getElementsByClassName("selected-service");

    //CLEARS ALL SELECTED SERVICES
    if (selectedDiv !== null && selectedDiv !== undefined) {
      for (let i = 0; i < selectedDiv.length; i++) {
        selectedDiv[i].className = "selectable-service";
      }
    }

    //STARTS LOOKING FOR THE SELECTED SERVICE
    for (let i = 0; i < selectableDivs.length; i++) {
      if (selectableDivs[i].id === serviceid) {
        selectableDivs[i].className = "selected-service";
        let index = this.services.findIndex((value) => value.serviceId === serviceid);
        if (index !== null)
          this.selectedService = this.services[index];
      }
      else {
        selectableDivs[i].className = "selectable-service";
      }
    }
  }

  getData() {
    if (this.selected === null || this.selected === undefined)
      return;

    if (this.selected != this.oldSelection) {
      this.oldSelection = this.selected;

      this.schedules = [];
      this.services = [];
      this.errors.clear();

      this.scheduleService.getSchedules(this.selected)?.pipe(catchError(ErrorHandler.handleError)).
        subscribe((value) => {

          if (value instanceof Map) {
            this.errors = value;
            return;
          }

          this.schedules = <DayTimeModel[]>value[0];
          this.schedules = this.schedules.sort((a, b) => a.dayTimeStart!.localeCompare(b.dayTimeEnd!));

        });

      this.servicesService.getServices()?.pipe(catchError(ErrorHandler.handleError)).subscribe((value) => {

        if (this.errors.size > 0) {
          return;
        }

        if (value instanceof Map) {
          this.errors = value;
          return;
        }

        this.services = <ServicesModel[]>value[0];
        this.services = this.services.sort((a, b) => a.serviceDescription!.localeCompare(b.serviceDescription!));
      });

    }
  }

  createOrder() {
    if (this.selected == null || this.selected == undefined)
      return alert("Escolha um dia!");

    let form = this.form;
    if (!form.valid) {

      if (form.get("schedule")?.invalid)
        return alert("Escolha um horário!");

      if (form.get("service")?.invalid)
        return alert("Escolha um serviço");

      return alert("Selecione algum serviço");
    }

    let userInfo: Map<string, string> | null = this.authService.getTokenInformation();

    if (userInfo == null)
      return;


    let orderModel: OrdersModel = {};

    orderModel.orderDate = this.selected;
    orderModel.order_clientId = userInfo.get(Constants.Keys.SESSION_CLIENT_ID);
    orderModel.order_scheduleId = this.selectedSchedule.dayTimeId;
    orderModel.order_serviceId = this.selectedService.serviceId;

    this.ordersService.createOrder(orderModel).pipe(catchError(ErrorHandler.handleError)).subscribe((value) => {

      if (value instanceof Map) {
        return;
      }

      console.log(value);


    });


  }

}
