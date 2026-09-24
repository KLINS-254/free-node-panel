'use client';

import { useState } from 'react';

export default function Home() {
  const [serverName, setServerName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/servers/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: serverName }),
      });

      const data = await res.json();
      if (data.success) {
        setMessage('Server created successfully!');
        setServerName('');
      } else {
        setMessage('Failed to create server. Check backend setup.');
      }
    } catch (err) {
      setMessage('An error occurred while creating server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0d0e15', color: '#fff', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#13151f', padding: '30px', borderRadius: '12px', border: '1px solid #222' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '20px' }}>Create server</h1>

        <form onSubmit={handleCreate}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#aaa', fontSize: '14px', marginBottom: '8px' }}>Name</label>
            <input
              type="text"
              required
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
              placeholder="e.g. My-NodeJS-App"
              style={{ width: '100%', padding: '12px', backgroundColor: '#0d0e15', border: '1px solid #333', color: '#fff', borderRadius: '6px', boxSizing: 'border-box' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', color: '#aaa', fontSize: '14px', marginBottom: '8px' }}>Type</label>
            <div style={{ padding: '12px', backgroundColor: '#0d0e15', border: '1px solid #333', borderRadius: '6px' }}>
              NodeJs 24
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', color: '#aaa', fontSize: '14px', marginBottom: '8px' }}>Resources</label>
            <div style={{ padding: '12px', backgroundColor: '#0d0e15', border: '1px solid #333', borderRadius: '6px', color: '#ddd', fontSize: '14px' }}>
              0 credits ➔ Free/Gratuit ➔ 308 MB RAM / 716 MB Disk
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ width: '100%', padding: '12px', backgroundColor: '#6b21a8', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {loading ? 'Creating Server...' : 'Create server'}
          </button>

          {message && <p style={{ marginTop: '15px', textAlign: 'center', color: '#c084fc' }}>{message}</p>}
        </form>
      </div>
    </div>
  );
}
