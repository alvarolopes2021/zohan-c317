export interface OrdersModel {
    orderid?: string;
    order_iddaytime?: string;
    order_clientid?: string;
    order_serviceid?: string;
    order_clientcellphone?: string;
}

export interface OrderBindingModel {
    daytimeday?: string;
    daytimepretty?: string;
    daytimestart?: string;
    orderid?: string;
    servicedescription?: string;
    servicevalue?: string;
    username?: string;
    userphone?: string;
    canCancelOrder?: boolean;
}