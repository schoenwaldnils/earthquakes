import fetch from 'isomorphic-unfetch'
import qs from 'qs'
import cliProgress from 'cli-progress'
import fileQuakes from '../../../quakes.json'

const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.rect)

async function fetchData(year, magnitude) {
  // https://earthquake.usgs.gov/fdsnws/event/1/
  const params = {
    format: 'geojson',
    starttime: `${year}-01-01`,
    endtime: `${year}-12-31`,
    minmagnitude: magnitude,
    maxmagnitude: magnitude + 1,
  }
  const stringifiedParams = qs.stringify(params)
  const data = await fetch(
    `https://earthquake.usgs.gov/fdsnws/event/1/count?${stringifiedParams}`,
  )
    .then((data) => {
      if (data.status && data.status !== 200) {
        console.log(
          '\n',
          'ERROR! Go to: ',
          '\n',
          `https://earthquake.usgs.gov/fdsnws/event/1/count?${stringifiedParams}`,
          '\n',
        )
        console.log(data)
      }

      return data.json()
    })
    .catch((err) => {
      console.log(err)
    })

  return data.count
}

const composeData = async (startYear = 2019) => {
  const today = new Date()
  const endYear = today.getFullYear()

  const startMagnitude = 1
  const endMagnitude = 9

  const numberOfCalls =
    (endMagnitude - startMagnitude + 1) * (endYear - startYear + 1)

  progressBar.start(numberOfCalls, 0)

  const years = Array.from(
    Array(endYear - startYear + 1),
    (x, index) => startYear + index,
  )

  const magnitudes = Array.from(
    Array(endMagnitude - startMagnitude + 1),
    (x, index) => startMagnitude + index,
  )

  const quakes = {}

  await Promise.all(
    years.map(async (year) => {
      const yearsQuakes = {}

      await Promise.all(
        magnitudes.map(async (magnitude) => {
          yearsQuakes[`m${magnitude}`] = await fetchData(year, magnitude)
          progressBar.increment()
        }),
      )

      quakes[year] = yearsQuakes
    }),
  )

  const allQuakes = {
    ...fileQuakes,
    ...quakes,
  }

  const formatedQuakes = []

  Object.keys(allQuakes).forEach((year) => {
    formatedQuakes.push({
      ...allQuakes[year],
      year,
    })
  })

  progressBar.stop()

  return formatedQuakes
}

export const fetchEarthquakeData = async () => composeData()
