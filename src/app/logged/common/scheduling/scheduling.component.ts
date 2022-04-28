import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, shareReplay } from 'rxjs';
import { OrdersModel } from 'src/app/models/orders.model';
import { MatSnackBar } from '@angular/material/snack-bar';


import { DayTimeModel } from 'src/app/models/dayTime.model';
import { ServicesModel } from 'src/app/models/services.model';
import { ErrorHandler } from 'src/app/services/errorHandler';
import { OrdersService } from 'src/app/services/orders.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { ServicesService } from 'src/app/services/services.service';
import { AuthService } from 'src/app/services/auth.service';
import { IconServiceService } from 'src/assets/icon-service.service';
import { Constants } from 'src/constants';
import { Router } from '@angular/router';


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

  userInfo: Map<string, string> | null = new Map<string, string>();


  form = new FormGroup({
    scheduleToInsert: new FormControl(''),
    schedule: new FormControl('', Validators.required),
    service: new FormControl('', Validators.required),
    userPhone: new FormControl('')
  });

  constructor(
    private iconsService: IconServiceService,
    private scheduleService: ScheduleService,
    private servicesService: ServicesService,
    private ordersService: OrdersService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.icons = this.iconsService.getIcons();
    this.userInfo = this.authService.getTokenInformation();
  }


  selectDiv(scheduleId: string | undefined) {
    /*
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
        let index = this.schedules.findIndex((value) => value.daytimeid === scheduleId);
        if (index !== null)
          this.selectedSchedule = this.schedules[index];
      }
      else {
        selectableDivs[i].className = "selectable-schedule";
      }
    }
    */
  }


  selectService(serviceid: string | undefined) {
    /*let selectableDivs: HTMLCollectionOf<Element> = document.getElementsByClassName("selectable-service");
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
        let index = this.services.findIndex((value) => value.serviceid === serviceid);
        if (index !== null)
          this.selectedService = this.services[index];
      }
      else {
        selectableDivs[i].className = "selectable-service";
      }
    }*/
  }

  getData() {

    if (this.selected === null || this.selected === undefined)
      return;

    if (this.selected != this.oldSelection) {
      this.oldSelection = this.selected;

      this.schedules = [];
      this.services = [];
      this.errors.clear();

      this.scheduleService.getAvailableDayTime(this.selected)?.pipe(catchError(ErrorHandler.handleError), shareReplay(1)).subscribe((value) => {

        if (value instanceof Map) {
          this.schedules = [];
          this.services = [];
          this.errors = value;
          return;
        }

        let today = new Date();
        today.setHours(new Date().getHours() - 3);
        let correctDay = today.toISOString();
        let todayDate = correctDay?.split("T")[0];
        let todayTime = correctDay?.split("T")[1].split(".")[0];

        this.schedules = <DayTimeModel[]>value;

        let availableSchedules: DayTimeModel[] = [];

        this.schedules.forEach((element) => {
          if (element.daytimeday?.split("T")[0]! > todayDate ||
            (element.daytimeday?.split("T")[0]! == todayDate && element.daytimestart! >= todayTime)) {

            availableSchedules.push(element);
          }
        });

        if (availableSchedules.length <= 0) {
          this.schedules = [];
          this.errors.set(Constants.Errors.ERROR, "Sem horários disponíveis");
          return;
        }

        this.schedules = availableSchedules;
        this.schedules.sort((a, b) => a.daytimestart!.localeCompare(b.daytimeend!));

      });

      this.servicesService.getServices()?.pipe(catchError(ErrorHandler.handleError)).subscribe((value) => {

        if (this.errors.size > 0) {
          return;
        }

        if (value instanceof Map) {
          this.errors = value;
          return;
        }

        this.services = <ServicesModel[]>value;
        this.services = this.services.sort((a, b) => a.servicedescription!.localeCompare(b.servicedescription!));
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

    let index = this.schedules.findIndex((value) => value.daytimeid === form.get("schedule")?.value);
    if (index == null)
      return;
    this.selectedSchedule = this.schedules[index];


    let service = this.services.findIndex((value) => value.serviceid === form.get("service")?.value);
    if (service == null)
      return;
    this.selectedService = this.services[service];


    let orderModel: OrdersModel = {};

    orderModel.order_userid = userInfo.get(Constants.Keys.SESSION_CLIENT_ID);
    orderModel.order_username = userInfo.get(Constants.Keys.USERNAME);
    orderModel.order_userphone = "";
    orderModel.order_iddaytime = this.selectedSchedule.daytimeid;
    orderModel.order_servicedescription = this.selectedService.servicedescription;
    orderModel.order_servicevalue = this.selectedService.servicevalue;

    if (userInfo.get(Constants.Keys.ROLE) == Constants.Roles.ADMIN) {
      if (form.get("userPhone")?.value == null || form.get("userPhone")?.value == "")
        return alert("Insira o número do cliente!")

      orderModel.order_clientcellphone = form.get("userPhone")?.value;
    }

    this.ordersService.createOrder(orderModel).pipe(catchError(ErrorHandler.handleError)).subscribe((value) => {

      if (value instanceof Map) {
        this.snackBar.open(`${value.get("ERROR")} ⛔`,
          "OK",
          { duration: 5000, panelClass: ['blue-snackbar'] }
        );
        return;
      }

      this.snackBar.open("Horário agendado ✅",
        "OK",
        { duration: 5000, panelClass: ['blue-snackbar'] }
      );

      if (userInfo?.get(Constants.Keys.ROLE) == Constants.Roles.ADMIN) {
        this.router.navigate(['logged/admin']);
        return;
      }

      this.router.navigate(['logged/orders-history']);


    });


  }

}
