import React from 'react';
import styles from './noexpense.module.css';

const NoExpense = () => (
  <div className={styles.container}>
    <div className={styles.emoji}>🙂</div>
    <p>No Recent Expense has been recorded </p>
    <p>Click Add new expense to add new expense</p>
  </div>
);

export default NoExpense;
