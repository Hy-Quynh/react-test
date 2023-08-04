import { call, put } from 'redux-saga/effects';
import orderService from 'services/order';
import { OrderCreateType, OrderUpdateType } from 'types/orderType';
import {closeDeleteOrderItem, createOrderItemFailure, createOrderItemSuccess, deleteOrderItemFailure, deleteOrderItemSuccess, getListOrderFailure, getListOrderSuccess, setDeleteOrderItem, updateOrderItemFailure, updateOrderItemSuccess } from '../order/actions';
import { AxiosResponse } from 'axios';
import { displayToast } from '../sagaHelpers';

type UpdateActionType = {
  type: string,
  payload: {
    orderId: number, 
    updatedData: OrderUpdateType
  }
}

type CreateActionType = {
  type: string,
  payload: OrderCreateType
}

type DeleteActionType = {
  type: string,
  payload: string
}

export const getListOrder = function* getListOrder() {
  try {
    const data: AxiosResponse = yield call(orderService.getListOrder);
    yield put(getListOrderSuccess(data?.data));
  } catch (error: any) {
    yield put(getListOrderFailure(error));
  }
};

export const updateOrderItem = function* updateOrderItem(action: UpdateActionType) {
  try {
    const { orderId, updatedData } = action.payload;
    const data: AxiosResponse = yield call(orderService.updateOrder, orderId, updatedData);
    yield put(updateOrderItemSuccess(data?.data));
    yield call(displayToast, {
      type: 'success',
      content: 'Cập nhật thành công',
    });
  } catch (error: any) {
    yield put(updateOrderItemFailure(error));
    yield call(displayToast, {
      type: 'error',
      content: 'Cập nhật thất bại',
    });
  }
};

export const createOrderItem = function* createOrderItem(action: CreateActionType) {
  try {
    const newItemData = action.payload;
    const data: AxiosResponse = yield call(orderService.createOrder, newItemData);
    yield put(createOrderItemSuccess(data?.data));
    yield call(displayToast, {
      type: 'success',
      content: 'Tạo mới thành công',
    });
  } catch (error: any) {
    yield put(createOrderItemFailure(error));
    yield call(displayToast, {
      type: 'error',
      content: 'Tạo mới thất bại',
    });
  }
};

export const deleteOrderItem = function* deleteOrderItem(action: DeleteActionType) {
  try {
    const itemId = action.payload;
    const data: AxiosResponse = yield call(orderService.deleteOrder, itemId);
    yield put(deleteOrderItemSuccess(data?.data));
    yield call(displayToast, {
      type: 'success',
      content: 'Xoá thành công',
    });
  } catch (error: any) {
    yield put(deleteOrderItemFailure(error));
    yield call(displayToast, {
      type: 'error',
      content: 'Xoá thất bại',
    });
  }
};

export const setDeleteItem = function* setDeleteItem(action: {type: string, payload: string}) {
  yield put(setDeleteOrderItem(action?.payload));
};

export const closeDeleteItem = function* closeDeleteItem() {
  yield put(closeDeleteOrderItem());
};


