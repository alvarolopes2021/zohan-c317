import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Constants } from 'src/constants';
import { DayTimeModel } from '../models/dayTime.model';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  readonly CONSTANTS = Constants;
  constructor(
    private http: HttpClient
  ) { }


  createSchedule(dayTimeList: DayTimeModel[]): Observable<any> | null {    
    if (dayTimeList == null || dayTimeList == undefined || dayTimeList.length <= 0)
      return null;

    return this.http.post<any>(Constants.HttpEndpoints.Schedules.CREATE_SCHEDULE, dayTimeList);
  }

  getSchedules(date: Date): Observable<any> | null {
    let day = date.toISOString().split("T")[0];  //YYYY-MM-DD

    let params: HttpParams = new HttpParams().append(Constants.Keys.DATE.toString(), day.toString());

    return this.http.get(Constants.HttpEndpoints.Schedules.GET_SCHEDULES, { params: params });
  }

  updateSchedules(editionActions: DayTimeModel): Observable<any> | null {

    if(editionActions == null)
      return null;

    return this.http.put(Constants.HttpEndpoints.Schedules.UPDATE_SCHEDULES, editionActions);
    
  }

  deleteDayTime(dayTime: DayTimeModel){
    if(dayTime == null || dayTime == undefined)
      return;

    let params = new HttpParams().append(Constants.Keys.DAY_TIME, dayTime.daytimeid!);
    return this.http.delete(Constants.HttpEndpoints.Schedules.DELETE_DAYTIME, {params: params});
  }

  getAvailableDayTime(date: Date): Observable<any>{
    let params = new HttpParams().append(Constants.Keys.DATE, date.toISOString().split("T")[0]);
    return this.http.get(Constants.HttpEndpoints.Schedules.GET_AVAILABLE_DAYTIME, {params: params});
  }

}
