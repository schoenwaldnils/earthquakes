import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
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

const Graph = ({ chartData, minmagnitude }) => {
  const startMagnitude = minmagnitude
  const endMagnitude = 9

  const magnitudes = Array.from(
    Array(endMagnitude - startMagnitude + 1),
    (x, index) => endMagnitude - index,
  )

  return (
    <GraphWrapper>
      {!chartData && (
        <GraphLoading>
          <LoadingSpinner />
        </GraphLoading>
      )}
      {chartData && (
        <>
          <ResponsiveContainer height="95%">
            <AreaChart
              data={chartData}
              margin={{
                top: 10,
                right: 18,
                bottom: 15,
                left: 0,
              }}
            >
              <YAxis />
              <XAxis
                dataKey="year"
                type="number"
                allowDecimals={false}
                domain={['dataMin', 'dataMax']}
              />
              <CartesianGrid stroke="#f5f5f5" />
              <Tooltip />
              {magnitudes &&
                magnitudes.map((magnitude, index) => (
                  <Area
                    type="monotone"
                    dataKey={`m${magnitude}`}
                    stackId="1"
                    fill={`hsl(${(90 / magnitudes.length) * index}, 90%, 40%)`}
                    stroke={false}
                  />
                ))}
            </AreaChart>
          </ResponsiveContainer>
          <GraphDataSource>
            Quelle:{' '}
            <a href="https://earthquake.usgs.gov">earthquake.usgs.gov</a>
          </GraphDataSource>
        </>
      )}
    </GraphWrapper>
  )
}

Graph.propTypes = {
  minmagnitude: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  chartData: PropTypes.object.isRequired,
}

export default Graph
