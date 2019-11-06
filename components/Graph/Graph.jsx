import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const GraphWrapper = styled.div`
  position: relative;
  flex-grow: 1;
  width: 100%;
`

const GraphLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  font-size: 3rem;
`

const GraphDataSource = styled.div`
  font-size: 0.75rem;
  color: #777;

  a {
    color: #777;
  }
`

const Graph = ({ chartData }) => (
  <GraphWrapper>
    {!chartData && (
      <GraphLoading>
        <LoadingSpinner />
      </GraphLoading>
    )}
    {chartData && (
      <>
        <ResponsiveContainer height={400}>
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 18,
              bottom: 15,
              left: -20,
            }}
          >
            <YAxis dataKey="Erdbeben" />
            <XAxis
              dataKey="Jahr"
              type="number"
              domain={['dataMin', 'dataMax']}
              tickCount={13}
            />
            <CartesianGrid stroke="#f5f5f5" />
            <Tooltip />
            <Line type="monotone" dataKey="Erdbeben" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
        <GraphDataSource>
          Quelle: <a href="https://earthquake.usgs.gov">earthquake.usgs.gov</a>
        </GraphDataSource>
      </>
    )}
  </GraphWrapper>
)

Graph.propTypes = {
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      Jahr: PropTypes.number.isRequired,
      Erdbeben: PropTypes.number.isRequired,
    }),
  ).isRequired,
}

export default Graph
