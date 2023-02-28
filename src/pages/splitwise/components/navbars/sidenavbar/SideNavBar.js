import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import {
  sideNavBarItems,
  sideNavBarLinks,
} from '../../../constants/sidenavbar';
import styles from './sidenavbar.module.css';
import AUTH_REDUCER from '../../../../../redux/constants/authReducer.actionTypes';

const SideNavBar = () => {
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch({ type: AUTH_REDUCER.HANDLE_LOGOUT });
  }, [dispatch]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.sideNavBar}>
          <div>
            {sideNavBarItems.map((sideNavBarItem, index) => {
              return (
                <li key={sideNavBarItem}>
                  <NavLink
                    className={({ isActive }) => {
                      return `${styles.link} ${
                        isActive ? styles.linkActive : ''
                      }`;
                    }}
                    to={sideNavBarLinks[index]}
                  >
                    {sideNavBarItem}
                  </NavLink>
                </li>
              );
            })}
          </div>
          <div>
            <li
              className={`${styles.logout} ${styles.link}`}
              onClick={handleLogout}
            >
              <NavLink className={styles.link}>Log out</NavLink>
            </li>
          </div>
        </div>
        <div className={styles.outletContainer}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
