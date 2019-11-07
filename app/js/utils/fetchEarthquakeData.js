const fetch = require('isomorphic-unfetch')
const qs = require('qs')
const cliProgress = require('cli-progress')
const fileQuakes = require('../../../quakes.json')

const progressBar = new cliProgress.SingleBar({}, cliProgress.Presets.rect)

async function fetchEarthquakeData(year, magnitude) {
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
  ).catch(err => {
    console.log(err)
  })

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

  const dataJson = await data.json()

  // console.log(dataJson)

  return dataJson.count
}

// fetchEarthquakeData(2010, 3)

const composeData = async () => {
  const today = new Date()
  const startYear = 2019
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
    years.map(async year => {
      const yearsQuakes = {}

      await Promise.all(
        magnitudes.map(async magnitude => {
          yearsQuakes[`m${magnitude}`] = await fetchEarthquakeData(
            year,
            magnitude,
          )
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

  Object.keys(allQuakes).forEach(year => {
    formatedQuakes.push({
      ...allQuakes[year],
      year,
    })
  })

  progressBar.stop()

  return formatedQuakes
}

module.exports = composeData
