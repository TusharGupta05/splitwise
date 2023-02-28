import { Form, Card, Input, Button } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import USER_PROFILE from '../../../../constants/userProfile.constants';
import { UserOutlined, MailOutlined } from '@ant-design/icons';
import styles from './profile.module.css';
import VALIDATION_RULES from '../../../../constants/validationRules';
import AUTH_REDUCER from '../../../../redux/constants/authReducer.actionTypes';
import { REDUCER_NAMES } from '../../../../constants/reducers.constants';

const Profile = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const initialUserDetails = useSelector((reduxStore) => {
    const currentUser = reduxStore[REDUCER_NAMES.AUTH].currentUser;
    const { password, ...profile } = reduxStore[
      REDUCER_NAMES.AUTH
    ].registeredUsers.find((registeredUser) => {
      return registeredUser.username === currentUser;
    });
    return profile;
  });
  const handleSubmit = useCallback(
    (user) => {
      dispatch({ type: AUTH_REDUCER.HANDLE_UPDATE_PROFILE, payload: user });
    },
    [dispatch]
  );

  return (
    <div className={styles.container}>
      <Form
        form={form}
        initialValues={initialUserDetails}
        onFinish={handleSubmit}
      >
        <Form.Item name={USER_PROFILE.NAME} rules={VALIDATION_RULES.NAME}>
          <Input prefix={<UserOutlined />} placeholder='Name' />
        </Form.Item>
        <Form.Item
          name={USER_PROFILE.USERNAME}
          rules={VALIDATION_RULES.USERNAME}
        >
          <Input prefix={<UserOutlined />} placeholder='Username' disabled />
        </Form.Item>
        <Form.Item name={USER_PROFILE.EMAIL} rules={VALIDATION_RULES.EMAIL}>
          <Input prefix={<MailOutlined />} placeholder='Email' />
        </Form.Item>

        <Form.Item name='submit'>
          <Button
            type='primary'
            htmlType='submit'
            className={styles.profileFormButton}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
