import React from 'react';
import HighCharts from 'highcharts';
import Piechart from 'highcharts-react-official';

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
  return <Piechart highcharts={HighCharts} options={options} />;
};

export default PieChart;
