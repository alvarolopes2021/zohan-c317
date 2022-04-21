import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private ordersService: OrdersService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.ordersService.getNextOrders().pipe(catchError(ErrorHandler.handleError)).subscribe((orders) => {

      if (orders instanceof Map) {
        return;
      }

      this.nextOrders = <OrderBindingModel[]>orders;

      let i = 0;
      this.nextOrders.forEach((element) => {
        this.nextOrders[i].daytimeday = this.nextOrders[i].daytimeday?.split("T")[0];
        this.nextOrders[i].canCancelOrder = this.canCancelOrder(element);
        i++;        
      });

      this.nextOrders = this.nextOrders.filter(this.checkIfIsNextOrder);

      this.nextOrders = this.nextOrders.sort((a, b) => a.daytimeday!.localeCompare(b.daytimeday!) || a.daytimepretty!.localeCompare(b.daytimepretty!));

    });

  }

  checkIfIsNextOrder(element: OrderBindingModel): Boolean {
    let today = new Date();
    today.setHours(today.getHours() - 3);
    let todayFormatted = today.toISOString();
    let todayDate = todayFormatted.split("T")[0];
    
    if (element.daytimeday == todayDate && element.daytimestart! < new Date().toLocaleTimeString('en-GB')) { 
      return false;
    }
    return true;
  }


  canCancelOrder(order: OrderBindingModel) {
    let today = new Date();
    today.setHours(today.getHours() - 3);
    let todayFormatted = today.toISOString();
    let todayDate = todayFormatted.split("T")[0];
    let todayTime = todayFormatted.split("T")[1].split(".")[0];        

    if (order.daytimeday?.split("T")[0]! <= todayDate && order.daytimestart! < todayTime) {
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

      this.nextOrders.splice(this.nextOrders.indexOf(order), 1);

      this.snackBar.open("Agendamento cancelado ✅",
        "OK",
        { duration: 5000, panelClass: ['blue-snackbar'] }
      );


    });

  }

}
