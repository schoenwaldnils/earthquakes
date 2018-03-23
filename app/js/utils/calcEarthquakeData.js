import fetch from 'isomorphic-unfetch';
import qs from 'qs';

export default async function (minmagnitude) {
  const today = new Date();
  const options = {
    startYear: 1900,
    endYear: today.getFullYear(),
  };

  // https://earthquake.usgs.gov/fdsnws/event/1/
  const params = {
    format: 'geojson',
    starttime: `${options.startYear}-01-01`,
    endtime: `${options.endYear}-12-31`,
    minmagnitude,
  };
  const stringifiedParams = qs.stringify(params);
  const data = await fetch(`https://earthquake.usgs.gov/fdsnws/event/1/query?${stringifiedParams}`);
  const dataJson = await data.json();

  const chartData = [];

  for (let index = options.startYear; index <= options.endYear; index += 1) {
    let count = 0;
    dataJson.features.forEach((feature) => {
      // console.log(feature.properties.time);
      const time = new Date(feature.properties.time);
      const year = time.getFullYear();
      // console.log(index);
      // console.log(year);
      if (index === year) {
        count += 1;
      }
    });
    chartData.push({
      Jahr: index,
      Erdbeben: count,
    });
  }

  return chartData;
}
