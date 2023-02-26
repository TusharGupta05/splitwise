import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Transactions from './pages/transactions';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import CheckAuth from './components/checkauth/CheckAuth';
import NavBars from './components/navbars';
import ROUTES from './constants/routes';
import AddExpense from './pages/addexpense';

const Splitwise = () => {
  return (
    <Routes>
      <Route element={<CheckAuth isAuthRequired={false} />}>
        <Route path={ROUTES.LOGIN_ROUTE} element={<Login />}></Route>
        <Route path={ROUTES.REGISTER_ROUTE} element={<Register />}></Route>
      </Route>
      <Route element={<CheckAuth isAuthRequired={true} />}>
        <Route element={<NavBars />}>
          <Route path={ROUTES.LOGOUT_ROUTE} element={<Login />}></Route>
          <Route path={ROUTES.PROFILE_ROUTE} element={<Profile />}></Route>
          <Route path={ROUTES.DASHBOARD_ROUTE} element={<Dashboard />}></Route>
          <Route
            path={ROUTES.TRANSACTIONS_ROUTE}
            element={<Transactions />}
          ></Route>
          <Route
            path={ROUTES.ADD_EXPENSE_ROUTE}
            element={<AddExpense />}
          ></Route>
        </Route>
      </Route>
      <Route
        path='*'
        element={<Navigate to={ROUTES.DASHBOARD_ROUTE} />}
      ></Route>
    </Routes>
  );
};

export default Splitwise;
