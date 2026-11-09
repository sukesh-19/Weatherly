import { useWeather } from './hooks/useWeather';
import { getWeatherTheme } from './utils/weather';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import WelcomeState from './components/WelcomeState';
import './App.css';

export default function App() {
  const { city, weather, status, error, search, reset } = useWeather();

  const theme = status === 'success' && weather
    ? getWeatherTheme(weather.weather_code)
    : 'default';

  return (
    <div className={`app app--${theme}`}>
      <div className="app__bg" aria-hidden="true">
        <div className="bg-orb bg-orb--1" />
        <div className="bg-orb bg-orb--2" />
        <div className="bg-orb bg-orb--3" />
      </div>

      <div className="app__container">
        <header className="app__header">
          <div className="logo">
            <span className="logo-icon" aria-hidden="true">🌤️</span>
            <span className="logo-text">Weatherly</span>
          </div>
          <p className="app-tagline">Real-time weather for any city on Earth</p>
        </header>

        <main className="app__main">
          <section className="search-section" aria-label="City search">
            <SearchBar onSearch={search} disabled={status === 'loading'} />
          </section>

          <section className="content-section" aria-live="polite" aria-atomic="true">
            {status === 'idle' && <WelcomeState />}
            {status === 'loading' && <LoadingSpinner />}
            {status === 'error' && (
              <ErrorMessage message={error} onRetry={reset} />
            )}
            {status === 'success' && city && weather && (
              <WeatherCard city={city} weather={weather} onReset={reset} />
            )}
          </section>
        </main>

        <footer className="app__footer">
          <p>
            Powered by{' '}
            <a
              href="https://open-meteo.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open-Meteo
            </a>{' '}
            · No API key required
          </p>
        </footer>
      </div>
    </div>
  );
}
