import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from 'src/constants';
import { ScheduleModel } from '../models/schedule.model';
import { CreateScheduleRequestMap } from '../models/request-map.models';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  readonly CONSTANTS = Constants;
  constructor(
    private http: HttpClient
  ) { }


  createSchedule(date: Date | null, scheduleList: ScheduleModel[]): Observable<any> | null {    
    if(date == null || date == undefined)
      return null;

    let requestMap : CreateScheduleRequestMap = {};
    requestMap.date = date.toISOString().split("T")[0];  //2022-03-15
    requestMap.scheduleList = scheduleList;
    
    return this.http.post<any>(Constants.HttpEndpoints.SCHEDULES.CREATE_SCHEDULE, requestMap);
  }

  insertSchedule(date: Date | null, scheduleList: ScheduleModel[]) : Observable<any> | null {
    if(date == null || date == undefined)
      return null;

    let requestMap : CreateScheduleRequestMap = {};

    requestMap.date = date.toISOString().split("T")[0];
    requestMap.scheduleList = scheduleList;

    return this.http.post<any>(Constants.HttpEndpoints.SCHEDULES.CREATE_SCHEDULE, requestMap);
  }

}
