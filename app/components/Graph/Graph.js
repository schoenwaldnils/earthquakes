import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import calcEarthquakeData from '../../js/utils/calcEarthquakeData';
import './Graph.css';

class Graph extends PureComponent {
  constructor() {
    super();
    this.state = {
      chartData: undefined,
    };
  }

  async componentWillMount() {
    const { minmagnitude } = this.props;
    const chartData = await calcEarthquakeData(minmagnitude);
    this.setState({
      chartData,
    });
  }

  async componentWillReceiveProps(nextProps) {
    const { minmagnitude } = nextProps;
    const chartData = await calcEarthquakeData(minmagnitude);
    this.setState({
      chartData,
    });
  }

  render() {
    const { chartData } = this.state;
    return (
      <div className="Graph">
        {chartData &&
          <ResponsiveContainer height={400}>
            <LineChart
              data={chartData}
              margin={{
                top: 10, right: 18, bottom: 15, left: -20,
              }}>
              <YAxis dataKey="count" />
              <XAxis
                dataKey="year"
                type="number"
                domain={['dataMin', 'dataMax']}
                tickCount={13} />
              <CartesianGrid stroke="#f5f5f5" />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        }
      </div>
    );
  }
}

Graph.propTypes = {
  minmagnitude: PropTypes.number.isRequired,
};

export default Graph;
