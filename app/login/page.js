'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ExternalLogin() {
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const idParam = searchParams.get('id');
    const pwdParam = searchParams.get('pwd');
    if (idParam) setUserId(idParam);
    if (pwdParam) setPassword(pwdParam);
  }, [searchParams]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (userId && password) {
      setLoggedIn(true);
    }
  };

  if (loggedIn) {
    return (
      <div style={{ backgroundColor: '#08090d', color: '#00ff00', minHeight: '100vh', padding: '30px', fontFamily: 'monospace' }}>
        <h2>[SUCCESS] Connected to Node.js 24 Instance</h2>
        <p style={{ color: '#fff' }}>Welcome! You are now logged into server ID: <strong>{userId}</strong></p>
        <div style={{ backgroundColor: '#000', padding: '20px', borderRadius: '8px', border: '1px solid #333', marginTop: '20px' }}>
          $ node -v<br />
          v24.0.0<br />
          $ npm start<br />
          Server started running on port 20090...
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#08090d', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '380px' }}>
        <form onSubmit={handleLogin}>
          
          {/* Your ID Input */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#888', fontSize: '13px', marginBottom: '8px' }}>Your ID</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '12px', color: '#666', fontSize: '16px' }}>👤</span>
              <input
                type="text"
                required
                placeholder="Your ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 12px 12px 42px',
                  backgroundColor: '#121420',
                  border: '1px solid #1e2235',
                  color: '#fff',
                  borderRadius: '10px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          {/* Password Input */}
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', color: '#888', fontSize: '13px', marginBottom: '8px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: '14px', top: '12px', color: '#666', fontSize: '16px' }}>🔑</span>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 42px',
                  backgroundColor: '#121420',
                  border: '1px solid #1e2235',
                  color: '#fff',
                  borderRadius: '10px',
                  fontSize: '14px',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '14px', top: '12px', background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '16px' }}
              >
                👁
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: '#4a2574',
              color: '#fff',
              border: 'none',
              borderRadius: '10px',
              fontWeight: 'bold',
              fontSize: '15px',
              cursor: 'pointer',
            }}
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}
