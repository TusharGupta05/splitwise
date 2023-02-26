import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authSlice from '../../../../../redux/slices/auth/auth';
import SelectUser from '../../selectusers';
import styles from './topappbar.module.css';
const TopAppBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((reduxStore) => reduxStore.auth.currentUser);

  const handleChange = useCallback(
    (newUserValue) => {
      dispatch(authSlice.actions.onChange(newUserValue));
    },
    [dispatch]
  );

  return (
    <div className={styles['top-app-bar']}>
      <div className={styles.container}>
        <div className={styles.spacer}></div>
        <div>Splitwise</div>
      </div>
      <div className={styles.container}>
        <SelectUser initialState={currentUser} handleChange={handleChange} />
        <div className={styles.spacer}></div>
      </div>
    </div>
  );
};

export default TopAppBar;
