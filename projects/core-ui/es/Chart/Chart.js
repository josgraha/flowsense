"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class Chart extends _react.Component {
  constructor(props) {
    super(props);
    this.container = _react.default.createRef();
  }

  componentDidMount() {
    const props = this.props;
    const highcharts = props.highcharts || window.Highcharts; // Create chart

    this.chart = highcharts[props.constructorType || "chart"](this.container.current, props.options, props.callback ? props.callback : undefined);
  }

  componentDidUpdate() {
    if (this.props.allowChartUpdate !== false) {
      this.chart.update(this.props.options, ...(this.props.updateArgs || [true, true]));
    }
  }

  componentWillUnmount() {
    // Destroy chart
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  render() {
    // Create container for the chart
    return _react.default.createElement("div", {
      ref: this.container
    });
  }

}

var _default = Chart;
exports.default = _default;