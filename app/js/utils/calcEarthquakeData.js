module.exports = quakes => {
  const today = new Date()
  const options = {
    startYear: 1900,
    endYear: today.getFullYear(),
  }

  const chartData = {
    6: [],
    7: [],
    8: [],
    9: [],
  }

  for (let indexMag = 6; indexMag <= 9; indexMag += 1) {
    for (
      let indexYear = options.startYear;
      indexYear <= options.endYear;
      indexYear += 1
    ) {
      const count = quakes.filter(
        ({ year, mag }) => year === indexYear && mag >= indexMag,
      ).length
      chartData[indexMag].push({
        Jahr: indexYear,
        Erdbeben: count,
      })
    }
  }

  return chartData
}
