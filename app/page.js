'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [serverName, setServerName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = (e) => {
    e.preventDefault();
    setLoading(true);

    // Generate a new server object
    const newServer = {
      id: Math.random().toString(36).substring(2, 9),
      name: serverName || 'NodeJS-Server',
      type: 'NodeJs 24',
      status: 'online',
      ip: `51.75.118.${Math.floor(Math.random() * 200 + 10)}:${Math.floor(Math.random() * 8000 + 10000)}`,
      ram: 308,
      disk: 716,
      cpu: 25,
      created: new Date().toLocaleDateString(),
    };

    // Save to local storage
    const existingServers = JSON.parse(localStorage.getItem('my_servers') || '[]');
    existingServers.push(newServer);
    localStorage.setItem('my_servers', JSON.stringify(existingServers));

    setLoading(false);
    // Redirect to Dashboard
    router.push('/dashboard');
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
        </form>
      </div>
    </div>
  );
}
