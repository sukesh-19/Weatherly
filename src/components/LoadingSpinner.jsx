export default function LoadingSpinner() {
  return (
    <div className="loading-state" role="status" aria-live="polite">
      <div className="loading-orb" aria-hidden="true">
        <div className="orb-ring" />
        <div className="orb-ring orb-ring--2" />
        <span className="orb-icon">🌍</span>
      </div>
      <p className="loading-text">Fetching weather data…</p>
      <p className="loading-sub">This will only take a moment</p>
    </div>
  );
}

