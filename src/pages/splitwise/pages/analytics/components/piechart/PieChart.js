import React from 'react';
import HighCharts from 'highcharts';
import Piechart from 'highcharts-react-official';
import PropTypes from 'prop-types';

const PieChart = ({ titleText, name, data }) => {
  const options = {
    accessibility: {
      enabled: false,
    },
    chart: {
      type: 'pie',
    },
    title: {
      text: titleText,
    },
    series: [
      {
        name,
        colorByPoint: true,
        data,
      },
    ],
  };
  return <Piechart containerProps={{ style: { height: '100%', width: '100%' } }} highcharts={HighCharts} options={options} />;
};

PieChart.propTypes = {
  titleText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string,
      y: PropTypes.number,
    }).isRequired,
  ).isRequired,
};

export default PieChart;
