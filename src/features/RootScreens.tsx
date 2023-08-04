import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './NotFound';
import useRefreshToken from 'hooks/useRefreshToken';
import OrderPage from './Order/pages/OrderPage';
import { Dashboard } from './Dashboard';
import { PrivateLayout } from 'components/layout/PrivateLayout';
import FoodPage from './Food';

const RootScreens = () => {
  const { shield } = useRefreshToken();
  return (
    <React.Fragment>
      <Routes>
        <Route path='/admin' element={shield(PrivateLayout)}>
          <Route path='/admin' element={<Dashboard />} />
          <Route path='/admin/order' element={<OrderPage />} />
          <Route path='/admin/food' element={<FoodPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default RootScreens;
