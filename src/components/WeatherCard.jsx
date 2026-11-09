import { getWeatherIcon, getWeatherDescription, formatLocalTime } from '../utils/weather';

function StatCard({ icon, label, value }) {
  return (
    <div className="stat-card">
      <span className="stat-icon" aria-hidden="true">{icon}</span>
      <div className="stat-info">
        <span className="stat-label">{label}</span>
        <span className="stat-value">{value}</span>
      </div>
    </div>
  );
}

export default function WeatherCard({ city, weather, onReset }) {
  const { name, country, timezone } = city;
  const {
    temperature_2m,
    apparent_temperature,
    relative_humidity_2m,
    wind_speed_10m,
    weather_code,
    time,
  } = weather;

  const description = getWeatherDescription(weather_code);
  const icon = getWeatherIcon(weather_code);
  const { date, time: localTime } = formatLocalTime(time, timezone);

  return (
    <div className="weather-card" aria-label={`Weather for ${name}, ${country}`}>
      <div className="weather-card__header">
        <div className="city-info">
          <div className="city-name-row">
            <span className="pin-icon" aria-hidden="true">📍</span>
            <h2 className="city-name">{name}</h2>
            <span className="country-badge">{country}</span>
          </div>
          <div className="city-time">
            <span className="local-date">{date}</span>
            <span className="separator" aria-hidden="true">·</span>
            <span className="local-time">{localTime}</span>
          </div>
        </div>
        <button
          className="new-search-btn"
          onClick={onReset}
          aria-label="Search for another city"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          New Search
        </button>
      </div>

      <div className="weather-card__main">
        <div className="weather-icon-wrap" aria-hidden="true">
          <span className="weather-icon-main">{icon}</span>
        </div>
        <div className="temperature-block">
          <div className="temperature-display">
            <span className="temp-value">{Math.round(temperature_2m)}</span>
            <span className="temp-unit">°C</span>
          </div>
          <span className="weather-condition">{description}</span>
        </div>
      </div>

      <div className="weather-card__stats">
        <StatCard
          icon="🌡️"
          label="Feels Like"
          value={`${Math.round(apparent_temperature)}°C`}
        />
        <StatCard
          icon="💧"
          label="Humidity"
          value={`${relative_humidity_2m}%`}
        />
        <StatCard
          icon="💨"
          label="Wind Speed"
          value={`${Math.round(wind_speed_10m)} km/h`}
        />
      </div>
    </div>
  );
}

