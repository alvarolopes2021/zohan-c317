import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from 'src/constants';
import { DayTimeModel } from '../models/dayTime.model';
import { EditDayTimeActionModel } from '../models/edit-dayTime-action.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  readonly CONSTANTS = Constants;
  constructor(
    private http: HttpClient
  ) { }


  createSchedule(dayTimeList: DayTimeModel[]): Observable<any> | null {
    console.log(dayTimeList);
    if (dayTimeList == null || dayTimeList == undefined || dayTimeList.length <= 0)
      return null;

    return this.http.post<any>(Constants.HttpEndpoints.Schedules.CREATE_SCHEDULE, dayTimeList);
  }

  getSchedules(date: Date): Observable<any> | null {
    let day = date.toISOString().split("T")[0];  //YYYY-MM-DD

    let params: HttpParams = new HttpParams().append(Constants.Keys.DATE.toString(), day.toString());

    return this.http.get(Constants.HttpEndpoints.Schedules.GET_SCHEDULES, { params: params });
  }

  updateSchedules(editionActions: EditDayTimeActionModel[]): Observable<any> | null {

    if(editionActions == null)
      return null;

    return this.http.put(Constants.HttpEndpoints.Schedules.UPDATE_SCHEDULES, editionActions);
    
  }

}
