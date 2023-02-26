import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authSlice from '../../../../redux/slices/auth';

const Login = () => {
  const dispatch = useDispatch();
  const [loginCreds, setLoginCreds] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authSlice.actions.onLogin(loginCreds));
  };
  const handleChange = (e) => {
    setLoginCreds({ ...loginCreds, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h4>Login</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name='username'
            type='text'
            value={loginCreds['username'] || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name='password'
            type='password'
            value={loginCreds['password'] || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <button> Submit </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
