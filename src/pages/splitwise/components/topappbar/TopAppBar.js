import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MenuOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';
import { REDUCER_NAMES } from '../../../../constants/reducers.constants';
import AUTH_REDUCER from '../../../../redux/constants/authReducer.actionTypes';
import SelectUsers from '../selectusers/SelectUsers';

import SideNavBar from '../sidenavbar/SideNavBar';

import styles from './topappbar.module.css';

const TopAppBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((reduxStore) => reduxStore[REDUCER_NAMES.AUTH].currentUser);
  const openMenu = useCallback(() => setIsMenuOpen(true), [setIsMenuOpen]);
  const closeMenu = useCallback(() => setIsMenuOpen(false), [setIsMenuOpen]);
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
        <div className={styles.showMenu}>
          <MenuOutlined onClick={openMenu} />
          <div className={styles.spacer} />
        </div>
        <div>Splitwise</div>
        <Drawer maskClosable open={isMenuOpen} closable onClose={closeMenu} placement="left">
          <SideNavBar handleClose={closeMenu} />
        </Drawer>
      </div>
      <div className={styles.container}>
        <SelectUsers value={currentUser} onChange={handleChange} />
        <div className={styles.spacer} />
      </div>
    </div>
  );
};

export default TopAppBar;
