import React from 'react';
import { Outlet } from 'react-router-dom';
import SideNavBar from '../sidenavbar/SideNavBar';

import styles from './contentContainer.module.css';

const ContentContainer = () => (
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <div className={styles.showSideNavBar}>
        <SideNavBar />
      </div>
      <div className={styles.outletContainer}>
        <Outlet />
      </div>
    </div>
  </div>
);

export default ContentContainer;
