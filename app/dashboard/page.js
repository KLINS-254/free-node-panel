'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [servers, setServers] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('my_servers') || '[]');
    setServers(saved);
  }, []);

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this server?')) {
      const updated = servers.filter((s) => s.id !== id);
      setServers(updated);
      localStorage.setItem('my_servers', JSON.stringify(updated));
    }
  };

  return (
    <div style={{ backgroundColor: '#0d0e15', color: '#fff', minHeight: '100vh', padding: '30px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Your Servers ({servers.length})</h1>
            <p style={{ color: '#888', fontSize: '14px', marginTop: '4px' }}>Manage or delete your active Node.js 24 servers.</p>
          </div>
          <Link href="/" style={{ backgroundColor: '#6b21a8', color: '#fff', padding: '10px 18px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
            + Create Server
          </Link>
        </div>

        {servers.length === 0 ? (
          <div style={{ backgroundColor: '#13151f', border: '1px solid #222', borderRadius: '12px', padding: '40px', textAlign: 'center', color: '#888' }}>
            No servers created yet. Click <strong>+ Create Server</strong> to start!
          </div>
        ) : (
          servers.map((server) => (
            <div key={server.id} style={{ backgroundColor: '#13151f', border: '1px solid #222', borderRadius: '12px', padding: '20px', marginBottom: '15px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{server.name}</h2>
                <span style={{ backgroundColor: '#064e3b', color: '#34d399', fontSize: '12px', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {server.status}
                </span>
              </div>

              <div style={{ fontSize: '13px', color: '#aaa', lineHeight: '2' }}>
                <div><strong>IP:</strong> {server.ip}</div>
                <div><strong>Type:</strong> {server.type}</div>
                <div><strong>RAM:</strong> 0 MiB / {server.ram} MiB</div>
                <div><strong>Disk:</strong> 0 MiB / {server.disk} MiB</div>
              </div>

              <div style={{ marginTop: '18px', display: 'flex', gap: '10px' }}>
                <Link href={`/server/${server.id}`} style={{ flex: 1, textAlign: 'center', backgroundColor: '#1f2430', color: '#fff', border: '1px solid #333', padding: '10px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                  Manage server
                </Link>
                <button
                  onClick={() => handleDelete(server.id)}
                  style={{ backgroundColor: '#991b1b', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}
