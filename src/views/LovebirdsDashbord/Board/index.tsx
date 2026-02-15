import React, { useState, useEffect } from 'react';

interface Guest {
  id: string | number;
  name: string;
  isComing: boolean | null | undefined;
  note: string;
}

const LovebirdsDashboard = () => {
  const [list, setList] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | number | null>(null);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await fetch(
          'https://rjj5lzk50b.execute-api.us-east-1.amazonaws.com/prod/guests/',
        );
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.error('Failed to fetch:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchGuests();
  }, []);

  const handleCopy = (id: string | number) => {
    const url = `https://www.georgyandedwine.com/${id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStatus = (coming: boolean | null | undefined) => {
    if (coming === true) return '✅ Yes';
    if (coming === false) return '❌ No';
    return "⏳ Didn't reply";
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#333' }}>Guest List</h2>

      <table
        style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left' }}>
            <th style={cellStyle}>Guest Name</th>
            <th style={cellStyle}>Coming?</th>
            <th style={cellStyle}>Note</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((guest) => (
            <tr key={guest.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ ...cellStyle, fontWeight: 'bold' }}>{guest.name}</td>
              <td style={cellStyle}>{getStatus(guest.isComing)}</td>
              <td
                style={{
                  ...cellStyle,
                  color: '#666',
                  maxWidth: '300px',
                  fontSize: '14px',
                }}
              >
                {guest.note || (
                  <span style={{ opacity: 0.5 }}>No note provided</span>
                )}
              </td>
              <td style={cellStyle}>
                <div
                  style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
                >
                  <button
                    onClick={() => handleCopy(guest.id)}
                    style={copyButtonStyle}
                    title='Copy Personal Link'
                  >
                    {copiedId === guest.id ? '✅' : '📋'}
                  </button>
                  <a
                    href={`https://www.georgyandedwine.com/${guest.id}`}
                    target='_blank'
                    rel='noreferrer'
                    style={{
                      fontSize: '12px',
                      color: '#007bff',
                      textDecoration: 'none',
                    }}
                  >
                    Open Page
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cellStyle: React.CSSProperties = {
  padding: '12px 15px',
  borderBottom: '1px solid #ddd',
};

const copyButtonStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #ddd',
  borderRadius: '6px',
  cursor: 'pointer',
  padding: '5px 10px',
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
};

export default LovebirdsDashboard;
