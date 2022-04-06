import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { OrderBindingModel } from 'src/app/models/orders.model';
import { ErrorHandler } from 'src/app/services/errorHandler';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.css']
})
export class AllOrdersComponent implements OnInit {

  orders: OrderBindingModel[] = [];

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.ordersService.getAllOrders()?.pipe(catchError(ErrorHandler.handleError)).subscribe((orders) => {

      if (orders instanceof Map) {
        return;
      }

      this.orders = <OrderBindingModel[]>orders[0];
      let i = 0;
      this.orders.forEach((element) => {        
        this.orders[i].dayTimeDay = element.dayTimeDay?.split("T")[0];
        i++;
      });

      this.orders = this.orders
        .sort((a, b) => b.dayTimeDay!.localeCompare(a.dayTimeDay!));
    })
  }

}
