import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import { ScheduleModel } from 'src/app/models/schedule.model';
import { ScheduleService } from 'src/app/services/schedule.service';
import { IconServiceService } from 'src/assets/icon-service.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {

  selected: Date | null = new Date();
  minDate?: Date | null = new Date();

  schedules: string[] = [];

  icons: Map<string, any> = new Map<string, any>();

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
    let timeToBeInserted = this.form.get("scheduleToInsert")?.value;

    if (String(timeToBeInserted).length <= 0)
      return alert('O horário não pode ser vazio');

    if (!this.schedules.includes(timeToBeInserted))
      this.schedules.push(this.form.get("scheduleToInsert")?.value);

    this.schedules.sort();
  }

  deleteFromList(value: string) {
    if (this.schedules.includes(value)) {
      const index: number = this.schedules.indexOf(value);
      if (index !== -1) {
        this.schedules.splice(index, 1);
      }
    }
  }

  editItemFromList(value: string) {
    let edit = "edit_";
    let span = document.getElementById(value);
    let input = document.getElementById(edit + value) as HTMLInputElement;

    if (span !== null) {
      span.innerHTML = `<input type='text' value='${value}' id='${edit + value}' mask='00:00-00:00'autofocus>`;
    }
    if (input !== null) {

      //find in the list the old value
      let oldSchedule = this.schedules.find((schedule) => schedule === value);

      //if the list has the old value
      if (oldSchedule != null && oldSchedule !== undefined) {        

        if (input.value !== null && input.value.length > 0) { // ensures the input is not empty

          oldSchedule = input.value;

          let index = this.schedules.indexOf(value); // gets the index of the old value

          if (index !== null && oldSchedule !== undefined) //if the old value was found and input was not empty
            this.schedules[index] = oldSchedule; //we update the list in that point
            
          this.schedules.sort();
        }
      }

      if (span != null)
        span.innerHTML = `<span id="${value}">${value}</span>`;
    }
  }

  async createSchedule() {

    if(this.schedules.length <= 0)
      return alert("Nenhum horário adicionado");

    let scheduleList: ScheduleModel[] = [];

    this.schedules.forEach(element => {
      let scheduleModel : ScheduleModel = {};
      scheduleModel.scheduleBeingUsed = false;
      scheduleModel.scheduleTime = element;
      scheduleList.push(scheduleModel);
    });

    this.scheduleService.createSchedule(this.selected, scheduleList)?.subscribe((value) => {
      console.log(value);
    }); 
    
  }

}
