export default function WelcomeState() {
  return (
    <div className="welcome-state">
      <div className="welcome-visual" aria-hidden="true">
        <span className="welcome-icon welcome-icon--sun">☀️</span>
        <span className="welcome-icon welcome-icon--cloud">⛅</span>
        <span className="welcome-icon welcome-icon--rain">🌧️</span>
      </div>
      <h2 className="welcome-title">Your Weather, Anywhere</h2>
      <p className="welcome-subtitle">
        Search for any city to get real-time weather conditions, temperature, humidity, and wind speed — powered by Open-Meteo.
      </p>
      <div className="welcome-features">
        <div className="feature-pill">🌍 Global coverage</div>
        <div className="feature-pill">📡 Live data</div>
        <div className="feature-pill">🆓 No API key needed</div>
      </div>
    </div>
  );
}

