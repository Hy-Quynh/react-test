import { all, takeEvery, takeLatest } from 'redux-saga/effects';
import { CLOSE_DELETE_ITEM_ORDER, CREATE_ITEM_ORDER_REQUEST, DELETE_ITEM_ORDER_REQUEST, GET_LIST_ORDER_REQUEST, SET_DELETE_ITEM_ORDER, UPDATE_ITEM_ORDER_REQUEST } from '../order/actions';
import { closeDeleteItem, createOrderItem, deleteOrderItem, getListOrder, setDeleteItem, updateOrderItem } from 'store/order/sagas';


export default function* rootSaga() {
  yield all([
    takeLatest(GET_LIST_ORDER_REQUEST, getListOrder),
    takeLatest(UPDATE_ITEM_ORDER_REQUEST, updateOrderItem),
    takeLatest(CREATE_ITEM_ORDER_REQUEST, createOrderItem),
    takeLatest(DELETE_ITEM_ORDER_REQUEST, deleteOrderItem),
    takeLatest(SET_DELETE_ITEM_ORDER, setDeleteItem),
    takeEvery(CLOSE_DELETE_ITEM_ORDER, closeDeleteItem),
  ]);
}
