import React from 'react';
import HighCharts from 'highcharts';
import Columnchart from 'highcharts-react-official';

const ColumnChart = ({ xAxisTitleText = 'Months', yAxisTitleText = 'Amount(₹)', xAxisCategories, series }) => (
  <Columnchart
    highcharts={HighCharts}
    options={{
      chart: {
        type: 'column',
      },
      accessibility: {
        enabled: false,
      },
      title: {
        text: '',
      },
      xAxis: {
        categories: xAxisCategories,
        title: {
          text: xAxisTitleText,
        },
        crosshair: true,
      },
      yAxis: {
        min: 0,
        title: {
          text: yAxisTitleText,
        },
      },

      series,
    }}
  />
);

export default ColumnChart;
