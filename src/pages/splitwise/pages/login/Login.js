import { Form, Input, Button, Card } from 'antd';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import authSlice from '../../../../redux/slices/auth';
import styles from './login.module.css';
import USER_PROFILE from '../../../../constants/userProfile.constants';
import { NavLink } from 'react-router-dom';
import AUTH_ERRORS from '../../../../constants/authErrors.constants';
import ROUTES from '../../constants/routes';
import VALIDATION_RULES from '../../../../constants/validationRules';
const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    (e) => {
      try {
        dispatch(authSlice.actions.onLogin(e));
      } catch (err) {
        form.setFields([
          {
            name: USER_PROFILE.PASSWORD,
            errors: [err],
          },
        ]);
      }
    },
    [dispatch]
  );
  return (
    <div className={styles['container']}>
      <Card className={styles['login-form']}>
        <Form
          form={form}
          name='normal_login'
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name={USER_PROFILE.USERNAME}
            rules={VALIDATION_RULES.USERNAME}
          >
            <Input prefix={<UserOutlined />} placeholder='Username' />
          </Form.Item>
          <Form.Item
            name={USER_PROFILE.PASSWORD}
            rules={[{ required: true, message: AUTH_ERRORS.PASSWORD }]}
          >
            <Input
              prefix={<LockOutlined />}
              type='password'
              placeholder='Password'
            />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
              className={styles['login-form-button']}
            >
              Log in
            </Button>
          </Form.Item>
          <Form.Item>
            Or
            <NavLink to={ROUTES.REGISTER_ROUTE}> Register Now!</NavLink>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
