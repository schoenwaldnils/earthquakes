import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Select from 'react-select'
import Graph from '../components/Graph/Graph'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem;
`

const H1 = styled.h1`
  margin: 0;
  margin-bottom: 1rem;
`

const InputLabel = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const InputSelect = styled(Select)`
  flex-grow: 1;
  margin-left: 1rem;
`

class Page extends PureComponent {
  state = {
    minmagnitude: 6,
  }

  handleChange = selectedOption => {
    this.setState({ minmagnitude: selectedOption.value })
  }

  render() {
    const { minmagnitude } = this.state

    const { chartData } = this.props
    const chartDataFiltered = chartData[minmagnitude]

    const options = [
      { value: 6, label: 'Magnitude >= 6' },
      { value: 7, label: 'Magnitude >= 7' },
      { value: 8, label: 'Magnitude >= 8' },
      { value: 9, label: 'Magnitude >= 9' },
    ]

    const [{ label: magnitude }] = options.filter(i => i.value === minmagnitude)

    return (
      <Wrapper>
        <H1>Erdbeben pro Jahr Weltweit mit einer {magnitude}</H1>
        <InputLabel>
          {'Wähle Stärke: '}
          <InputSelect
            onChange={this.handleChange}
            options={options}
            defaultValue={minmagnitude}
          />
        </InputLabel>
        <Graph chartData={chartDataFiltered} />
      </Wrapper>
    )
  }
}

Page.defaultProps = {
  chartData: {},
}

Page.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  chartData: PropTypes.object,
}

export default Page
