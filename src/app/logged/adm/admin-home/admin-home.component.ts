import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { OrderBindingModel } from 'src/app/models/orders.model';
import { ErrorHandler } from 'src/app/services/errorHandler';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  nextOrders: OrderBindingModel[] = [];

  constructor(
    private ordersService: OrdersService
  ) { }

  ngOnInit(): void {
    this.ordersService.getNextOrders().pipe(catchError(ErrorHandler.handleError)).subscribe((orders) => {
      if(orders instanceof Map){
        return;
      }

      this.nextOrders = <OrderBindingModel[]>orders[0];

      this.nextOrders = this.nextOrders.sort((a,b) => a.dayTimeDay!.localeCompare(b.dayTimeDay!));

    })
  }

}
