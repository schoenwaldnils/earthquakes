import styled from '@emotion/styled'
import { GetStaticProps } from 'next'
import React, { FC, useState } from 'react'
import Select from 'react-select'

import { fetchEarthquakeData } from '../app/js/utils/fetchEarthquakeData'
import { Graph } from '../components/Graph'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 1rem;
`

const H1 = styled.h1`
  margin: 0;
  margin-bottom: 1rem;
  font-size: 1.5rem;
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

const Page: FC<{ chartData: ReadonlyArray<Record<string, unknown>> }> = ({
  chartData,
}) => {
  const [minmagnitude, setMinmagnitude] = useState(6)

  const handleChange = (selectedOption: { value: number; label: string }) => {
    setMinmagnitude(selectedOption.value)
  }

  // const chartDataFiltered = chartData[minmagnitude]

  const options = [
    { value: 1, label: 'Magnitude >= 1' },
    { value: 2, label: 'Magnitude >= 2' },
    { value: 3, label: 'Magnitude >= 3' },
    { value: 4, label: 'Magnitude >= 4' },
    { value: 5, label: 'Magnitude >= 5' },
    { value: 6, label: 'Magnitude >= 6' },
    { value: 7, label: 'Magnitude >= 7' },
    { value: 8, label: 'Magnitude >= 8' },
    { value: 9, label: 'Magnitude >= 9' },
  ]

  const [{ label: magnitude }] = options.filter((i) => i.value === minmagnitude)

  return (
    <Wrapper>
      <H1>Erdbeben pro Jahr Weltweit mit einer {magnitude}</H1>
      <InputLabel>
        {'Wähle Stärke: '}
        <InputSelect
          onChange={handleChange}
          options={options}
          value={minmagnitude}
        />
      </InputLabel>
      <Graph chartData={chartData} minmagnitude={minmagnitude} />
    </Wrapper>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const chartData = await fetchEarthquakeData()
  return {
    props: {
      chartData,
    },
  }
}

export default Page
