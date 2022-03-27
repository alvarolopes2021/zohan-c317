import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { catchError } from 'rxjs';


import { ScheduleModel } from 'src/app/models/schedule.model';
import { ServicesModel } from 'src/app/models/services.model';
import { ErrorHandler } from 'src/app/services/errorHandler';
import { ScheduleService } from 'src/app/services/schedule.service';
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
  schedules: ScheduleModel[] = [];


  form = new FormGroup({
    scheduleToInsert: new FormControl('')
  });

  constructor(
    private iconsService: IconServiceService,
    private scheduleService: ScheduleService
  ) { }

  ngOnInit(): void {
    this.icons = this.iconsService.getIcons();
  }

  selectDiv(scheduleId: string | undefined) {
    let selectableDivs: HTMLCollectionOf<Element> = document.getElementsByClassName("selectable-schedule");
    let selectedDiv: HTMLCollectionOf<Element> = document.getElementsByClassName("selected-div");

    //CLEARS ALL SELECTED DIVs
    if (selectedDiv !== null && selectedDiv !== undefined) {
      for(let i = 0; i < selectedDiv.length; i++){
        selectedDiv[i].className = "selectable-schedule";
      }
    }

    //STARTS LOOKING FOR THE SELECTED DIV
    for (let i = 0; i < selectableDivs.length; i++) {
      if (selectableDivs[i].id === scheduleId) {
        selectableDivs[i].className = "selected-div";
      }
      else {
        selectableDivs[i].className = "selectable-schedule";
      }
    }
  }

  getSchedules() {
    if (this.selected === null || this.selected === undefined)
      return;

    if (this.selected != this.oldSelection) {
      this.oldSelection = this.selected;

      this.errors.clear();

      this.scheduleService.getSchedules(this.selected)?.pipe(catchError(ErrorHandler.handleError)).
        subscribe((value) => {

          console.log(value);
          if (value instanceof Map) {
            this.errors = value;
            return;
          }

          this.schedules = <ScheduleModel[]>value[0];

        });

    }
  }

}
