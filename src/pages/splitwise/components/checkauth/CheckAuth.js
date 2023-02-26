import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import ROUTES from '../../constants/routes';

const CheckAuth = ({ isAuthRequired }) => {
  const currentUser = useSelector((reduxStore) => {
    return reduxStore.auth.currentUser;
  });

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
