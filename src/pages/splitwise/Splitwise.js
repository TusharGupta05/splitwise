import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import Transactions from './pages/transactions';
import Login from './pages/login';
import Register from './pages/register';
import Profile from './pages/profile';
import CheckAuth from './components/checkauth/CheckAuth';
import ROUTES from './constants/routes';
import AddExpense from './pages/addexpense';
import Analytics from './pages/analytics';
import CategoricalAnalytics from './pages/analytics/categoricalanalytics/CategoricalAnalytics';
import AllExpenses from './pages/analytics/allexpensesanalytics/AllExpenses';
import AppSkeleton from './components/appSkeleton/AppSkeleton';

const Splitwise = () => (
  <Routes>
    <Route element={<CheckAuth isAuthRequired={false} />}>
      <Route path={ROUTES.LOGIN_ROUTE} element={<Login />} />
      <Route path={ROUTES.REGISTER_ROUTE} element={<Register />} />
    </Route>
    <Route element={<CheckAuth isAuthRequired />}>
      <Route element={<AppSkeleton />}>
        <Route path={ROUTES.LOGOUT_ROUTE} element={<Login />} />
        <Route path={ROUTES.PROFILE_ROUTE} element={<Profile />} />
        <Route path={ROUTES.DASHBOARD_ROUTE} element={<Dashboard />} />
        <Route path={ROUTES.TRANSACTIONS_ROUTE} element={<Transactions />} />
        <Route path={ROUTES.ADD_EXPENSE_ROUTE} element={<AddExpense />} />
        <Route path={ROUTES.ANALYTICS} element={<Analytics />}>
          <Route path={ROUTES.CATEGORIES_ANALYTICS} element={<CategoricalAnalytics />} />
          <Route path={ROUTES.ALL_EXPENSES_ANALYTICS} element={<AllExpenses />} />
        </Route>
      </Route>
    </Route>
    <Route path="*" element={<Navigate to={ROUTES.DASHBOARD_ROUTE} />} />
  </Routes>
);

export default Splitwise;
