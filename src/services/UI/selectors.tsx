import { get } from 'lodash';
import { RootState } from 'store';
import { useAppSelector } from 'store/hooks';


type MyState = RootState['ui'];

const getCurrentState = (state: RootState): MyState => state.ui;
const selector = (key: keyof MyState, defaultValue?: any) => useAppSelector(state => get(getCurrentState(state), key, defaultValue));
const getLoading = (path: string) => {
  return selector(path, false);
};

const getLoadingPage = () => getLoading('loadingApp');

const getRefreshTokenLoading = () => getLoading('refreshToken');

const uiSelector = {
  getLoading,
  getLoadingPage,
  getRefreshTokenLoading,
};

export default uiSelector;
