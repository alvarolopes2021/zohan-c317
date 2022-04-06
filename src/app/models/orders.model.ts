import { Time } from "@angular/common";

export interface OrdersModel {
    orderId?: string;
    order_idDayTime?: string;
    order_clientId?: string;
    order_serviceId?: string;
}

export interface OrderBindingModel {
    dayTimeDay?: string;
    dayTimePretty?: string;
    dayTimeStart?: string;
    orderId?: string;
    serviceDescription?: string;
    serviceValue?: string;
    userName?: string;
    userPhone?: string;
}