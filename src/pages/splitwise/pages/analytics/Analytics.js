import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { REDUCER_NAMES } from '../../../../constants/reducers.constants';
import filterTransactions from '../../../../helpers/filterTransactions';

const Analytics = () => {
  const [{ currentUser }, allTransactions] = useSelector(
    (reduxStore) => [reduxStore[REDUCER_NAMES.AUTH], reduxStore[REDUCER_NAMES.TRANSACTIONS]],
    shallowEqual,
  );

  const filteredTransactions = allTransactions.filter(filterTransactions(currentUser));
  return <Outlet context={[currentUser, filteredTransactions]} />;
};

export default Analytics;
