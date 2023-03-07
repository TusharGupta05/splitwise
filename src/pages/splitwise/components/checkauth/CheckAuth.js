import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import ROUTES from '../../constants/routes';
import { REDUCER_NAMES } from '../../../../constants/reducers.constants';

const CheckAuth = ({ isAuthRequired }) => {
  const currentUser = useSelector((reduxStore) => reduxStore[REDUCER_NAMES.AUTH].currentUser);
  if (isAuthRequired) {
    if (currentUser) {
      return <Outlet />;
    }
    return <Navigate to={ROUTES.LOGIN_ROUTE} />;
  }
  if (currentUser) {
    return <Navigate to={ROUTES.DASHBOARD_ROUTE} />;
  }
  return <Outlet />;
};

export default CheckAuth;
