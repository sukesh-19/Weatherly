import { useState, useCallback } from 'react';
import { searchCity, fetchWeather } from '../api/weather';

export function useWeather() {
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);

  const search = useCallback(async (query) => {
    const trimmed = query.trim();
    if (!trimmed) {
      setError('Please enter a city name.');
      return;
    }

    setStatus('loading');
    setError(null);
    setWeather(null);
    setCity(null);

    try {
      const cityData = await searchCity(trimmed);
      const currentWeather = await fetchWeather(
        cityData.latitude,
        cityData.longitude,
        cityData.timezone
      );
      setCity(cityData);
      setWeather(currentWeather);
      setStatus('success');
    } catch (err) {
      setError(err.message ?? 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }, []);

  const reset = useCallback(() => {
    setCity(null);
    setWeather(null);
    setStatus('idle');
    setError(null);
  }, []);

  return { city, weather, status, error, search, reset };
}

