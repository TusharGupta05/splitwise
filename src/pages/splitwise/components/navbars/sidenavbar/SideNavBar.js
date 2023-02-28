import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { sideNavBarItems, sideNavBarLinks } from '../../../constants/sidenavbar';
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
            {sideNavBarItems.map((sideNavBarItem, index) => (
              <li key={sideNavBarItem}>
                <NavLink className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`} to={sideNavBarLinks[index]}>
                  {sideNavBarItem}
                </NavLink>
              </li>
            ))}
          </div>
          <div>
            <li className={`${styles.logout} ${styles.link}`}>
              <NavLink className={styles.link} onClick={handleLogout}>
                Log out
              </NavLink>
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
