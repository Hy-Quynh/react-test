import {
  OrderCreateType,
  OrderItem,
  OrderListType,
  OrderUpdateType,
} from 'types/orderType';

export const GET_LIST_ORDER_REQUEST = 'GET_LIST_ORDER_REQUEST';
export const GET_LIST_ORDER_SUCCESS = 'GET_LIST_ORDER_SUCCESS';
export const GET_LIST_ORDER_FAILURE = 'GET_LIST_ORDER_FAILURE';

export const UPDATE_ITEM_ORDER_REQUEST = 'UPDATE_ITEM_ORDER_REQUEST';
export const UPDATE_ITEM_ORDER_SUCCESS = 'UPDATE_ITEM_ORDER_SUCCESS';
export const UPDATE_ITEM_ORDER_FAILURE = 'UPDATE_ITEM_ORDER_FAILURE';

export const CREATE_ITEM_ORDER_REQUEST = 'CREATE_ITEM_ORDER_REQUEST';
export const CREATE_ITEM_ORDER_SUCCESS = 'CREATE_ITEM_ORDER_SUCCESS';
export const CREATE_ITEM_ORDER_FAILURE = 'CREATE_ITEM_ORDER_FAILURE';

export const DELETE_ITEM_ORDER_REQUEST = 'DELETE_ITEM_ORDER_REQUEST';
export const DELETE_ITEM_ORDER_SUCCESS = 'DELETE_ITEM_ORDER_SUCCESS';
export const DELETE_ITEM_ORDER_FAILURE = 'DELETE_ITEM_ORDER_FAILURE';
export const SET_DELETE_ITEM_ORDER = 'SET_DELETE_ITEM_ORDER';
export const CLOSE_DELETE_ITEM_ORDER = 'CLOSE_DELETE_ITEM_ORDER';
export const DELETE_ORDER_SET = 'DELETE_ORDER_SET';
export const DELETE_ORDER_REMOVE = 'DELETE_ORDER_REMOVE';

type FailedType = {
  message: string;
};

export const getListOrder = () => ({
  type: GET_LIST_ORDER_REQUEST,
});

export const getListOrderSuccess = (data: OrderListType) => ({
  type: GET_LIST_ORDER_SUCCESS,
  payload: data,
});

export const getListOrderFailure = (error: FailedType) => ({
  type: GET_LIST_ORDER_FAILURE,
  payload: error,
});

export const updateOrderItem = (payloadData: {
  orderId: string;
  updatedData: OrderUpdateType;
}) => ({
  type: UPDATE_ITEM_ORDER_REQUEST,
  payload: payloadData,
});

export const updateOrderItemSuccess = (payloadData: OrderItem) => ({
  type: UPDATE_ITEM_ORDER_SUCCESS,
  payload: payloadData,
});

export const updateOrderItemFailure = (error: FailedType) => ({
  type: UPDATE_ITEM_ORDER_FAILURE,
  payload: error,
});

export const createOrderItem = (payloadData: OrderCreateType) => ({
  type: CREATE_ITEM_ORDER_REQUEST,
  payload: payloadData,
});

export const createOrderItemSuccess = (payloadData: OrderItem) => ({
  type: CREATE_ITEM_ORDER_SUCCESS,
  payload: payloadData,
});

export const createOrderItemFailure = (error: FailedType) => ({
  type: CREATE_ITEM_ORDER_FAILURE,
  payload: error,
});

export const deleteOrderItem = (itemId: string) => ({
  type: DELETE_ITEM_ORDER_REQUEST,
  payload: itemId,
});

export const deleteOrderItemSuccess = (payloadData: OrderItem) => ({
  type: DELETE_ITEM_ORDER_SUCCESS,
  payload: payloadData,
});

export const deleteOrderItemFailure = (error: FailedType) => ({
  type: DELETE_ITEM_ORDER_FAILURE,
  payload: error,
});

export const setDeleteOrderItem = (orderId: string) => ({
  type: DELETE_ORDER_SET,
  payload: orderId,
});

export const closeDeleteOrderItem = () => ({
  type: DELETE_ORDER_REMOVE,
});
