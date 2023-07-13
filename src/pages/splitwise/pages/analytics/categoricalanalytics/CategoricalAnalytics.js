import React, { useState } from 'react';
import dayjs from 'dayjs';
import { useOutletContext } from 'react-router-dom';
import { Select, Radio, DatePicker } from 'antd';
import { EXPENSE_DETAILS } from '../../../../../constants/expenseDetails.constants';
import calculateSplittedAmounts from '../../../../../helpers/calculateSplittedAmounts';
import floatToFixed from '../../../../../helpers/floatToFixed';
import { capitalizeFirst } from '../../../../../helpers/capitalizeFirst';
import { ALL_EXPENSES_OPTIONS, MONTHS } from '../../../../../constants/expenseAnalytics.constants';
import PieChart from '../components/piechart/PieChart';
import ColumnChart from '../components/columnchart/ColumnChart';
import styles from './categoricalanalysis.module.css';

const CategoricalAnalytics = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [currentUser, filteredTransactions] = useOutletContext();

  const columnChartDataRaw = filteredTransactions.reduce((acc, transaction) => {
    const prevSeries = { ...acc };
    const date = dayjs(transaction[EXPENSE_DETAILS.DATE]);
    if (
      (dateRange && dateRange.length > 0 && dateRange[0] && date.isBefore(dateRange[0])) ||
      (dateRange && dateRange.length > 1 && dateRange[1] && date.isAfter(dateRange[1]))
    ) {
      return prevSeries;
    }
    const splittedAmounts = calculateSplittedAmounts(transaction);
    if (splittedAmounts[currentUser] === undefined) {
      return prevSeries;
    }

    const category = capitalizeFirst(transaction[EXPENSE_DETAILS.CATEGORY]);
    const key = `${MONTHS[date.get('month')]} ${date.get('year')}`;
    if (prevSeries[category] === undefined) {
      prevSeries[category] = {};
    }
    prevSeries[category][key] ??= 0;
    prevSeries[category][key] += splittedAmounts[currentUser];
    prevSeries[category][key] = floatToFixed(prevSeries[category][key]);

    return { ...prevSeries };
  }, {});
  const pieChartDataRaw = filteredTransactions.reduce((acc, transaction) => {
    const prevSeries = { ...acc };
    const date = dayjs(transaction[EXPENSE_DETAILS.DATE]);
    if (
      (dateRange && dateRange.length > 0 && dateRange[0] && date.isBefore(dateRange[0])) ||
      (dateRange && dateRange.length > 1 && dateRange[1] && date.isAfter(dateRange[1]))
    ) {
      return prevSeries;
    }
    const splittedAmounts = calculateSplittedAmounts(transaction);
    if (splittedAmounts[currentUser] === undefined) {
      return prevSeries;
    }
    const category1 = transaction[EXPENSE_DETAILS.SPLIT_BETWEEN].length === 1 ? ALL_EXPENSES_OPTIONS.PERSONAL : ALL_EXPENSES_OPTIONS.GROUP;
    const category = capitalizeFirst(transaction[EXPENSE_DETAILS.CATEGORY]);
    prevSeries[category1] ??= {};
    prevSeries[category1][category] = (prevSeries[category1][category] ?? 0) + splittedAmounts[currentUser];
    prevSeries[ALL_EXPENSES_OPTIONS.BOTH] ??= {};
    prevSeries[ALL_EXPENSES_OPTIONS.BOTH][category] = (prevSeries[ALL_EXPENSES_OPTIONS.BOTH][category] ?? 0) + splittedAmounts[currentUser];
    return prevSeries;
  }, {});
  const [selectedCategories, setSelectedCategories] = useState(
    Object.keys(columnChartDataRaw).length > 0 ? [Object.keys(columnChartDataRaw)[0]] : [],
  );

  const xAxisCategories = [
    ...(selectedCategories ?? []).reduce((st, selectedCategory) => {
      Object.keys(columnChartDataRaw[selectedCategory] ?? {}).forEach((item) => st.add(item));
      return st;
    }, new Set()),
  ].sort((date1, date2) => (dayjs(date1).isBefore(dayjs(date2)) ? -1 : 1));

  const columnChartSeries = selectedCategories.reduce((list, selectedCategory) => {
    const selectedCategorySeries = { name: selectedCategory, data: {} };
    xAxisCategories.forEach((date) => {
      selectedCategorySeries.data[date] = (selectedCategorySeries.data[date] ?? 0) + ((columnChartDataRaw[selectedCategory] ?? {})[date] ?? 0);
    });
    selectedCategorySeries.data = Object.values(selectedCategorySeries.data);
    list.push(selectedCategorySeries);
    return list;
  }, []);

  const [selectedCategory, setSelectedCategory] = useState(Object.keys(pieChartDataRaw).length > 0 ? Object.keys(pieChartDataRaw)[0] : null);
  const pieChartData = Object.entries(pieChartDataRaw[selectedCategory] ?? {}).map(([category, expense]) => ({
    name: category,
    y: floatToFixed(expense),
  }));
  return (
    <div className={styles.container}>
      <div className={styles.container}>
        <DatePicker.RangePicker onChange={setDateRange} />
        <div style={{ height: '20px' }} />
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
      </div>
      <PieChart data={pieChartData} titleText="" name="Amount" />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        Monthly analysis of
        <div style={{ width: '10px' }} />
        <Select
          mode="multiple"
          value={selectedCategories}
          placeholder="Select categories"
          style={{ width: '120px' }}
          options={Object.keys(columnChartDataRaw).map((option) => ({ label: option, value: option }))}
          onChange={setSelectedCategories}
        />
      </div>
      <ColumnChart xAxisTitleText="Months" yAxisTitleText="Amount(₹)" xAxisCategories={xAxisCategories} series={columnChartSeries} />
    </div>
  );
};
export default CategoricalAnalytics;
