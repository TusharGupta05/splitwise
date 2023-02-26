import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import USER_PROFILE from '../../../../constants/userProfile.constants';
import authSlice from '../../../../redux/slices/auth/auth';

const Profile = () => {
  const currentUser = useSelector((reduxStore) =>
    reduxStore.auth.registeredUsers.find(
      (registeredUser) =>
        registeredUser.username === reduxStore.auth.currentUser
    )
  );
  const [user, setUser] = useState(currentUser);
  const dispatch = useDispatch();
  const handleChange = useCallback((e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authSlice.actions.onUpdateProfile(user));
  };
  return (
    <div>
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
              readOnly
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
          <input type='submit' />
        </div>
      </form>
    </div>
  );
};

export default Profile;
