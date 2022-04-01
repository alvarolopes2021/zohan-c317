import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs';

import { ErrorHandler } from '../../../services/errorHandler';
import { DayTimeModel } from 'src/app/models/dayTime.model';
import { ScheduleService } from 'src/app/services/schedule.service';
import { IconServiceService } from 'src/assets/icon-service.service';
import { Constants } from 'src/constants';
import { EditDayTimeActionModel } from 'src/app/models/edit-dayTime-action.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditScheduleComponent implements OnInit {

  selected?: Date;
  oldSelection?: Date;
  minDate?: Date | null = new Date();

  schedules: DayTimeModel[] = [];

  icons: Map<string, any> = new Map<string, any>();

  errors: Map<string, string> = new Map<string, string>();

  editionActions: EditDayTimeActionModel[] = [];

  readonly CONSTANTS = Constants;

  form = new FormGroup({
    scheduleToInsert: new FormControl('')
  })

  constructor(
    private iconService: IconServiceService,
    private scheduleService: ScheduleService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.icons = this.iconService.getIcons();
  }

  addToList() {
    if (this.selected === null || this.selected === undefined)
      return alert('Escolha um dia');

    if (this.errors !== null && this.errors !== undefined && this.errors.size > 0)
      return alert('Cadastre este dia para poder adicionar horários');

    let timeToBeInserted = this.form.get("scheduleToInsert")?.value;

    if (String(timeToBeInserted).length <= 0)
      return alert('O horário não pode ser vazio');

    if (this.schedules.filter(e => e.dayTimePretty === timeToBeInserted).length > 0)
      return;

    let dayTimeModel: DayTimeModel = {};
    dayTimeModel.dayTimeDay = this.selected.toISOString().split("T")[0];
    dayTimeModel.dayTimeStart = String(this.form.get("scheduleToInsert")?.value).split("-")[0] + ":00";
    dayTimeModel.dayTimeEnd = String(this.form.get("scheduleToInsert")?.value).split("-")[1] + ":00";
    dayTimeModel.dayTimePretty = timeToBeInserted;
    this.schedules.push(dayTimeModel);

    let editionModel: EditDayTimeActionModel = {};
    editionModel.date = this.selected;
    editionModel.action = Constants.Edition.ADDED;
    editionModel.newValue = timeToBeInserted;
    editionModel.oldValue = null;
    this.editionActions.push(editionModel);

    this.schedules = this.schedules.sort((a, b) => a.dayTimePretty!.localeCompare(b.dayTimePretty!));

  }

  deleteFromList(value: DayTimeModel): void {
    if (this.schedules.includes(value)) {
      const index: number = this.schedules.indexOf(value);
      if (index !== -1) {
        this.schedules.splice(index, 1);

        let editionModel: EditDayTimeActionModel = {};
        editionModel.dayTimeId = value.dayTimeId;
        editionModel.date = this.selected;
        editionModel.action = Constants.Edition.DELETED;
        editionModel.newValue = null;
        editionModel.oldValue = null;
        this.editionActions.push(editionModel);

        this.schedules = this.schedules.sort((a, b) => a.dayTimePretty!.localeCompare(b.dayTimePretty!));
      }
    }
  }

  editItemFromList(value: DayTimeModel): void {
    let edit = "edit_";
    let span = document.getElementById(value.dayTimePretty!);
    let input = document.getElementById(edit + value.dayTimePretty) as HTMLInputElement;

    if (span !== null) {
      span.innerHTML = `<input type='text' value='${value.dayTimePretty}' id='${edit + value.dayTimePretty}' class='list-input' mask='00:00-00:00' autofocus>`;
    }
    if (input !== null) {

      //find in the list the old value
      let oldSchedule = this.schedules.find((schedule) => schedule === value);

      //if the list has the old value
      if (oldSchedule != null && oldSchedule !== undefined) {

        if (input.value !== null) { // ensures the input is not empty
          let editionModel: EditDayTimeActionModel = {};
          editionModel.dayTimeId = oldSchedule.dayTimeId;
          editionModel.date = this.selected;
          editionModel.action = Constants.Edition.UPDATED;
          editionModel.newValue = input.value;
          editionModel.oldValue = oldSchedule.dayTimePretty;
          this.editionActions.push(editionModel);

          oldSchedule.dayTimePretty = input.value;

          let index = this.schedules.indexOf(value); // gets the index of the old value

          if (index !== null && oldSchedule !== undefined) {
            //if the old value was found and input was not empty
            this.schedules[index] = oldSchedule; //we update the list in that point

          }
          this.schedules = this.schedules.sort((a, b) => a.dayTimePretty!.localeCompare(b.dayTimePretty!));
        }
      }

      if (span != null)
        span.innerHTML = `<span id="${value.dayTimePretty}">${value.dayTimePretty}</span>`;
    }
  }

  getSchedules() {
    if (this.selected == null)
      return;

    if (this.selected != this.oldSelection) {
      this.oldSelection = this.selected;

      this.selected.setHours(new Date().getHours() - 3);
      this.oldSelection.setHours(new Date().getHours() - 3);

      this.schedules = [];

      this.errors.clear();

      if (this.selected !== undefined) {

        this.scheduleService.
          getSchedules(this.selected)?.
          pipe(catchError(ErrorHandler.handleError)).
          subscribe((value) => {

            if (value instanceof Map) {
              if (value.has(Constants.Errors.ERROR)) {
                this.errors.set(Constants.Errors.ERROR, value.get(Constants.Errors.ERROR) as string);
                return;
              }
            }

            this.schedules = <DayTimeModel[]>value[0];

            this.schedules = this.schedules.sort((a, b) => a.dayTimePretty!.localeCompare(b.dayTimePretty!));

          });
      }
    }
  }


  editSchedule(): void {
    if (this.selected == null)
      return alert('Escolha um dia');

    if (this.schedules.length <= 0)
      return alert("O dia não pode ficar sem horário!");   

    this.scheduleService.updateSchedules(this.editionActions)?.pipe(catchError(ErrorHandler.handleError)).subscribe((value) => {

      console.log(value);

      if (value instanceof Map) {
        this.editionActions = [];
        return;
      }

      this.editionActions = [];

      this.snackBar.open("Horários atualizados ✅",
        "OK",
        { duration: 5000, panelClass: ['blue-snackbar'] }
      );
       

    });

  }

}
