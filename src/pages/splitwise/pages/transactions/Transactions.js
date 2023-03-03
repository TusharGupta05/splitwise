import { Table } from 'antd';
import React, { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import _debounce from 'lodash/debounce';
import { useSearchParams } from 'react-router-dom';
import SelectUsers from '../../components/selectusers';
import EditableComponent from './components/EditableComponent';
import { EXPENSE_DETAILS, DESCRIPTORS } from '../../../../constants/expenseDetails.constants';
import { REDUCER_NAMES } from '../../../../constants/reducers.constants';
import TRANSACTIONS_REDUCER from '../../../../redux/constants/transactionsReducer.actionTypes';
import NumberInput from '../../components/numberinput/NumberInput';
import TextInput from '../../components/textinput/TextInput';
import reduxStore from '../../../../redux';
import USER_PROFILE from '../../../../constants/userProfile.constants';

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
  const [filterParams, setFilterParams] = useSearchParams({});
  const dispatch = useDispatch();
  const transactionsNum = useSelector((store) => store[REDUCER_NAMES.TRANSACTIONS].length, shallowEqual);
  const { registeredUsers } = reduxStore.getState()[REDUCER_NAMES.AUTH];

  const transactions = Array.from([...Array(transactionsNum).keys()].map((val) => ({ key: val })));
  const handleChange = useCallback(
    (index, key) =>
      _debounce((value) => {
        dispatch({ type: TRANSACTIONS_REDUCER.HANDLE_UPDATE_EXPENSE, payload: { index, key, value } });
      }, 1000),
    [dispatch],
  );
  const filters = registeredUsers.map((registeredUser) => ({
    text: registeredUser[USER_PROFILE.USERNAME],
    value: registeredUser[USER_PROFILE.USERNAME],
  }));

  return (
    <Table
      dataSource={transactions}
      columns={Object.values(EXPENSE_DETAILS).map((column) => ({
        title: DESCRIPTORS[column],
        dataIndex: column,
        key: column,
        width: column === EXPENSE_DETAILS.SPLIT_BETWEEN ? '200px' : '50px',
        render: renderColumn(column, handleChange),
        filters: EXPENSE_DETAILS.PAID_BY === column || EXPENSE_DETAILS.SPLIT_BETWEEN === column ? filters : null,
        sorter:
          column === EXPENSE_DETAILS.AMOUNT
            ? (record1, record2) =>
                reduxStore.getState()[REDUCER_NAMES.TRANSACTIONS][record1.key][column] -
                reduxStore.getState()[REDUCER_NAMES.TRANSACTIONS][record2.key][column]
            : null,
        defaultSortOrder: column === EXPENSE_DETAILS.AMOUNT && filterParams.getAll(column) ? filterParams.getAll(column)[0] : undefined,
        sortDirections: column === EXPENSE_DETAILS.AMOUNT ? ['ascend', 'descend'] : null,
        defaultFilteredValue:
          (column === EXPENSE_DETAILS.PAID_BY || column === EXPENSE_DETAILS.SPLIT_BETWEEN) && filterParams.getAll(column).length > 0
            ? filterParams.getAll(column)
            : null,
        onFilter: (value, record) => {
          if (column === EXPENSE_DETAILS.PAID_BY && reduxStore.getState()[REDUCER_NAMES.TRANSACTIONS][record.key][column] === value) {
            return true;
          } else if (
            column === EXPENSE_DETAILS.SPLIT_BETWEEN &&
            reduxStore.getState()[REDUCER_NAMES.TRANSACTIONS][record.key][column].findIndex((user) => user === value) !== -1
          ) {
            return true;
          }
          return false;
        },
      }))}
      onChange={(_, fil, sortOrder) => {
        const newFilters = Object.keys(fil)
          .filter((key) => fil[key] !== null)
          .reduce((prev, key) => ({ ...prev, [key]: fil[key] }), filterParams);
        if (sortOrder && sortOrder.order) {
          newFilters[EXPENSE_DETAILS.AMOUNT] = [sortOrder.order];
        }
        setFilterParams(newFilters);
      }}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default Transactions;
