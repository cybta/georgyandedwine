/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';

interface Guest {
  id: string | number;
  name: string;
  lang: 'en' | 'ru';
  isComing: boolean | null | undefined;
  note: string;
}

const LovebirdsDashboard = () => {
  const [list, setList] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | number | null>(null);
  const [updatingId, setUpdatingId] = useState<string | number | null>(null);

  // --- New Filter State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<
    'all' | 'yes' | 'no' | 'none'
  >('all');

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

  // --- Filtering Logic ---
  const filteredList = list.filter((guest) => {
    const matchesSearch = guest.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'yes' && guest.isComing === true) ||
      (statusFilter === 'no' && guest.isComing === false) ||
      (statusFilter === 'none' &&
        (guest.isComing === null || guest.isComing === undefined));

    return matchesSearch && matchesStatus;
  });

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;

  const toggleLanguage = async (guest: Guest, newLang: 'en' | 'ru') => {
    setUpdatingId(guest.id);

    // Prepare the full object as required by your API
    const updatedGuest = {
      ...guest,
      lang: newLang,
    };

    try {
      const response = await fetch(
        `https://rjj5lzk50b.execute-api.us-east-1.amazonaws.com/prod/guests/${guest.id}`,
        {
          method: 'POST',
          // Sending the full object instead of just { lang: newLang }
          body: JSON.stringify(updatedGuest),
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (response.ok) {
        setList((prev) =>
          prev.map((g) => (g.id === guest.id ? { ...g, lang: newLang } : g)),
        );
      } else {
        console.error('Server responded with an error');
      }
    } catch (error) {
      console.error('Update error:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'sans-serif',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <h2 style={{ color: '#333' }}>🐦 Lovebirds Dashboard</h2>

      {/* --- Filter Bar --- */}
      <div style={filterBarStyle}>
        <input
          type='text'
          placeholder='Search by name...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={inputStyle}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
          style={selectStyle}
        >
          <option value='all'>All Statuses</option>
          <option value='yes'>✅ Coming</option>
          <option value='no'>❌ Not Coming</option>
          <option value='none'>⏳ Didn't Reply</option>
        </select>

        <div style={{ marginLeft: 'auto', color: '#888', fontSize: '14px' }}>
          Showing {filteredList.length} of {list.length} guests
        </div>
      </div>

      <table
        style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}
      >
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa', textAlign: 'left' }}>
            <th style={cellStyle}>Guest Name</th>
            <th style={cellStyle}>language</th>
            <th style={cellStyle}>Coming?</th>
            <th style={cellStyle}>Note</th>
            <th style={cellStyle}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((guest) => (
            <tr key={guest.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ ...cellStyle, fontWeight: 'bold' }}>{guest.name}</td>
              <td style={cellStyle}>
                <div style={radioGroupStyle}>
                  <button
                    onClick={() =>
                      guest.lang !== 'en' && toggleLanguage(guest, 'en')
                    }
                    disabled={updatingId === guest.id}
                    style={{
                      ...radioButtonStyle,
                      backgroundColor: guest.lang === 'en' ? '#b2313d' : '#fff',
                      color: guest.lang === 'en' ? '#fff' : '#333',
                      borderRight: 'none',
                      borderRadius: '6px 0 0 6px',
                    }}
                  >
                    EN
                  </button>
                  <button
                    onClick={() =>
                      guest.lang !== 'ru' && toggleLanguage(guest, 'ru')
                    }
                    disabled={updatingId === guest.id}
                    style={{
                      ...radioButtonStyle,
                      backgroundColor: guest.lang === 'ru' ? '#b2313d' : '#fff',
                      color: guest.lang === 'ru' ? '#fff' : '#333',
                      borderRadius: '0 6px 6px 0',
                    }}
                  >
                    RU
                  </button>
                </div>
              </td>
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
                  >
                    {copiedId === guest.id ? '✅' : '📋'}
                  </button>
                  <a
                    href={`https://www.georgyandedwine.com/${guest.id}`}
                    target='_blank'
                    rel='noreferrer'
                    style={linkStyle}
                  >
                    Open Page
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredList.length === 0 && (
        <div style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
          No guests found matching your filters.
        </div>
      )}
    </div>
  );
};

// --- Styles ---
const cellStyle: React.CSSProperties = {
  padding: '12px 15px',
  borderBottom: '1px solid #ddd',
};

const filterBarStyle: React.CSSProperties = {
  display: 'flex',
  gap: '15px',
  marginBottom: '20px',
  alignItems: 'center',
  backgroundColor: '#fff',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
};

const radioGroupStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
};

const radioButtonStyle: React.CSSProperties = {
  padding: '6px 12px',
  fontSize: '11px',
  fontWeight: 'bold',
  border: '1px solid #ddd',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  minWidth: '45px',
  outline: 'none',
};

const inputStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ddd',
  width: '250px',
  fontSize: '14px',
};

const selectStyle: React.CSSProperties = {
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #ddd',
  backgroundColor: '#fff',
  fontSize: '14px',
  cursor: 'pointer',
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

const linkStyle: React.CSSProperties = {
  fontSize: '12px',
  color: '#007bff',
  textDecoration: 'none',
  fontWeight: 'bold',
};

export default LovebirdsDashboard;
