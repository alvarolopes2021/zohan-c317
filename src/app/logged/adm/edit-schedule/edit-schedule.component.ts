import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs';

import { ErrorHandler } from '../../../services/errorHandler';
import { ScheduleModel } from 'src/app/models/schedule.model';
import { ScheduleService } from 'src/app/services/schedule.service';
import { IconServiceService } from 'src/assets/icon-service.service';
import { Constants } from 'src/constants';

@Component({
  selector: 'app-edit-schedule',
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {

  selected?: Date | null;
  oldSelection?: Date = new Date();
  minDate?: Date | null = new Date();

  schedules: string[] = [];

  icons: Map<string, any> = new Map<string, any>();

  errors: Map<string, string> = new Map<string, string>();

  deletedSchedulesValues?: string[] = [];
  schedulesToBeInserted?: ScheduleModel[] = []; //schedules added on edit section
  scheduleToBeUpdated?: Map<string, string> = new Map<string, string>(); // Map<oldValue, newValue>

  readonly CONSTANTS = Constants;

  form = new FormGroup({
    scheduleToInsert: new FormControl('')
  })

  constructor(
    private iconService: IconServiceService,
    private scheduleService: ScheduleService
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

    if (!this.schedules.includes(timeToBeInserted)) {
      this.schedules.push(timeToBeInserted);
      this.schedulesToBeInserted?.push(timeToBeInserted);
    }

    this.schedules = this.schedules.sort();

  }

  deleteFromList(value: string): void {
    if (this.schedules.includes(value)) {
      const index: number = this.schedules.indexOf(value);
      if (index !== -1) {
        this.schedules.splice(index, 1);
        this.deletedSchedulesValues?.push(value);
      }
    }
  }

  editItemFromList(value: string): void {
    let edit = "edit_";
    let span = document.getElementById(value);
    let input = document.getElementById(edit + value) as HTMLInputElement;

    if (span !== null) {
      span.innerHTML = `<input type='text' value='${value}' id='${edit + value}' mask='00:00-00:00'           autofocus>`;
    }
    if (input !== null) {

      //find in the list the old value
      let oldSchedule = this.schedules.find((schedule) => schedule === value);

      //if the list has the old value
      if (oldSchedule != null && oldSchedule !== undefined) {

        if (input.value !== null) { // ensures the input is not empty

          oldSchedule = input.value;

          let index = this.schedules.indexOf(value); // gets the index of the old value

          if (index !== null && oldSchedule !== undefined) {
            this.scheduleToBeUpdated?.set(this.schedules[index], oldSchedule);
            //if the old value was found and input was not empty
            this.schedules[index] = oldSchedule; //we update the list in that point

          }
          this.schedules = this.schedules.sort();
        }
      }

      if (span != null)
        span.innerHTML = `<span id="${value}">${value}</span>`;
    }
  }

  getSchedules() {
    if (this.selected == null)
      return alert('Escolha um dia');

    if (this.selected != this.oldSelection) {
      this.oldSelection = this.selected;

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

            let shceduleList: ScheduleModel[] = <ScheduleModel[]>value[0];

            shceduleList.forEach((element) => {
              this.schedules.push(String(element.scheduleTime));
            })

            this.schedules = this.schedules.sort();

          });
      }
    }
  }


  editSchedule(): void {
    if (this.selected == null)
      return alert('Escolha um dia');

    if (this.schedules.length <= 0)
      return alert("O dia não pode ficar sem horário!");

    this.scheduleService.updateSchedules(this.selected, this.deletedSchedulesValues, this.schedulesToBeInserted, this.scheduleToBeUpdated)?.subscribe((value) => {

    });

  }

}
