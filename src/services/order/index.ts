import fetch from 'services/request';
import {
  OrderCreateType,
  OrderUpdateType,
} from 'types/orderType';

const orderService = {
  getListOrder: () => {
    return fetch({ url: '/order' });
  },

  getOrderDetail: (orderId: number) => {
    return fetch({ url: `/order/${orderId}` });
  },

  createOrder: (orderData: OrderCreateType) => {
    return fetch({ method: 'post', url: '/order', body: orderData });
  },

  updateOrder: (orderId: number, orderData: OrderUpdateType) => {
    return fetch({ method: 'put', url: `/order/${orderId}`, body: orderData });
  },

  deleteOrder: (orderId: string) => {
    return fetch({ method: 'delete', url: `/order/${orderId}` });
  },
};

export default orderService;
