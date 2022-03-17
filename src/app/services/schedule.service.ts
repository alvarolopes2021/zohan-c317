import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from 'src/constants';
import { ScheduleModel } from '../models/schedule.model';
import { CreateScheduleRequestMap, UpdateScheduleRequestMap } from '../models/request-map.models';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  readonly CONSTANTS = Constants;
  constructor(
    private http: HttpClient
  ) { }


  createSchedule(date: Date | null, scheduleList: ScheduleModel[]): Observable<any> | null {
    if (date == null || date == undefined)
      return null;

    let requestMap: CreateScheduleRequestMap = {};
    requestMap.date = date.toISOString().split("T")[0];  //2022-03-15
    requestMap.scheduleList = scheduleList;

    return this.http.post<any>(Constants.HttpEndpoints.Schedules.CREATE_SCHEDULE, requestMap);
  }

  insertSchedule(date: Date | null, scheduleList: ScheduleModel[]): Observable<any> | null {
    if (date == null || date == undefined)
      return null;

    let requestMap: CreateScheduleRequestMap = {};

    requestMap.date = date.toISOString().split("T")[0];
    requestMap.scheduleList = scheduleList;

    return this.http.post<any>(Constants.HttpEndpoints.Schedules.CREATE_SCHEDULE, requestMap);
  }

  getSchedules(date: Date): Observable<any> | null {
    let day = date.toISOString().split("T")[0];  //YYYY-MM-DD

    let params: HttpParams = new HttpParams().append(Constants.Keys.DATE.toString(), day.toString());

    return this.http.get(Constants.HttpEndpoints.Schedules.GET_SCHEDULES, { params: params });
  }

  updateSchedules(date: Date | null, deletedSchedulesValues?: string[], schedulesToBeInserted?: ScheduleModel[], scheduleToBeUpdated?: Map<string, string>): Observable<any> | null {

    if (date == null || date == undefined)
      return null;

    let requestMap: UpdateScheduleRequestMap = {};

    requestMap.date = date.toISOString().split("T")[0];
    requestMap.deletedSchedulesValues = deletedSchedulesValues;
    requestMap.schedulesToBeInserted = schedulesToBeInserted;

    if(scheduleToBeUpdated !== null && scheduleToBeUpdated !== undefined)
      requestMap.scheduleToBeUpdated = Object.fromEntries(scheduleToBeUpdated);

    return this.http.put(Constants.HttpEndpoints.Schedules.UPDATE_SCHEDULES, requestMap);
  }

}
