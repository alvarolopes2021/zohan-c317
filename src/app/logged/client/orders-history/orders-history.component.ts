import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';

import { OrderBindingModel } from 'src/app/models/orders.model';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandler } from 'src/app/services/errorHandler';
import { OrdersService } from 'src/app/services/orders.service';
import { UtilService } from 'src/app/utils/util.service';
import { Constants } from 'src/constants';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.css']
})
export class OrdersHistoryComponent implements OnInit {

  orderBinding: OrderBindingModel[] = [];

  constructor(
    private ordersService: OrdersService,
    private authService: AuthService,
    private utils: UtilService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {

    let userInfo: Map<string, string> | null = this.authService.getTokenInformation();

    if (userInfo == null)
      return;

    this.ordersService.getOrdersByUserId(userInfo.get(Constants.Keys.SESSION_CLIENT_ID)!).pipe(catchError(ErrorHandler.handleError)).subscribe((orders) => {

      if (orders instanceof Map) {
        return;
      }

      this.orderBinding = <OrderBindingModel[]>orders;


      let i = 0;
      this.orderBinding.forEach((element) => {
        this.orderBinding[i].daytimeday = this.orderBinding[i].daytimeday?.split("T")[0];
        this.orderBinding[i].canCancelOrder = this.canCancelOrder(element);
        i++;
      });

      //sort by date and order time
      this.orderBinding.sort((a, b) =>
        b.daytimeday!.localeCompare(a.daytimeday!) || b.daytimepretty!.localeCompare(a.daytimepretty!)
      );

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

    let op = confirm("Deseja cancelar o agendamento? ⛔");

    if (!op)
      return;

    this.ordersService.cancelOrder(order.orderid!).pipe(catchError(ErrorHandler.handleError)).subscribe((result) => {

      if (result instanceof Map) {
        return;
      }

      this.orderBinding.splice(this.orderBinding.indexOf(order), 1);

      this.snackBar.open("Agendamento cancelado ✅",
        "OK",
        { duration: 5000, panelClass: ['blue-snackbar'] }
      );


    });

  }

}
