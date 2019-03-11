import React from "react";
import PropTypes from "prop-types";
import Highstock from "highcharts/highstock";

import Chart from "../Chart";

const StockChart = props => <Chart {...props} />;

StockChart.defaultProps = {
  constructorType: "stockChart",
  highcharts: Highstock,
  options: {}
};

StockChart.propTypes = {
  chartRef: ProptTypes.oneOf(PropTypes.func, PropTypes.object),
  className: PropTypes.string,
  constructorType: PropTypes.string,
  containerProps: PropTypes.object,
  highcharts: PropTypes.object,
  options: PropTypes.object,
  updateArgs: PropTypes.arrayOf(PropTypes.bool)
};

export default StockChart;
