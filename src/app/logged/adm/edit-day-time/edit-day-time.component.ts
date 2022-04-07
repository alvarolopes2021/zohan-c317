import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';


import { DayTimeModel } from 'src/app/models/dayTime.model';
import { ErrorHandler } from 'src/app/services/errorHandler';
import { ScheduleService } from 'src/app/services/schedule.service';
import { IconServiceService } from 'src/assets/icon-service.service';

@Component({
  selector: 'app-edit-day-time',
  templateUrl: './edit-day-time.component.html',
  styleUrls: ['./edit-day-time.component.css']
})
export class EditDayTimeComponent implements OnInit {

  selected?: Date;
  oldSelection?: Date;
  minDate?: Date | null = new Date();

  errors: Map<string, string> = new Map<string, string>();

  schedules: DayTimeModel[] = [];

  icons: Map<string, any> = new Map<string, any>();

  form = new FormGroup({
    scheduleToInsert: new FormControl('')
  })

  constructor(
    private daytimeService: ScheduleService,
    private iconsService: IconServiceService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.icons = this.iconsService.getIcons();
  }

  addToList() {
    if (this.selected == null || this.selected == undefined)
      return alert('Escolha um dia!');

    let timeToBeInserted = this.form.get("scheduleToInsert")?.value;

    if (String(timeToBeInserted).length <= 0)
      return alert('O horário não pode ser vazio');

    if (this.schedules.filter(e => e.dayTimePretty === timeToBeInserted).length > 0)
      return;


    this.selected.setHours(this.selected.getHours()-3);
    
    let dayTimeModel: DayTimeModel = {};
    dayTimeModel.dayTimeDay = this.selected.toISOString().split("T")[0];
    dayTimeModel.dayTimeStart = String(timeToBeInserted).split("-")[0];
    dayTimeModel.dayTimeEnd = String(timeToBeInserted).split("-")[1];
    dayTimeModel.dayTimePretty = timeToBeInserted;

    this.daytimeService.createSchedule([dayTimeModel])?.pipe(catchError(ErrorHandler.handleError)).subscribe((response) => {

      if (response instanceof Map) {
        return;
      }

      this.schedules.push(response[0]);

      this.schedules.sort((a, b) => a.dayTimePretty!.localeCompare(b.dayTimePretty!));

    });
  }

  deleteFromList(value: DayTimeModel) {
    if (this.selected == null || this.selected == undefined)
      return alert('Escolha um dia!');

    let op = confirm("Deseja deletar este horário?");

    if (!op)
      return;

    if (this.schedules.includes(value)) {
      const index: number = this.schedules.indexOf(value);
      if (index !== -1) {
        this.schedules.splice(index, 1);
        this.schedules.sort((a, b) => a.dayTimePretty!.localeCompare(b.dayTimePretty!));

        this.daytimeService.deleteDayTime(value)?.pipe(catchError(ErrorHandler.handleError)).subscribe((resp) => {
          if (resp instanceof Map) {
            return;
          }

          this.snackBar.open("Horário deletado ✅",
            "OK",
            { duration: 5000, panelClass: ['blue-snackbar'] }
          );

        });

      }
    }
  }


  editItemFromList(value: DayTimeModel) {
    let edit = "edit_";
    let span = document.getElementById(value.dayTimePretty!);
    let input = document.getElementById(edit + value.dayTimePretty) as HTMLInputElement;

    if (span !== null) {
      span.innerHTML = `<input type='text' value='${value.dayTimePretty}' id='${edit + value.dayTimePretty}' class='list-input' mask='00:00-00:00' autofocus>`;
    }
    if (input !== null) {

      //find the old value in the list
      let oldSchedule = this.schedules.find((schedule) => schedule === value);

      //if the list has the old value
      if (oldSchedule != null && oldSchedule !== undefined) {

        if (input.value !== null && input.value.length > 0) { // ensures the input is not empty          

          oldSchedule.dayTimeStart = String(input.value).split("-")[0] + ":00";
          oldSchedule.dayTimeEnd = String(input.value).split("-")[1] + ":00";
          oldSchedule.dayTimePretty = input.value;

          let index = this.schedules.indexOf(value); // gets the index of the old value

          if (index !== null && oldSchedule !== undefined) //if the old value was found and input was not empty
            this.schedules[index] = oldSchedule; //we update the list in that point

          this.daytimeService.updateSchedules(this.schedules[index])?.pipe(catchError(ErrorHandler.handleError)).subscribe((value) => {

            if (value instanceof Map) {
              return;
            }

            this.snackBar.open("Horário atualizado  ✅",
              "OK",
              { duration: 5000, panelClass: ['blue-snackbar'] }
            );


          })

          this.schedules.sort((a, b) => a.dayTimePretty!.localeCompare(b.dayTimePretty!));
        }
      }

      if (span != null)
        span.innerHTML = `<span id="${value.dayTimePretty}">${value.dayTimePretty}</span>`;
    }
  }


  getDayTime() {
    if (this.selected == null)
      return;

    if (this.oldSelection !== this.selected) {
      this.oldSelection = this.selected;

      this.daytimeService.getSchedules(this.selected)?.pipe(catchError(ErrorHandler.handleError)).subscribe((dayTimeList) => {

        if (dayTimeList instanceof Map) {
          this.schedules = [];
          return;
        }

        this.schedules = <DayTimeModel[]>dayTimeList[0];

        this.schedules = this.schedules.sort((a, b) => a.dayTimePretty!.localeCompare(b.dayTimePretty!));

      })
    }

  }

}
