import fetchForecast from './forecastData';
import convertTemperature from '../tempConversion';

let temperature;

const getTemperature = (arr, temp) => {
  temperature = arr.map((data) => data.main.temp);
  for (let i = 0; i < temperature.length; i += 1) {
    temperature[i] = convertTemperature(temperature[i], temp);
  }
  temperature = temperature.map((data) => data.split(' '));
  temperature = temperature.map((data) => data[0]);
  return temperature;
};

export const createChart = (temp, arr, xValues) => {
  getTemperature(arr, temp);
  let metric = '°C';
  if (temp === 'celsius') {
    metric = '°C';
  } else {
    metric = '°F';
  }
  /* eslint-disable */
  const weatherChart = new Chart('myChart', {
    /* eslint-enable */
    type: 'line',
    data: {
      labels: xValues,
      datasets: [
        {
          data: temperature,
          borderColor: 'blue',
          fill: false,
          label: `Temperature ${metric}`,
        },
      ],
    },
    options: {
      legend: { display: true },
    },
  });
  return weatherChart;
};

const getNext24HoursChart = async (xValues) => {
  const { dateArray } = await fetchForecast();
  const next24Hours = dateArray.slice(0, 9);
  const hoursArray = next24Hours.map((data) => data.dt_txt.split(' '));
  const hours = hoursArray.map((arr) => arr[1]);
  hours.map((hour) => xValues.push(hour));
  createChart('celsius', next24Hours, xValues);
};

export default getNext24HoursChart;
