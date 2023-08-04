import uiServiceReducer from 'services/UI/reducer';
import orderReducer from '../order/orderReducer';

const rootReducer = {
  ui: uiServiceReducer,
  order: orderReducer
};

export default rootReducer;
