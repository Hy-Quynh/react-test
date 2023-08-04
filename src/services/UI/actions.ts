import { createAction } from 'services/actionConfigs';
const PREFIX_ACTIONS = 'UI_';
const setLoading = createAction<{ path: string, result: boolean }>(PREFIX_ACTIONS + 'SET_LOADING');
const setLoadingPage = createAction<boolean>(PREFIX_ACTIONS + 'SET_LOADING_PAGE');
const uiActions = {
  setLoading,
  setLoadingPage,
};
export default uiActions;
