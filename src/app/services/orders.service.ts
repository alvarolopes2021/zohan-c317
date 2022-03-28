import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from 'src/constants';
import { OrdersModel } from '../models/orders.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  createOrder(order: OrdersModel, date : Date){
    order.orderDate = date;
    return this.http.post(Constants.HttpEndpoints.Orders.CRAETE_ORDER, order);
  }
}
