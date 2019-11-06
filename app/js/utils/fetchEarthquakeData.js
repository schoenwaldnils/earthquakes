const fetch = require('isomorphic-unfetch')
const qs = require('qs')

module.exports = async () => {
  const today = new Date()
  const options = {
    startYear: 1900,
    endYear: today.getFullYear(),
  }

  // https://earthquake.usgs.gov/fdsnws/event/1/
  const params = {
    format: 'geojson',
    starttime: `${options.startYear}-01-01`,
    endtime: `${options.endYear}-12-31`,
    minmagnitude: 6,
  }
  const stringifiedParams = qs.stringify(params)
  const data = await fetch(
    `https://earthquake.usgs.gov/fdsnws/event/1/query?${stringifiedParams}`,
  ).catch(err => {
    console.log(err)
  })

  const dataJson = await data.json()

  const quakesFiltered = dataJson.features.map(i => {
    const time = new Date(i.properties.time)
    const year = time.getFullYear()

    const mag = Math.floor(i.properties.mag)

    return {
      year,
      mag,
    }
  })

  return quakesFiltered
}
