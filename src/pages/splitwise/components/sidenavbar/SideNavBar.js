import React, { useCallback } from 'react';
import { Menu } from 'antd';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { sideNavBarItems, sideNavBarLinks } from '../../constants/sidenavbar';
import styles from './sidenavbar.module.css';
import AUTH_REDUCER from '../../../../redux/constants/authReducer.actionTypes';
import ROUTES from '../../constants/routes';

const { SubMenu } = Menu;
const SideNavBar = ({ handleClose }) => {
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch({ type: AUTH_REDUCER.HANDLE_LOGOUT });
  }, [dispatch]);
  const location = useLocation();
  // console.log(location.pathname.split('/'));
  return (
    <div className={styles.sideNavBar}>
      <Menu mode="inline" inlineIndent={0} selectedKeys={[location.pathname]} defaultOpenKeys={[`/${location.pathname.split('/')[1]}`]}>
        {sideNavBarItems.map((sideNavBarItem, index) => {
          if (Array.isArray(sideNavBarLinks[index])) {
            return (
              <SubMenu key={ROUTES.ANALYTICS} title={Object.keys(sideNavBarItem)[0]}>
                {Object.values(sideNavBarItem)[0].map((sideNavBarSubItem, index2) => (
                  <Menu.Item key={sideNavBarLinks[index][index2]}>
                    <NavLink
                      onClick={handleClose}
                      className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
                      to={sideNavBarLinks[index][index2]}
                    >
                      {sideNavBarSubItem}
                    </NavLink>
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          }
          return (
            <Menu.Item key={sideNavBarLinks[index]}>
              <NavLink
                onClick={handleClose}
                className={({ isActive }) => `${styles.link} ${isActive ? styles.linkActive : ''}`}
                to={sideNavBarLinks[index]}
              >
                {sideNavBarItem}
              </NavLink>
            </Menu.Item>
          );
        })}
      </Menu>
      <div>
        <li className={`${styles.logout} ${styles.link}`}>
          <NavLink className={styles.link} onClick={handleLogout}>
            Log out
          </NavLink>
        </li>
      </div>
    </div>
  );
};

export default SideNavBar;
