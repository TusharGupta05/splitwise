import React from 'react';
import styles from './navbars.module.css';
import SideNavBar from './sidenavbar/SideNavBar';
import TopAppBar from './topappbar';

const NavBars = () => (
  <div className={styles.navBars}>
    <TopAppBar />
    <SideNavBar />
  </div>
);

export default NavBars;
