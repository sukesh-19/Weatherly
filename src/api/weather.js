const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';

export async function searchCity(query) {
  const url = `${GEOCODING_URL}?name=${encodeURIComponent(query)}&count=1&language=en&format=json`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to reach geocoding service.');
  const data = await response.json();
  if (!data.results || data.results.length === 0) {
    throw new Error(`No city found for "${query}". Please check the spelling and try again.`);
  }
  const { name, country, latitude, longitude, timezone } = data.results[0];
  return { name, country, latitude, longitude, timezone };
}

export async function fetchWeather(latitude, longitude, timezone) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    timezone,
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'weather_code',
      'wind_speed_10m',
    ].join(','),
  });

  const url = `${FORECAST_URL}?${params.toString()}`;
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to reach weather service.');
  const data = await response.json();
  return data.current;
}

