import { Table } from 'antd';
import React, { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import _debounce from 'lodash/debounce';
import SelectUsers from '../../components/selectusers';
import EditableComponent from './components/EditableComponent';
import { EXPENSE_DETAILS, DESCRIPTORS } from '../../../../constants/expenseDetails.constants';
import { REDUCER_NAMES } from '../../../../constants/reducers.constants';
import TRANSACTIONS_REDUCER from '../../../../redux/constants/transactionsReducer.actionTypes';
import NumberInput from '../../components/numberinput/NumberInput';
import TextInput from '../../components/textinput/TextInput';

const renderColumn =
  (property, handleChange) =>
  (_, { key: index }) => {
    const onChange = handleChange(index, property);
    const path = [REDUCER_NAMES.TRANSACTIONS, index, property];
    const childComponentProps = { onChange };
    switch (property) {
      case EXPENSE_DETAILS.PAID_BY:
        return <EditableComponent path={path} {...{ childComponentProps }} component={SelectUsers} />;
      case EXPENSE_DETAILS.AMOUNT:
        return <EditableComponent path={path} {...{ childComponentProps }} component={NumberInput} />;
      case EXPENSE_DETAILS.SPLIT_BETWEEN:
        childComponentProps.mode = 'multiple';
        return <EditableComponent path={path} {...{ childComponentProps }} component={SelectUsers} />;
      case EXPENSE_DETAILS.DESCRIPTION:
        return <EditableComponent path={path} {...{ childComponentProps }} component={TextInput} />;
      default:
        return null;
    }
  };

const Transactions = () => {
  const dispatch = useDispatch();
  const transactionsNum = useSelector((reduxStore) => reduxStore[REDUCER_NAMES.TRANSACTIONS].length, shallowEqual);

  const transactions = Array.from([...Array(transactionsNum).keys()].map((val) => ({ key: val })));
  const handleChange = useCallback(
    (index, key) =>
      _debounce((value) => {
        dispatch({ type: TRANSACTIONS_REDUCER.HANDLE_UPDATE_EXPENSE, payload: { index, key, value } });
      }, 1000),
    [dispatch],
  );

  return (
    <Table
      dataSource={transactions}
      columns={Object.values(EXPENSE_DETAILS).map((column) => ({
        title: DESCRIPTORS[column],
        dataIndex: column,
        key: column,
        width: column === EXPENSE_DETAILS.SPLIT_BETWEEN ? '200px' : '50px',
        render: renderColumn(column, handleChange),
      }))}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default Transactions;
