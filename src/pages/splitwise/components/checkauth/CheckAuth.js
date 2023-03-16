import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
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

CheckAuth.propTypes = {
  isAuthRequired: PropTypes.bool,
};

CheckAuth.defaultProps = {
  isAuthRequired: true,
};

export default CheckAuth;
