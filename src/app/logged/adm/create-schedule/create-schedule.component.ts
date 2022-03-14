import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import {IconServiceService} from 'src/assets/icon-service.service';

@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css']
})
export class CreateScheduleComponent implements OnInit {

  selected?: Date | null;
  minDate? : Date | null = new Date();

  icons: Map<string, any> = new Map<string, any>();

  schedules : string[] = [];

  form = new FormGroup({
    scheduleToInsert: new FormControl(''),
  })
  
  constructor(
    private iconService : IconServiceService
  ) { }
 
  ngOnInit(): void {
    this.icons = this.iconService.getIcons();
  }

  addToList(){
    if(!this.schedules.includes(this.form.get("scheduleToInsert")?.value))    
      this.schedules.push(this.form.get("scheduleToInsert")?.value);    
    this.schedules.sort();
  }

  deleteFromList(value : string){
    if(this.schedules.includes(value)){
      const index: number = this.schedules.indexOf(value);
      if (index !== -1) {
          this.schedules.splice(index, 1);
      }    
    }   
    this.schedules.sort();   
  }

  editItemFromList(value: string){
    let element = document.getElementById(value);
    if(element !== null){
      element.innerHTML = `<input type='text' value='${value}'>`;

    }    
  }

  createSchedule(){
    console.log(this.selected);
  }

}
