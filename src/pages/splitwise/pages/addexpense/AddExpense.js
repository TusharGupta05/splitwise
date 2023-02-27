import React, { useCallback } from 'react';
import styles from './addexpense.module.css';
import { EXPENSE_DETAILS } from '../../../../constants/expenseDetails.constants';
import { useDispatch, useSelector } from 'react-redux';
import SelectUsers from '../../components/selectusers';
import NumberInput from '../../components/numberinput';
import { Button, Form, Input } from 'antd';
import TRANSACTIONS_REDUCER from '../../../../redux/constants/transactionsReducers.actionTypes';

const AddExpense = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const currentUser = useSelector((reduxStore) => reduxStore.auth.currentUser);
  const expenseDetails = useCallback(
    (currentUser) => ({
      [EXPENSE_DETAILS.AMOUNT]: null,
      [EXPENSE_DETAILS.DESCRIPTION]: '',
      [EXPENSE_DETAILS.SPLIT_BETWEEN]: [],
      [EXPENSE_DETAILS.PAID_BY]: currentUser,
    }),
    []
  );

  const initialExpenseDetails = expenseDetails(currentUser);

  const handleSubmit = useCallback(
    (expenseDetails) => {
      dispatch({
        type: TRANSACTIONS_REDUCER.ADD_EXPENSE,
        payload: expenseDetails,
      });
    },
    [dispatch]
  );
  const handleChange = useCallback(
    (name) => (newValue) => {
      form.setFieldValue(name, newValue);
    },
    [form]
  );

  return (
    <div className={styles.container}>
      <h4>Add a new expense</h4>
      <div className={styles['inner-container']}></div>
      <Form
        initialValues={initialExpenseDetails}
        form={form}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
        layout='horizontal'
        style={{ maxWidth: 600 }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name={EXPENSE_DETAILS.AMOUNT}
          label='Enter amount'
          rules={[
            {
              required: true,
              message: 'This field cannot be empty',
            },
          ]}
        >
          <NumberInput
            form={form}
            name={EXPENSE_DETAILS.AMOUNT}
            handleChange={handleChange(EXPENSE_DETAILS.AMOUNT)}
            addonBefore={'₹'}
            min={1}
          />
        </Form.Item>
        <Form.Item
          name={EXPENSE_DETAILS.SPLIT_BETWEEN}
          label='Split Between'
          rules={[
            {
              required: true,
              message: 'This field cannot be empty',
            },
          ]}
        >
          <SelectUsers
            mode='multiple'
            placeholder={'Select friends....'}
            name={EXPENSE_DETAILS.SPLIT_BETWEEN}
            form={form}
            handleChange={handleChange(EXPENSE_DETAILS.SPLIT_BETWEEN)}
          />
        </Form.Item>
        <Form.Item
          label='Paid by'
          name={EXPENSE_DETAILS.PAID_BY}
          rules={[
            {
              required: true,
              message: 'This field cannot be empty',
            },
          ]}
        >
          <SelectUsers
            handleChange={handleChange(EXPENSE_DETAILS.PAID_BY)}
            initialState={initialExpenseDetails[EXPENSE_DETAILS.PAID_BY]}
            name={EXPENSE_DETAILS.PAID_BY}
            form={form}
          />
        </Form.Item>
        <Form.Item
          name={EXPENSE_DETAILS.DESCRIPTION}
          label='Description'
          rules={[
            {
              required: true,
              message: 'This field cannot be empty',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 14, offset: 8 }}>
          <Button type='primary' htmlType='submit'>
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddExpense;
