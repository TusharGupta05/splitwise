import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, Outlet } from 'react-router-dom';
import authSlice from '../../../../../redux/slices/auth/auth';
import {
  sideNavBarItems,
  sideNavBarLinks,
} from '../../../constants/sidenavbar';
import styles from './sidenavbar.module.css';

const SideNavBar = () => {
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(authSlice.actions.onLogout());
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles['side-nav-bar']}>
          <div>
            {sideNavBarItems.map((sideNavBarItem, index) => {
              return (
                <li key={sideNavBarItem}>
                  <NavLink
                    className={({ isActive }) => {
                      return `${styles.link} ${
                        isActive ? styles['link-active'] : ''
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
        <div className={styles['outlet-container']}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SideNavBar;
