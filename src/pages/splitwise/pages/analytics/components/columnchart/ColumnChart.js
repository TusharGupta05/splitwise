import React from 'react';
import HighCharts from 'highcharts';
import Columnchart from 'highcharts-react-official';
import PropTypes from 'prop-types';

const ColumnChart = ({ xAxisTitleText = 'Months', yAxisTitleText = 'Amount(₹)', xAxisCategories, series }) => (
  <Columnchart
    containerProps={{ style: { height: '100%', width: '100%' } }}
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

ColumnChart.propTypes = {
  xAxisTitleText: PropTypes.string,
  yAxisTitleText: PropTypes.string,
  xAxisCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  series: PropTypes.arrayOf(
    PropTypes.exact({
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

ColumnChart.defaultProps = {
  xAxisTitleText: 'Months',
  yAxisTitleText: 'Amount(₹)',
};

export default ColumnChart;
