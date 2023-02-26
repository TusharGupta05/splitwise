import { Button, Table } from 'antd';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import {
  EXPENSE_DETAILS,
  DESCRIPTORS,
} from '../../../../constants/expenseDetails.constants';
import filterTransactions from '../../../../helpers/filterTransactions';

const Transactions = () => {
  // const { EXPENSE_DETAILS, DESCRIPTORS } = EXP;
  const [currentUser, transactions] = useSelector((reduxStore) => [
    reduxStore.auth.currentUser,
    reduxStore.transactions,
  ]);
  const filteredTransactions = transactions.filter(
    filterTransactions(currentUser)
  );
  const renderSplitBetween = useCallback((_, { splitBetween }) => {
    return splitBetween.map((username) => (
      <Button key={username}>{username}</Button>
    ));
  }, []);

  return (
    <Table
      dataSource={filteredTransactions.map((transaction, index) => ({
        ...transaction,
        key: index,
      }))}
      columns={Object.values(EXPENSE_DETAILS).map((col) => ({
        title: DESCRIPTORS[col],
        dataIndex: col,
        key: col,
        render:
          col === EXPENSE_DETAILS.SPLIT_BETWEEN ? renderSplitBetween : null,
      }))}
      pagination={{ pageSize: 5 }}
    ></Table>
  );
};

export default Transactions;
