import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Constants } from 'src/constants';
import { OrdersModel } from '../models/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  createOrder(order: OrdersModel){
    return this.http.post(Constants.HttpEndpoints.Orders.CRAETE_ORDER, order);
  }

  getOrdersByUserId(userId: string): Observable<any>{
    let params = new HttpParams().append(Constants.Keys.SESSION_CLIENT_ID, userId);
    return this.http.get(Constants.HttpEndpoints.Orders.GET_ORDER_BY_USER_ID, {params: params} );
  }

  getAllOrders(): Observable<any>{    
    return this.http.get(Constants.HttpEndpoints.Orders.GET_ALL_ORDERS);
  }

  getNextOrders(): Observable<any>{    
    return this.http.get(Constants.HttpEndpoints.Orders.GET_NEXT_ORDERS);
  }

}
