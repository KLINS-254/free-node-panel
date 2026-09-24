'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ServerControlPanel({ params }) {
  const [activeTab, setActiveTab] = useState('General');

  const serverDetails = {
    name: 'Kino',
    identifier: params.id || '5c893721',
    ram: '308 Mo',
    disk: '716 Mo',
    cpu: '25 %',
    type: 'NodeJs 24',
    plan: 'Free/Gratuit',
    renewPeriod: 'Every 4 days',
    expiry: '2026-09-28',
    autoRenew: 'Non',
    price: '0 credits',
  };

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
              <span>{serverDetails.name}</span>

              <span style={{ color: '#888' }}>Identifier</span>
              <span>{serverDetails.identifier}</span>

              <span style={{ color: '#888' }}>RAM</span>
              <span>{serverDetails.ram}</span>

              <span style={{ color: '#888' }}>Disk</span>
              <span>{serverDetails.disk}</span>

              <span style={{ color: '#888' }}>CPU</span>
              <span>{serverDetails.cpu}</span>

              <span style={{ color: '#888' }}>Type</span>
              <span>{serverDetails.type}</span>

              <span style={{ color: '#888' }}>Plan</span>
              <span>{serverDetails.plan}</span>
            </div>

            <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>Service information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', rowGap: '12px', fontSize: '14px' }}>
              <span style={{ color: '#888' }}>Renew period</span>
              <span>{serverDetails.renewPeriod}</span>

              <span style={{ color: '#888' }}>Expiry</span>
              <span>{serverDetails.expiry}</span>

              <span style={{ color: '#888' }}>Auto renew</span>
              <span>{serverDetails.autoRenew}</span>

              <span style={{ color: '#888' }}>Price</span>
              <span>{serverDetails.price}</span>
            </div>
          </div>
        )}

        {activeTab === 'Access server' && (
          <div style={{ backgroundColor: '#13151f', border: '1px solid #222', borderRadius: '12px', padding: '25px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold' }}>Open Node.js Web Console</h3>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>
              Directly upload your `index.js`, install packages, and manage your Node 24 application.
            </p>
            <button
              onClick={() => alert('Connecting to Node.js 24 terminal session...')}
              style={{ backgroundColor: '#6b21a8', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Launch Console
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
