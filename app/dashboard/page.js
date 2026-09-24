'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [servers, setServers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/servers/list')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setServers(data.servers);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ backgroundColor: '#0d0e15', color: '#fff', minHeight: '100vh', padding: '30px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 'bold', margin: 0 }}>Welcome back</h1>
            <p style={{ color: '#888', fontSize: '14px', marginTop: '4px' }}>Here you can see all the servers you have access to.</p>
          </div>
          <Link href="/" style={{ backgroundColor: '#6b21a8', color: '#fff', padding: '10px 18px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
            + Create Server
          </Link>
        </div>

        {/* Loading State */}
        {loading && <p style={{ color: '#888' }}>Loading your servers...</p>}

        {/* Server Cards List */}
        {!loading && servers.map((server) => (
          <div key={server.id} style={{ backgroundColor: '#13151f', border: '1px solid #222', borderRadius: '12px', padding: '20px', marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{server.name}</h2>
              <span style={{ backgroundColor: '#064e3b', color: '#34d399', fontSize: '12px', padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                {server.status}
              </span>
            </div>

            <div style={{ fontSize: '13px', color: '#aaa', lineHeight: '2' }}>
              <div><strong>IP:</strong> {server.ip}</div>
              <div><strong>CPU:</strong> {server.cpuUsed || 0}% / {server.cpuLimit}%</div>
              <div><strong>RAM:</strong> {server.memoryUsed || 0} MiB / {server.memoryLimit} MiB</div>
              <div><strong>Disk:</strong> {server.diskUsed || 0} MiB / {server.diskLimit} MiB</div>
            </div>

            <div style={{ marginTop: '18px' }}>
              <Link href={`/server/${server.id}`} style={{ display: 'block', textAlign: 'center', backgroundColor: '#1f2430', color: '#fff', border: '1px solid #333', padding: '10px', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>
                Manage server
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
