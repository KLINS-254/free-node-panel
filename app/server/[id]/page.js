'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ServerControlPanel({ params }) {
  const [activeTab, setActiveTab] = useState('General');
  const [server, setServer] = useState(null);

  // Authentication & Credentials State
  const [accessId, setAccessId] = useState('');
  const [accessPassword, setAccessPassword] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [copyStatus, setCopyStatus] = useState('');

  // Helper function to generate 12-character string (lowercase letters + numbers)
  const generateRandom12Char = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my_servers') || '[]');
    const found = saved.find((s) => s.id === params.id) || {
      name: 'NodeJS-Server',
      id: params.id || '5c893721',
      ram: 308,
      disk: 716,
      cpu: 25,
      type: 'NodeJs 24',
    };
    setServer(found);

    // Generate credentials if they don't exist for this server
    if (!found.accessId || !found.accessPassword) {
      const generatedId = generateRandom12Char();
      const generatedPassword = generateRandom12Char();

      found.accessId = generatedId;
      found.accessPassword = generatedPassword;

      // Update storage with credentials
      const updatedServers = saved.map((s) => (s.id === found.id ? found : s));
      localStorage.setItem('my_servers', JSON.stringify(updatedServers));
    }

    setAccessId(found.accessId);
    setAccessPassword(found.accessPassword);
  }, [params.id]);

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(`Copied ${type}!`);
    setTimeout(() => setCopyStatus(''), 2000);
  };

  const handleUnlock = (e) => {
    e.preventDefault();
    if (inputPassword.trim() === accessPassword) {
      setIsUnlocked(true);
    } else {
      alert('Incorrect password. Please copy and paste the generated password above.');
    }
  };

  if (!server) return <div style={{ color: '#fff', padding: '20px' }}>Loading server...</div>;

  return (
    <div style={{ backgroundColor: '#0d0e15', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '20px' }}>
          <Link href="/dashboard" style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px' }}>
            ← Back to Dashboard
          </Link>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', borderBottom: '1px solid #222', marginBottom: '20px', gap: '15px', overflowX: 'auto' }}>
          {['General', 'Modify server', 'Change password', 'Change type', 'Access server'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: activeTab === tab ? '#c084fc' : '#888',
                borderBottom: activeTab === tab ? '2px solid #c084fc' : '2px solid transparent',
                paddingBottom: '10px',
                cursor: 'pointer',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                fontSize: '14px',
                whiteSpace: 'nowrap',
              }}
            >
              {tab === 'Access server' ? '🚀 Access server' : tab}
            </button>
          ))}
        </div>

        {/* General Tab */}
        {activeTab === 'General' && (
          <div style={{ backgroundColor: '#13151f', border: '1px solid #222', borderRadius: '12px', padding: '25px' }}>
            <h3 style={{ fontSize: '16px', color: '#aaa', marginTop: 0 }}>Description</h3>
            <p style={{ color: '#666', fontSize: '14px', fontStyle: 'italic', marginBottom: '30px' }}>No description provided</p>

            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Server details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', rowGap: '12px', fontSize: '14px', marginBottom: '30px' }}>
              <span style={{ color: '#888' }}>Name</span>
              <span>{server.name}</span>

              <span style={{ color: '#888' }}>Identifier</span>
              <span>{server.id}</span>

              <span style={{ color: '#888' }}>RAM</span>
              <span>{server.ram} Mo</span>

              <span style={{ color: '#888' }}>Disk</span>
              <span>{server.disk} Mo</span>

              <span style={{ color: '#888' }}>CPU</span>
              <span>{server.cpu} %</span>

              <span style={{ color: '#888' }}>Type</span>
              <span>NodeJs 24</span>

              <span style={{ color: '#888' }}>Plan</span>
              <span>Free/Gratuit</span>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Service information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', rowGap: '12px', fontSize: '14px' }}>
              <span style={{ color: '#888' }}>Renew period</span>
              <span>Every 4 days</span>

              <span style={{ color: '#888' }}>Auto renew</span>
              <span>Non</span>

              <span style={{ color: '#888' }}>Price</span>
              <span>0 credits</span>
            </div>
          </div>
        )}

        {/* Access Server Tab */}
        {activeTab === 'Access server' && (
          <div style={{ backgroundColor: '#13151f', border: '1px solid #222', borderRadius: '12px', padding: '25px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>Access Server Credentials</h3>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>
              Copy your generated ID and Password below, then paste the password into the control panel field to enter.
            </p>

            {/* Generated Credentials Cards */}
            <div style={{ backgroundColor: '#0d0e15', padding: '15px', borderRadius: '8px', border: '1px solid #333', marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div>
                  <span style={{ color: '#888', fontSize: '12px', display: 'block' }}>Your ID (12 chars):</span>
                  <strong style={{ fontSize: '16px', letterSpacing: '1px', color: '#c084fc' }}>{accessId}</strong>
                </div>
                <button
                  onClick={() => copyToClipboard(accessId, 'ID')}
                  style={{ backgroundColor: '#1f2430', color: '#fff', border: '1px solid #444', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                >
                  Copy ID
                </button>
              </div>

              <div style={{ borderTop: '1px solid #222', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#888', fontSize: '12px', display: 'block' }}>Your Password (12 chars):</span>
                  <strong style={{ fontSize: '16px', letterSpacing: '1px', color: '#34d399' }}>{accessPassword}</strong>
                </div>
                <button
                  onClick={() => copyToClipboard(accessPassword, 'Password')}
                  style={{ backgroundColor: '#1f2430', color: '#fff', border: '1px solid #444', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                >
                  Copy Password
                </button>
              </div>
            </div>

            {copyStatus && <p style={{ color: '#34d399', fontSize: '13px', textAlign: 'center', margin: '10px 0' }}>{copyStatus}</p>}

            {/* Control Panel Access Form */}
            {!isUnlocked ? (
              <form onSubmit={handleUnlock} style={{ marginTop: '25px', borderTop: '1px solid #222', paddingTop: '20px' }}>
                <label style={{ display: 'block', color: '#aaa', fontSize: '14px', marginBottom: '8px' }}>
                  Paste Password to Access Control Panel:
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input
                    type="password"
                    required
                    value={inputPassword}
                    onChange={(e) => setInputPassword(e.target.value)}
                    placeholder="Paste 12-character password"
                    style={{ flex: 1, padding: '12px', backgroundColor: '#0d0e15', border: '1px solid #333', color: '#fff', borderRadius: '6px' }}
                  />
                  <button
                    type="submit"
                    style={{ backgroundColor: '#6b21a8', color: '#fff', border: 'none', padding: '12px 20px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Access Panel
                  </button>
                </div>
              </form>
            ) : (
              /* Unlocked Web Console Panel */
              <div style={{ marginTop: '25px', borderTop: '1px solid #222', paddingTop: '20px', textAlign: 'center' }}>
                <span style={{ backgroundColor: '#064e3b', color: '#34d399', fontSize: '12px', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold' }}>
                  AUTHENTICATED
                </span>
                <h4 style={{ fontSize: '16px', marginTop: '15px' }}>Node.js 24 Active Terminal</h4>
                <div style={{ backgroundColor: '#000', color: '#00ff00', padding: '15px', borderRadius: '6px', fontFamily: 'monospace', textAlign: 'left', fontSize: '13px', margin: '15px 0' }}>
                  $ node -v<br />
                  v24.0.0<br />
                  $ npm start<br />
                  [INFO] Node.js 24 Server running on port 20090...
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
