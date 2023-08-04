import {
  CREATE_ITEM_ORDER_FAILURE,
  CREATE_ITEM_ORDER_REQUEST,
  CREATE_ITEM_ORDER_SUCCESS,
  DELETE_ITEM_ORDER_FAILURE,
  DELETE_ITEM_ORDER_REQUEST,
  DELETE_ITEM_ORDER_SUCCESS,
  DELETE_ORDER_REMOVE,
  DELETE_ORDER_SET,
  GET_LIST_ORDER_FAILURE,
  GET_LIST_ORDER_REQUEST,
  GET_LIST_ORDER_SUCCESS,
  UPDATE_ITEM_ORDER_FAILURE,
  UPDATE_ITEM_ORDER_REQUEST,
  UPDATE_ITEM_ORDER_SUCCESS,
} from './actions';

const initialState: Record<any, any> = {
  listOrder: [],
  disabled: false,
  loadingForm: false,
  orderDelete: {
    orderId: '',
    loading: false,
  },
};

const orderReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_LIST_ORDER_REQUEST:
      return { ...state, disabled: true };
    case UPDATE_ITEM_ORDER_REQUEST:
      return { ...state, loadingForm: true };
    case CREATE_ITEM_ORDER_REQUEST:
      return { ...state, loadingForm: true };
    case DELETE_ITEM_ORDER_REQUEST:
      return {
        ...state,
        orderDelete: {
          ...state.orderDelete,
          loading: true,
        },
      };

    case GET_LIST_ORDER_SUCCESS:
      return {
        ...state,
        listOrder: action.payload,
        disabled: false,
      };

    case UPDATE_ITEM_ORDER_SUCCESS: {
      const newListOrder = [...state.listOrder]?.map((item) => {
        if (item?.order_id === action?.payload?.order_id) {
          return {
            ...item,
            ...action?.payload,
          };
        }
        return item;
      });
      return { ...state, loadingForm: false, listOrder: newListOrder };
    }
    case CREATE_ITEM_ORDER_SUCCESS: {
      const newListOrder = [...state.listOrder];
      newListOrder?.unshift(action?.payload);
      return { ...state, loadingForm: false, listOrder: newListOrder };
    }

    case DELETE_ITEM_ORDER_SUCCESS: {
      const newListOrder = [...state.listOrder]?.filter(
        (item) => item?.order_id !== action?.payload?.order_id
      );
      return {
        ...state,
        listOrder: newListOrder,
        orderDelete: {
          orderId: '',
          loading: false,
        },
      };
    }

    case GET_LIST_ORDER_FAILURE:
      return { ...state, disabled: false };
    case UPDATE_ITEM_ORDER_FAILURE:
      return { ...state, loadingForm: false };
    case CREATE_ITEM_ORDER_FAILURE:
      return { ...state, loadingForm: false };
    case DELETE_ITEM_ORDER_FAILURE:
      return { ...state, orderDelete: {
        orderId: '',
        loading: false,
      } };
    case DELETE_ORDER_SET:
      return {
        ...state,
        orderDelete: {
          orderId: action?.payload,
          loading: false,
        }
      };
    case DELETE_ORDER_REMOVE:
      return {
        ...state,
        orderDelete: {
          orderId: '',
          loading: false,
        }
      };
    default:
      return state;
  }
};

export default orderReducer;
