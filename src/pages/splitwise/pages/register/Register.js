import { Form, Card, Input, Button } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { LockOutlined, UserOutlined, MailOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';
import USER_PROFILE from '../../../../constants/userProfile.constants';
import styles from './register.module.css';
import AUTH_ERRORS from '../../../../constants/authErrors.constants';
import ROUTES from '../../constants/routes';
import VALIDATION_RULES from '../../../../constants/authDetailsValidationRules';
import AUTH_REDUCER from '../../../../redux/constants/authReducer.actionTypes';

const Register = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const handleSubmit = useCallback(
    (user) => {
      try {
        dispatch({ type: AUTH_REDUCER.HANDLE_REGISTER, payload: user });
        navigate(ROUTES.LOGIN_ROUTE);
      } catch (err) {
        form.setFields([
          {
            name: USER_PROFILE.USERNAME,
            errors: [err.message],
          },
        ]);
      }
    },
    [dispatch, form, navigate],
  );

  return (
    <div className={styles.container}>
      <Card className={styles.registerForm}>
        <Form form={form} initialValues={{ remember: true }} onFinish={handleSubmit}>
          <Form.Item name={USER_PROFILE.NAME} rules={VALIDATION_RULES.NAME}>
            <Input prefix={<UserOutlined />} placeholder="Name" />
          </Form.Item>
          <Form.Item name={USER_PROFILE.USERNAME} rules={VALIDATION_RULES.USERNAME}>
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item name={USER_PROFILE.EMAIL} rules={VALIDATION_RULES.EMAIL}>
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name={USER_PROFILE.PASSWORD} rules={[{ required: true, message: AUTH_ERRORS.EMPTY_PASSWORD }]}>
            <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item name="submit">
            <Button type="primary" htmlType="submit" className={styles.registerFormButton}>
              Register
            </Button>
          </Form.Item>
          <Form.Item>
            Or
            <NavLink to={ROUTES.LOGIN_ROUTE}> Login!</NavLink>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
