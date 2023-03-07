import { Card } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { EXPENSE_DETAILS } from '../../../../constants/expenseDetails.constants';
import { REDUCER_NAMES } from '../../../../constants/reducers.constants';
import calculateSplittedAmounts from '../../../../helpers/calculateSplittedAmounts';
import filterTransactions from '../../../../helpers/filterTransactions';
import floatToFixed from '../../../../helpers/floatToFixed';
import NoExpense from './components/NoExpense';
import styles from './dashboard.module.css';

const Dashboard = () => {
  const [currentUser, transactions] = useSelector((reduxStore) => [
    reduxStore[REDUCER_NAMES.AUTH].currentUser,
    reduxStore[REDUCER_NAMES.TRANSACTIONS],
  ]);
  const filteredTransactions = transactions.filter(filterTransactions(currentUser));

  const records = {};

  filteredTransactions.forEach((transaction) => {
    const splittedAmounts = calculateSplittedAmounts({ ...transaction });

    if (transaction[EXPENSE_DETAILS.PAID_BY] === currentUser) {
      transaction[EXPENSE_DETAILS.SPLIT_BETWEEN].forEach((user) => {
        if (user !== currentUser) {
          if (records[user] !== undefined) {
            records[user] -= splittedAmounts[user];
          } else {
            records[user] = -splittedAmounts[user];
          }
        }
      });
    } else {
      const user = transaction[EXPENSE_DETAILS.PAID_BY];
      if (records[user]) {
        records[user] += splittedAmounts[currentUser];
      } else {
        records[user] = splittedAmounts[currentUser];
      }
    }
  });
  const youOwe = floatToFixed(Object.values(records).reduce((total, currentValue) => total + Math.max(0, currentValue), 0));
  const youAreOwed = floatToFixed(Object.values(records).reduce((total, currentValue) => total + Math.abs(Math.min(0, currentValue)), 0));
  return (
    <div className={styles.container}>
      <div className={styles.statusContainer}>
        <Card>
          <div>You Owe:{` ₹${youOwe}`}</div>
        </Card>
        <Card>
          <div>You are Owed:{` ₹${youAreOwed}`}</div>
        </Card>
      </div>
      <div className={styles.innerContainer}>
        <h3>Summary: </h3>
        {Object.entries(records).map(([user, amount]) =>
          amount === 0 ? null : (
            <Card style={{ margin: '10px 0px 10px 0px' }} key={user}>
              {amount > 0 ? `You owe ${user} ₹` : `${user} owes you ₹`}
              {Math.abs(floatToFixed(amount))}
            </Card>
          ),
        )}
        {youOwe === 0 && youAreOwed === 0 && <NoExpense />}
      </div>
    </div>
  );
};

export default Dashboard;
