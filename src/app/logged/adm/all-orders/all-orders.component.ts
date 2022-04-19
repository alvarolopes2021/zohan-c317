import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private ordersService: OrdersService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ordersService.getAllOrders()?.pipe(catchError(ErrorHandler.handleError)).subscribe((orders) => {

      if (orders instanceof Map) {
        return;
      }     

      if(orders.length == 0)
        return;

      this.orders = <OrderBindingModel[]>orders;

      let i = 0;
      this.orders.forEach((element) => {        
        this.orders[i].daytimeday = element.daytimeday?.split("T")[0];
        this.orders[i].canCancelOrder = this.canCancelOrder(element);
        i++;
      });

      this.orders = this.orders
        .sort((a, b) => b.daytimeday!.localeCompare(a.daytimeday!) || b.daytimepretty!.localeCompare(a.daytimepretty!));
    });
  }

  canCancelOrder(order: OrderBindingModel) {
    let today = new Date();
    today.setHours(today.getHours() - 3);
    let todayFormatted = today.toISOString();
    let todayDate = todayFormatted.split("T")[0];
    let todayTime = todayFormatted.split("T")[1].split(".")[0];

    if (
        order.daytimeday?.split("T")[0]! < todayDate ||
        (order.daytimeday?.split("T")[0]! == todayDate && order.daytimestart! < todayTime)
      ) {

      return false;
    }

    return true;

  }

  cancelOrder(order: OrderBindingModel) {
    if (order == null)
      return;

    let op = confirm("Deseja cancelar o agendamento?");

    if (!op)
      return;

    this.ordersService.cancelOrder(order.orderid!).pipe(catchError(ErrorHandler.handleError)).subscribe((result) => {

      if (result instanceof Map) {
        return;
      }

      this.orders.splice(this.orders.indexOf(order), 1);

      this.snackBar.open("Agendamento cancelado ✅",
        "OK",
        { duration: 5000, panelClass: ['blue-snackbar'] }
      );


    });

  }

}
