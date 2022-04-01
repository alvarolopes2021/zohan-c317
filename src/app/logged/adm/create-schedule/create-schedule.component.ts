import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/custom-components/snack-bar/snack-bar.component';


import { DayTimeModel } from 'src/app/models/dayTime.model';
import { ScheduleService } from 'src/app/services/schedule.service';
import { IconServiceService } from 'src/assets/icon-service.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateScheduleComponent implements OnInit {

  selected: Date = new Date();
  minDate?: Date | null = new Date();

  schedules: DayTimeModel[] = [];

  icons: Map<string, any> = new Map<string, any>();

  form = new FormGroup({
    scheduleToInsert: new FormControl('')
  })

  constructor(
    private iconService: IconServiceService,
    private scheduleService: ScheduleService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.selected.setHours(new Date().getHours() - 3);
    this.icons = this.iconService.getIcons();
  }

  addToList() {
    if (this.selected == null || this.selected == undefined)
      return alert('Escolha um dia!');

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

    this.schedules.sort((a, b) => a.dayTimePretty!.localeCompare(b.dayTimePretty!));
  }

  deleteFromList(value: DayTimeModel) {
    if (this.schedules.includes(value)) {
      const index: number = this.schedules.indexOf(value);
      if (index !== -1) {
        this.schedules.splice(index, 1);
        this.schedules.sort((a, b) => a.dayTimePretty!.localeCompare(b.dayTimePretty!));
      }
    }
  }

  editItemFromList(value: DayTimeModel) {
    let edit = "edit_";
    let span = document.getElementById(value.dayTimePretty!);
    let input = document.getElementById(edit + value.dayTimePretty) as HTMLInputElement;

    if (span !== null) {
      span.innerHTML = `<input type='text' value='${value.dayTimePretty}' id='${edit + value.dayTimePretty}' class='list-input' mask='00:00-00:00'autofocus>`;
    }
    if (input !== null) {

      //find in the list the old value
      let oldSchedule = this.schedules.find((schedule) => schedule === value);

      //if the list has the old value
      if (oldSchedule != null && oldSchedule !== undefined) {

        if (input.value !== null && input.value.length > 0) { // ensures the input is not empty

          oldSchedule.dayTimePretty = input.value;

          let index = this.schedules.indexOf(value); // gets the index of the old value

          if (index !== null && oldSchedule !== undefined) //if the old value was found and input was not empty
            this.schedules[index] = oldSchedule; //we update the list in that point

          this.schedules.sort((a, b) => a.dayTimePretty!.localeCompare(b.dayTimePretty!));
        }
      }

      if (span != null)
        span.innerHTML = `<span id="${value.dayTimePretty}">${value.dayTimePretty}</span>`;
    }
  }

  async createSchedule() {

    if (this.schedules.length <= 0)
      return alert("Nenhum horário adicionado");

    if (this.selected == null || this.selected == undefined)
      return alert("Escolha um dia");

    this.scheduleService.createSchedule(this.schedules)?.subscribe((value) => {
      if (value instanceof Map) {
        return;
      }

      this.snackBar.open("Dias e horários cadastrados ✅",
        "OK",
        { duration: 5000, panelClass: ['blue-snackbar'] }
      );

    });

  }

}
