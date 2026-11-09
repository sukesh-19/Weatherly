import { useState } from 'react';

export default function SearchBar({ onSearch, disabled }) {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    onSearch(value);
  };

  const showInlineError = touched && value.trim() === '';

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      <div className={`search-input-wrapper ${showInlineError ? 'has-error' : ''}`}>
        <span className="search-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          className="search-input"
          placeholder="Search for a city…"
          value={value}
          onChange={(e) => { setValue(e.target.value); setTouched(false); }}
          disabled={disabled}
          aria-label="City name"
          autoComplete="off"
          spellCheck="false"
        />
        <button
          type="submit"
          className="search-button"
          disabled={disabled}
          aria-label="Search"
        >
          {disabled ? (
            <span className="btn-spinner" aria-hidden="true" />
          ) : (
            'Search'
          )}
        </button>
      </div>
      {showInlineError && (
        <p className="inline-error" role="alert">Please enter a city name.</p>
      )}
    </form>
  );
}

