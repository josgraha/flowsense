import classNames from "classnames";
import Highcharts from "highcharts";
import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

const applyRef = (ref, value) => {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
};

const styles = {
  root: {
    "& .highcharts-credits": {
      display: "none"
    }
  }
};

class Chart extends Component {
  containerRef = createRef();

  componentDidMount() {
    const { options, chartRef } = this.props;
    const highcharts = props.highcharts || window.Highcharts;
    // Create chart
    this.chart = highcharts[props.constructorType](this.containerRef.current, options, ref =>
      applyRef(chartRef, ref)
    );
  }

  componentDidUpdate() {
    if (this.props.allowChartUpdate !== false) {
      this.chart.update(this.props.options, ...this.props.updateArgs);
    }
  }

  componentWillUnmount() {
    const { chartRef } = this.props;
    // Destroy chart
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
      applyRef(chartRef, null);
    }
  }

  render() {
    const { classes, containerProps, className } = this.props;
    return (
      <div
        {...containerProps}
        className={classNames(classes.root, className)}
        ref={this.containerRef}
      />
    );
  }
}

Chart.defaultProps = {
  constructorType: "chart",
  highcharts: Highcharts,
  options: [],
  updateArgs: [true, true, true]
};

Chart.propTypes = {
  chartRef: ProptTypes.oneOf(PropTypes.func, PropTypes.object),
  className: PropTypes.string,
  constructorType: PropTypes.string,
  containerProps: PropTypes.object,
  highcharts: PropTypes.object,
  options: PropTypes.object,
  updateArgs: PropTypes.arrayOf(PropTypes.bool)
};

export default withStyles(styles)(Chart);
