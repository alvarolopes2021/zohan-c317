import { Component, OnInit } from '@angular/core';
import { catchError } from 'rxjs';
import { OrderBindingModel } from 'src/app/models/orders.model';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandler } from 'src/app/services/errorHandler';
import { OrdersService } from 'src/app/services/orders.service';
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
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    let userInfo: Map<string, string> | null = this.authService.getTokenInformation();

    if(userInfo == null)
      return;

    this.ordersService.getOrdersByUserId(userInfo.get(Constants.Keys.SESSION_CLIENT_ID)!).pipe(catchError(ErrorHandler.handleError)).subscribe((orders) => {
      
      if(orders instanceof Map){
        return;
      }

      this.orderBinding = <OrderBindingModel[]>orders[0];

      let i = 0;
      this.orderBinding.forEach((element) => {
        this.orderBinding[i].dayTimeDay = this.orderBinding[i].dayTimeDay?.split("T")[0];
        i++;
      });

    });
  }

}
