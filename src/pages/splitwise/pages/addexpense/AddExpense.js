import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, Row, Form, Input, Radio, Card, DatePicker } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import styles from './addexpense.module.css';
import { EXPENSE_DETAILS } from '../../../../constants/expenseDetails.constants';
import SelectUsers from '../../components/selectusers';
import NumberInput from '../../components/numberinput';
import TRANSACTIONS_REDUCER from '../../../../redux/constants/transactionsReducer.actionTypes';
import ROUTES from '../../constants/routes';
import EditableComponent from '../transactions/components/EditableComponent';
import { REDUCER_NAMES } from '../../../../constants/reducers.constants';
import { SPLIT_TYPES, SPLIT_TYPES_DESCRIPTORS } from '../../../../constants/splitTypes.constants';
import EXPENSE_DETAILS_VALIDATION_RULES from '../../../../constants/expenseDetailsValidationRules.constants';

import floatToFixed from '../../../../helpers/floatToFixed';
import calculateSplittedAmounts from '../../../../helpers/calculateSplittedAmounts';
import CATEGORY_OPTIONS from '../../constants/categories.constants';
import EditableSelect from '../../components/editableselect/EditableSelect';

const AddExpense = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialExpenseDetails = {
    [EXPENSE_DETAILS.AMOUNT]: null,
    [EXPENSE_DETAILS.DESCRIPTION]: '',
    [EXPENSE_DETAILS.SPLIT_BETWEEN]: [],
    [EXPENSE_DETAILS.PAID_BY]: '',
    [EXPENSE_DETAILS.CATEGORY]: '',
    [EXPENSE_DETAILS.SPLIT_TYPE]: SPLIT_TYPES.EQUAL,
    [EXPENSE_DETAILS.SPLITTED_PARTS]: {},
    [EXPENSE_DETAILS.DATE]: dayjs(),
  };

  const handleSubmit = useCallback(
    ({ total, ...expenseDetails }) => {
      dispatch({
        type: TRANSACTIONS_REDUCER.HANDLE_ADD_EXPENSE,
        payload: expenseDetails,
      });
      navigate(ROUTES.DASHBOARD_ROUTE);
    },
    [dispatch, navigate],
  );
  const handleChange = useCallback(
    (name) => (newValue) => {
      form.setFieldValue(name, newValue);
      const oldSplittedAmounts = form.getFieldValue(EXPENSE_DETAILS.SPLITTED_PARTS);
      const newSplittedAmounts = calculateSplittedAmounts({
        ...form.getFieldsValue([EXPENSE_DETAILS.AMOUNT, EXPENSE_DETAILS.SPLITTED_PARTS, EXPENSE_DETAILS.SPLIT_BETWEEN, EXPENSE_DETAILS.SPLIT_TYPE]),
      });
      if (oldSplittedAmounts !== newSplittedAmounts && form.getFieldValue(EXPENSE_DETAILS.SPLIT_TYPE) === SPLIT_TYPES.EQUAL) {
        form.setFieldValue(EXPENSE_DETAILS.SPLITTED_PARTS, newSplittedAmounts);
      }
    },
    [form],
  );

  const handleCategoryChange = useCallback((newCategory) => handleChange(EXPENSE_DETAILS.CATEGORY)(newCategory.value), [handleChange]);

  return (
    <div className={styles.container}>
      <h4>Add a new expense</h4>
      <div className={styles.innerContainer} />
      <Form
        initialValues={initialExpenseDetails}
        form={form}
        style={{ width: '100%' }}
        labelCol={{ span: 16 }}
        wrapperCol={{ span: 12 }}
        layout="horizontal"
        onFinish={handleSubmit}
      >
        <Row>
          <Col span={10} offset={2}>
            <Form.Item name={EXPENSE_DETAILS.AMOUNT} label="Enter amount" rules={EXPENSE_DETAILS_VALIDATION_RULES[EXPENSE_DETAILS.AMOUNT]}>
              <NumberInput
                onChange={handleChange(EXPENSE_DETAILS.AMOUNT)}
                form={form}
                style={{ width: '85%' }}
                name={EXPENSE_DETAILS.AMOUNT}
                addonBefore="₹"
                min={1}
              />
            </Form.Item>
            <Form.Item label="Paid by" name={EXPENSE_DETAILS.PAID_BY} rules={EXPENSE_DETAILS_VALIDATION_RULES[EXPENSE_DETAILS.PAID_BY]}>
              <EditableComponent
                path={[REDUCER_NAMES.AUTH, 'currentUser']}
                childComponentProps={{
                  onChange: handleChange(EXPENSE_DETAILS.PAID_BY),
                  form,
                  name: EXPENSE_DETAILS.PAID_BY,
                  style: { width: '85%' },
                }}
                component={SelectUsers}
              />
            </Form.Item>
            <Form.Item name={EXPENSE_DETAILS.DATE} label="Date">
              <DatePicker allowClear={false} style={{ width: '85%' }} />
            </Form.Item>
            <Form.Item label="Category" rules={EXPENSE_DETAILS_VALIDATION_RULES[EXPENSE_DETAILS.CATEGORY]} name={EXPENSE_DETAILS.CATEGORY}>
              <EditableSelect
                style={{ width: '85%' }}
                onChange={handleCategoryChange}
                options={CATEGORY_OPTIONS.map((option) => ({ value: option.toLowerCase(), label: option }))}
              />
            </Form.Item>
            <Form.Item
              name={EXPENSE_DETAILS.SPLIT_BETWEEN}
              label="Split Between"
              rules={EXPENSE_DETAILS_VALIDATION_RULES[EXPENSE_DETAILS.SPLIT_BETWEEN]}
            >
              <SelectUsers
                mode="multiple"
                placeholder="Select friends...."
                style={{ width: '85%' }}
                name={EXPENSE_DETAILS.SPLIT_BETWEEN}
                form={form}
                onChange={handleChange(EXPENSE_DETAILS.SPLIT_BETWEEN)}
              />
            </Form.Item>

            <Form.Item name={EXPENSE_DETAILS.DESCRIPTION} label="Description" rules={EXPENSE_DETAILS_VALIDATION_RULES[EXPENSE_DETAILS.DESCRIPTION]}>
              <Input style={{ width: '85%' }} />
            </Form.Item>
          </Col>
          <Col span={10} offset={2}>
            <Form.Item name={EXPENSE_DETAILS.SPLIT_TYPE} labelCol={{ offset: 0 }} labelAlign="left" label="Split Type">
              <Radio.Group onChange={(event) => handleChange(EXPENSE_DETAILS.SPLIT_TYPE)(event.target.value)}>
                {Object.entries(SPLIT_TYPES_DESCRIPTORS).map(([splitType, descriptor]) => (
                  <Radio.Button key={splitType} value={splitType}>
                    {descriptor}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              labelCol={{ span: 11 }}
              wrapperCol={{ span: 11 }}
              form={form}
              style={{ textAlign: 'left', alignItems: 'start' }}
              shouldUpdate={(prevForm, curForm) => {
                if (
                  prevForm[EXPENSE_DETAILS.AMOUNT] !== curForm[EXPENSE_DETAILS.AMOUNT] ||
                  prevForm[EXPENSE_DETAILS.SPLIT_BETWEEN] !== curForm[EXPENSE_DETAILS.SPLIT_BETWEEN] ||
                  (prevForm[EXPENSE_DETAILS.SPLIT_TYPE] !== curForm[EXPENSE_DETAILS.SPLIT_TYPE] &&
                    (prevForm[EXPENSE_DETAILS.SPLIT_TYPE] === SPLIT_TYPES.EQUAL || curForm[EXPENSE_DETAILS.SPLIT_TYPE] === SPLIT_TYPES.EQUAL))
                ) {
                  return true;
                }
                return false;
              }}
            >
              {({ getFieldValue, getFieldsValue }) => {
                const newSplittedAmounts = calculateSplittedAmounts({ ...getFieldsValue(Object.values(EXPENSE_DETAILS)) });

                if (Object.keys(newSplittedAmounts).length === 0) {
                  return <Card>Select one or more friends to split the amount</Card>;
                }
                const defaultValues =
                  getFieldValue(EXPENSE_DETAILS.SPLIT_TYPE) === SPLIT_TYPES.EQUAL
                    ? newSplittedAmounts
                    : getFieldValue(EXPENSE_DETAILS.SPLITTED_PARTS);

                return getFieldValue(EXPENSE_DETAILS.SPLIT_BETWEEN)?.map((user) => (
                  <Form.Item
                    name={[EXPENSE_DETAILS.SPLITTED_PARTS, user]}
                    key={user + (defaultValues[user] ?? 0)}
                    form={form}
                    labelCol={{ span: 7 }}
                    wrapperCol={{ span: 14 }}
                    label={user}
                  >
                    <NumberInput
                      value={floatToFixed(defaultValues[user] ?? 0)}
                      onChange={handleChange([EXPENSE_DETAILS.SPLITTED_PARTS, user])}
                      disabled={form.getFieldValue(EXPENSE_DETAILS.SPLIT_TYPE) === SPLIT_TYPES.EQUAL}
                      form={form}
                    />
                  </Form.Item>
                ));
              }}
            </Form.Item>
            <Form.Item
              labelCol={{ span: 11 }}
              wrapperCol={{ span: 13 }}
              form={form}
              style={{ textAlign: 'left', alignItems: 'start' }}
              shouldUpdate={(prevForm, curForm) => {
                const oldSplittedAmounts = calculateSplittedAmounts({ ...prevForm });
                const newSplittedAmounts = calculateSplittedAmounts({ ...curForm });
                return oldSplittedAmounts !== newSplittedAmounts;
              }}
            >
              {({ getFieldValue, getFieldsValue }) => {
                const newSplittedAmounts = calculateSplittedAmounts({ ...getFieldsValue(Object.values(EXPENSE_DETAILS)) });
                const total = floatToFixed(Object.values(newSplittedAmounts).reduce((acc, currVal) => acc + currVal, 0));
                const remaining = floatToFixed(getFieldValue(EXPENSE_DETAILS.AMOUNT) - total);

                if (Object.keys(newSplittedAmounts).length === 0) {
                  return null;
                }
                return (
                  <Form.Item
                    name="total"
                    wrapperCol={{ span: 14, offset: 3 }}
                    rules={[
                      {
                        validator: () =>
                          total === getFieldValue(EXPENSE_DETAILS.AMOUNT) && remaining === 0
                            ? Promise.resolve()
                            : Promise.reject(new Error('The total should be equal to the amount entered.')),
                      },
                    ]}
                  >
                    <Card>
                      {`Total: ${total}`}
                      <br />
                      {`Remaining: ${remaining}`}
                    </Card>
                  </Form.Item>
                );
              }}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ offset: 12 }}>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddExpense;
