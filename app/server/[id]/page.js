'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ServerControlPanel({ params }) {
  const [activeTab, setActiveTab] = useState('General');
  const [server, setServer] = useState(null);

  useEffect(() => {
    // Load the specific server details from local storage
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
  }, [params.id]);

  if (!server) return <div style={{ color: '#fff', padding: '20px' }}>Loading server...</div>;

  return (
    <div style={{ backgroundColor: '#0d0e15', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        
        <div style={{ marginBottom: '20px' }}>
          <Link href="/dashboard" style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px' }}>
            ← Back to Dashboard
          </Link>
        </div>

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

        {activeTab === 'Access server' && (
          <div style={{ backgroundColor: '#13151f', border: '1px solid #222', borderRadius: '12px', padding: '25px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Node.js 24 Web Console</h3>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>
              Connected to server instance: <strong>{server.name}</strong>
            </p>
            <button
              onClick={() => alert('Starting Node 24 terminal...')}
              style={{ backgroundColor: '#6b21a8', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Launch Terminal
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
