import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import USER_PROFILE from '../../../../constants/userProfile.constants';
import AUTH_REDUCERS from '../../../../redux/constants/authReducers.actionTypes';
const Register = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: AUTH_REDUCERS.REGISTER, payload: user });
  };

  const handleChange = (e) => {
    const newUser = { ...user };
    newUser[e.target.name] = e.target.value;
    setUser(newUser);
  };
  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor={USER_PROFILE.NAME}>
            Name:
            <input
              id={USER_PROFILE.NAME}
              name={USER_PROFILE.NAME}
              value={user.name || ''}
              type='text'
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor={USER_PROFILE.USERNAME}>
            Username:
            <input
              id={USER_PROFILE.USERNAME}
              name={USER_PROFILE.USERNAME}
              value={user.username || ''}
              type='text'
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor={USER_PROFILE.EMAIL}>
            Email:
            <input
              id={USER_PROFILE.EMAIL}
              name={USER_PROFILE.EMAIL}
              value={user.email || ''}
              type={USER_PROFILE.EMAIL}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label htmlFor={USER_PROFILE.PASSWORD}>
            {' '}
            Password:
            <input
              id={USER_PROFILE.PASSWORD}
              name={USER_PROFILE.PASSWORD}
              value={user.password || ''}
              type={USER_PROFILE.PASSWORD}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <input type='submit' />
        </div>
      </form>
    </div>
  );
};

export default Register;
