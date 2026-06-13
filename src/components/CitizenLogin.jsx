import { useState } from 'react';
import { authenticateCitizen } from '../data/mockData';

export default function CitizenLogin({ onLoginSuccess, onCancel }) {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!licenseNumber.trim()) {
      setError('Please enter your Driver License Number.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);

    // Network simulation for a premium feel
    setTimeout(() => {
      const citizen = authenticateCitizen(licenseNumber, password);
      setIsLoading(false);
      if (citizen) {
        onLoginSuccess(citizen);
      } else {
        setError('Invalid License Number or Password. Please try again.');
      }
    }, 850);
  };

  const handleDemoLogin = (license, pass) => {
    setLicenseNumber(license);
    setPassword(pass);
    setError('');
    
    setIsLoading(true);
    setTimeout(() => {
      const citizen = authenticateCitizen(license, pass);
      setIsLoading(false);
      if (citizen) {
        onLoginSuccess(citizen);
      }
    }, 500);
  };

  return (
    <div className="card animate-fade-in" style={{ maxWidth: '480px', margin: '0 auto' }}>
      <h2 className="form-title" style={{ justifyContent: 'center' }}>
        <svg viewBox="0 0 24 24" width="24" height="24" fill="var(--primary-light)" style={{ marginRight: '8px' }}>
          <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="var(--primary-light)"/>
        </svg>
        Citizen Portal Login
      </h2>
      <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px', textAlign: 'center' }}>
        Log in using your driving license credentials to view pending fines, payment history, and generate digital clearance.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="form-group" style={{ marginBottom: '20px' }}>
          <label htmlFor="licenseNumber">Driver License Number</label>
          <input
            id="licenseNumber"
            type="text"
            placeholder="e.g. B1234567"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            required
            style={{ textTransform: 'uppercase' }}
          />
          <span className="helper-text">Include prefix letter (e.g. B)</span>
        </div>

        <div className="form-group" style={{ marginBottom: '20px', position: 'relative' }}>
          <label htmlFor="password">Password</label>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', paddingRight: '48px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px'
              }}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                </svg>
              ) : (
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.82l2.92 2.92c1.51-1.39 2.7-3.16 3.44-5.18-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22l1.41-1.41L3.41 2.86 2 4.27zM9.53 9.53l1.41 1.41c-.05.18-.08.38-.08.56 0 1.1.9 2 2 2 .18 0 .38-.03.56-.08l1.41 1.41c-.6.38-1.3.61-2.06.61-2.21 0-4-1.79-4-4 0-.76.23-1.46.61-2.06zM11.93 9l2.84 2.84C14.74 10.82 14 9.5 12 9c-.02 0-.05.01-.07.01z"/>
                </svg>
              )}
            </button>
          </div>
        </div>

        {error && (
          <div className="alert-error animate-slide-in" style={{ marginTop: '0', marginBottom: '20px' }}>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
            </svg>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
          <button type="button" className="btn-secondary" style={{ flex: 1 }} onClick={onCancel}>
            Back
          </button>
          <button type="submit" className="btn-primary" style={{ flex: 1.5 }} disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }}></span>
                Logging In...
              </>
            ) : (
              'Log In'
            )}
          </button>
        </div>
      </form>

      {/* Demo helper logins */}
      <div style={{ marginTop: '32px', borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
        <span style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '10px', textAlign: 'center' }}>
          Quick Demo Login Accounts:
        </span>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <button
            type="button"
            className="btn-secondary"
            style={{ padding: '8px', fontSize: '12px', borderRadius: '8px', textAlign: 'left' }}
            onClick={() => handleDemoLogin('B1234567', 'password123')}
          >
            <strong>Hirushi Perera</strong>
            <span style={{ fontSize: '10px', display: 'block', color: 'var(--text-muted)' }}>License: B1234567</span>
          </button>
          <button
            type="button"
            className="btn-secondary"
            style={{ padding: '8px', fontSize: '12px', borderRadius: '8px', textAlign: 'left' }}
            onClick={() => handleDemoLogin('B9876543', 'password123')}
          >
            <strong>Aruni Fernando</strong>
            <span style={{ fontSize: '10px', display: 'block', color: 'var(--text-muted)' }}>License: B9876543</span>
          </button>
        </div>
      </div>
    </div>
  );
}
