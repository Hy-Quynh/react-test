import RootScreens from 'features/RootScreens';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import LoadingPage from 'services/UI/LoadingPage';
import store from 'store';

const AppLayout: React.FC = () => <RootScreens />;

const App: React.FC = () => {
  useEffect(() => {
    document.title = 'Booking';
  }, []);

  return (
    <Provider store={store}>
      <AppLayout />
      <LoadingPage />
    </Provider>
  );
};

export default App;
