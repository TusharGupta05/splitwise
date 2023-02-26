import { Card } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import { EXPENSE_DETAILS } from '../../../../constants/expenseDetails.constants';
import NoExpense from './components/NoExpense';
import styles from './dashboard.module.css';
const Dashboard = () => {
  const [currentUser, transactions] = useSelector((reduxStore) => [
    reduxStore.auth.currentUser,
    reduxStore.transactions,
  ]);
  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction[EXPENSE_DETAILS.PAID_BY] === currentUser ||
      transaction[EXPENSE_DETAILS.SPLIT_BETWEEN].find(
        (user) => user === currentUser
      )
  );

  const records = {};

  filteredTransactions.forEach((transaction) => {
    const splitBetweenCount = transaction[EXPENSE_DETAILS.SPLIT_BETWEEN].length;
    const splittedAmount =
      transaction[EXPENSE_DETAILS.AMOUNT] / splitBetweenCount;
    if (transaction[EXPENSE_DETAILS.PAID_BY] === currentUser) {
      transaction[EXPENSE_DETAILS.SPLIT_BETWEEN].forEach((user) => {
        if (user !== currentUser) {
          if (records[user] !== undefined) {
            records[user] -= splittedAmount;
          } else {
            records[user] = -splittedAmount;
          }
        }
      });
    } else {
      const user = transaction[EXPENSE_DETAILS.PAID_BY];
      if (records[user]) {
        records[user] += splittedAmount;
      } else {
        records[user] = splittedAmount;
      }
    }
  });
  const youOwe = Object.values(records).reduce(
    (total, currentValue) => (total += Math.max(0, currentValue)),
    0
  );
  const youAreOwed = Object.values(records).reduce(
    (total, currentValue) => (total += Math.abs(Math.min(0, currentValue))),
    0
  );
  return (
    <div className={styles.container}>
      <div className={styles['status-container']}>
        <Card>
          <div>You Owe:{` ₹${youOwe}`}</div>
        </Card>
        <Card>
          <div>You are Owed:{` ₹${youAreOwed}`}</div>
        </Card>
      </div>
      <div className={styles['inner-container']}>
        <h3>Summary: </h3>
        {Object.entries(records).map(([user, amount]) =>
          amount === 0 ? null : (
            <Card style={{ margin: '10px 0px 10px 0px' }} key={user}>
              {amount > 0 ? `You owe ${user} ₹` : `${user} owes you ₹`}
              {Math.abs(amount)}
            </Card>
          )
        )}
        {youOwe === 0 && youAreOwed === 0 && <NoExpense />}
      </div>
    </div>
  );
};

export default Dashboard;
