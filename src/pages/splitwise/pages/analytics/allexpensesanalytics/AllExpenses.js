import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useOutletContext } from 'react-router-dom';
import { Radio } from 'antd';
import { EXPENSE_DETAILS } from '../../../../../constants/expenseDetails.constants';
import calculateSplittedAmounts from '../../../../../helpers/calculateSplittedAmounts';
import floatToFixed from '../../../../../helpers/floatToFixed';
import { ALL_EXPENSES_OPTIONS, MONTHS } from '../../../../../constants/expenseAnalytics.constants';
import ColumnChart from '../components/columnchart/ColumnChart';
import styles from './allexpenses.module.css';

const AllExpenses = () => {
  const [currentUser, filteredTransactions] = useOutletContext();

  const columnChartDataRaw = filteredTransactions.reduce((acc, transaction) => {
    const prevSeries = { ...acc };
    const splittedAmounts = calculateSplittedAmounts(transaction);
    if (splittedAmounts[currentUser] === undefined) {
      return prevSeries;
    }
    const date = dayjs(transaction[EXPENSE_DETAILS.DATE]);
    const category = transaction[EXPENSE_DETAILS.SPLIT_BETWEEN].length === 1 ? ALL_EXPENSES_OPTIONS.PERSONAL : ALL_EXPENSES_OPTIONS.GROUP;
    const key = `${MONTHS[date.get('month')]} ${date.get('year')}`;
    if (prevSeries[category] === undefined) {
      prevSeries[category] = {};
    }
    prevSeries[category][key] ??= 0;
    prevSeries[category][key] += splittedAmounts[currentUser];
    prevSeries[category][key] = floatToFixed(prevSeries[category][key]);
    const category1 = ALL_EXPENSES_OPTIONS.BOTH;
    if (prevSeries[category1] === undefined) {
      prevSeries[category1] = {};
    }
    prevSeries[category1][key] ??= 0;
    prevSeries[category1][key] += splittedAmounts[currentUser];
    prevSeries[category1][key] = floatToFixed(prevSeries[category1][key]);
    return { ...prevSeries };
  }, {});
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(columnChartDataRaw).length > 0 ? Object.keys(columnChartDataRaw)[0] : null);
  const xAxisCategories = Object.keys(columnChartDataRaw[selectedCategory] ?? {}).sort((k1, k2) => {
    const date1 = dayjs(k1);
    const date2 = dayjs(k2);
    return date1.isBefore(date2) ? -1 : 1;
  });
  const columnChartSeries = [
    {
      name: 'Expenses',
      data: xAxisCategories.map((val) => columnChartDataRaw[selectedCategory][val]),
    },
  ];
  return (
    <div className={styles.container}>
      <Radio.Group
        value={selectedCategory}
        buttonStyle="solid"
        onChange={(val) => {
          setSelectedCategory(val.target.value);
        }}
      >
        {Object.values(ALL_EXPENSES_OPTIONS).map((option) => (
          <Radio.Button key={option} value={option}>
            {option}
          </Radio.Button>
        ))}
      </Radio.Group>
      <ColumnChart xAxisTitleText="Months" yAxisTitleText="Amount(₹)" xAxisCategories={xAxisCategories} series={columnChartSeries} />
    </div>
  );
};
export default AllExpenses;
