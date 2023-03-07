import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SelectUser from '../../selectusers';
import styles from './topappbar.module.css';
import AUTH_REDUCER from '../../../../../redux/constants/authReducer.actionTypes';
import { REDUCER_NAMES } from '../../../../../constants/reducers.constants';

const TopAppBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((reduxStore) => reduxStore[REDUCER_NAMES.AUTH].currentUser);

  const handleChange = useCallback(
    (newUserValue) => {
      dispatch({
        type: AUTH_REDUCER.HANDLE_USER_CHANGE,
        payload: newUserValue,
      });
    },
    [dispatch],
  );

  return (
    <div className={styles.topAppBar}>
      <div className={styles.container}>
        <div className={styles.spacer} />
        <div>Splitwise</div>
      </div>
      <div className={styles.container}>
        <SelectUser initialState={currentUser} handleChange={handleChange} />
        <div className={styles.spacer} />
      </div>
    </div>
  );
};

export default TopAppBar;
