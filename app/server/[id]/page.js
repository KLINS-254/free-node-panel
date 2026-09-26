'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ServerControlPanel({ params }) {
  const [activeTab, setActiveTab] = useState('General');
  const [server, setServer] = useState(null);
  const router = useRouter();

  // Generate 12-character string (lowercase letters and numbers)
  const generate12Char = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my_servers') || '[]');
    let found = saved.find((s) => s.id === params.id);

    if (!found) {
      found = {
        name: 'NodeJS-Server',
        id: params.id || '5c893721',
        ram: 308,
        disk: 716,
        cpu: 25,
        type: 'NodeJs 24',
      };
    }

    // Ensure generated identifier and password exist
    if (!found.identifier || !found.currentPassword) {
      found.identifier = generate12Char();
      found.currentPassword = generate12Char();
      const updated = saved.map((s) => (s.id === found.id ? found : s));
      localStorage.setItem('my_servers', JSON.stringify(updated));
    }

    setServer(found);
  }, [params.id]);

  const handleGoToServer = () => {
    router.push(`/login?id=${server.identifier}&pwd=${server.currentPassword}`);
  };

  if (!server) return <div style={{ color: '#fff', padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ backgroundColor: '#090a0f', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#0d0e15', border: '1px solid #1a1b26', borderRadius: '12px', padding: '24px' }}>
        
        {/* Navigation back */}
        <div style={{ marginBottom: '15px' }}>
          <Link href="/dashboard" style={{ color: '#888', textDecoration: 'none', fontSize: '13px' }}>
            ← Back to Dashboard
          </Link>
        </div>

        {/* Tab Headers */}
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '25px', fontSize: '15px' }}>
          {['General', 'Modify server', 'Change password', 'Change type', 'Access server'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: activeTab === tab ? '#c084fc' : '#aaa',
                cursor: 'pointer',
                padding: '4px 0',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
              }}
            >
              {tab === 'Access server' ? '🚀 Access server' : tab}
            </button>
          ))}
        </div>

        {/* General Tab */}
        {activeTab === 'General' && (
          <div>
            <h3 style={{ fontSize: '14px', color: '#888', marginTop: 0 }}>Description</h3>
            <p style={{ color: '#555', fontSize: '13px', fontStyle: 'italic', marginBottom: '20px' }}>No description provided</p>
            <div style={{ fontSize: '14px', lineHeight: '2' }}>
              <div><span style={{ color: '#888' }}>Name:</span> {server.name}</div>
              <div><span style={{ color: '#888' }}>Type:</span> NodeJs 24</div>
              <div><span style={{ color: '#888' }}>RAM:</span> {server.ram} Mo</div>
              <div><span style={{ color: '#888' }}>Disk:</span> {server.disk} Mo</div>
            </div>
          </div>
        )}

        {/* Access Server Tab (Screenshot 1 Layout) */}
        {activeTab === 'Access server' && (
          <div style={{ marginTop: '10px' }}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', color: '#888', fontSize: '14px', marginBottom: '8px' }}>Identifier</label>
              <input
                type="text"
                readOnly
                value={server.identifier || ''}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  backgroundColor: '#161822',
                  border: '1px solid #232636',
                  color: '#aaa',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: '25px' }}>
              <label style={{ display: 'block', color: '#888', fontSize: '14px', marginBottom: '8px' }}>Current password</label>
              <input
                type="text"
                readOnly
                value={server.currentPassword || ''}
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  backgroundColor: '#161822',
                  border: '1px solid #232636',
                  color: '#aaa',
                  borderRadius: '8px',
                  fontSize: '15px',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              onClick={handleGoToServer}
              style={{
                backgroundColor: '#3b1c54',
                color: '#fff',
                border: '1px solid #582880',
                padding: '12px 20px',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Go to server
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
