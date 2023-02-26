import React from 'react';
import styles from './navbars.module.css';
import SideNavBar from './sidenavbar/SideNavBar';
import TopAppBar from './topappbar';

const NavBars = () => {
  return (
    <div className={styles['nav-bars']}>
      <TopAppBar />
      <SideNavBar />
    </div>
  );
};

export default NavBars;
