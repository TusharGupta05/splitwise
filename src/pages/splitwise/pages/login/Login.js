import { Form, Input, Button, Card } from 'antd';

import { LockOutlined, UserOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styles from './login.module.css';
import USER_PROFILE from '../../../../constants/userProfile.constants';
import AUTH_ERRORS from '../../../../constants/authErrors.constants';
import ROUTES from '../../constants/routes';
import VALIDATION_RULES from '../../../../constants/authDetailsValidationRules';
import AUTH_REDUCER from '../../../../redux/constants/authReducer.actionTypes';

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const handleSubmit = useCallback(
    (loginCreds) => {
      try {
        dispatch({ type: AUTH_REDUCER.HANDLE_LOGIN, payload: loginCreds });
      } catch (err) {
        form.setFields([
          {
            name: USER_PROFILE.PASSWORD,
            errors: [err.message],
          },
        ]);
      }
    },
    [dispatch, form],
  );

  return (
    <div className={styles.container}>
      <div className={styles.headingTextContainer}>
      <span className={styles.headingText}>Split</span>
      <span className={styles.headingText2}>wise</span>
      </div>
      <Card className={styles.loginForm}>
        <Form form={form} name="normal_login" initialValues={{ remember: true }} onFinish={handleSubmit}>
          <Form.Item name={USER_PROFILE.USERNAME} rules={VALIDATION_RULES.USERNAME}>
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item name={USER_PROFILE.PASSWORD} rules={[{ required: true, message: AUTH_ERRORS.PASSWORD }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.loginFormButton}>
              Log in
            </Button>
          </Form.Item>
          <Form.Item>
            Don't have an account?
            <NavLink to={ROUTES.REGISTER_ROUTE}> Register Now!</NavLink>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
