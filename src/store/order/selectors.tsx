import { get } from 'lodash';
import { RootState } from 'store';
import { useAppSelector } from 'store/hooks';


type MyState = RootState['order'];

const getCurrentState = (state: RootState): MyState => state.order;
const selector = (key: keyof MyState, defaultValue?: any) => useAppSelector(state => get(getCurrentState(state), key, defaultValue));
const getOrderState = (path: string) => {
  return selector(path, false);
};

const getListOrder = () => getOrderState('listOrder');
const getOrderDisable = () => getOrderState('disabled');
const getFormLoading = () => getOrderState('loadingForm');
const getOrderDelete = () => getOrderState('orderDelete');

const orderSelector = {
  getListOrder,
  getOrderDisable,
  getFormLoading,
  getOrderDelete
};

export default orderSelector;
