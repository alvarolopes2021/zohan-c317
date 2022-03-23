import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/constants';
import { ServicesModel } from '../models/services.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  insertServices(servicesModelList: ServicesModel[]) : Observable<any> | null{
    return this.http.post<any>(Constants.HttpEndpoints.Services.ADD_SERVICES, servicesModelList);
  }

  getServices() : Observable<any> | null {
    return this.http.get<any>(Constants.HttpEndpoints.Services.GET_SERVICES);
  }

}
