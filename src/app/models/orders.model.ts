export interface OrdersModel {
    orderid?: string;
    order_userid?: string;
    order_username?: string;
    order_userphone?: string;
    order_iddaytime?: string;
    order_servicedescription?: string;
    order_servicevalue?: string;
    order_clientcellphone?: string;
}

export interface OrderBindingModel {
    orderid?: string;
    daytimeday?: string;
    daytimestart?: string;
    daytimepretty?: string;
    order_username?: string;
    order_userphone?: string;
    order_servicedescription?: string;
    order_servicevalue?: string;
    canCancelOrder?: boolean;
}