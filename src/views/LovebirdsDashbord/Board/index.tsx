/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

interface Guest {
  id: string | number;
  name: string;
  lang: 'en' | 'ru';
  isComing: boolean | null | undefined;
  note: string;
  invited: { adults: number; under18: number };
  coming?: { adults: number; under18: number };
}

const LovebirdsDashboard = () => {
  const [list, setList] = useState<Guest[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | number | null>(null);
  const [updatingId, setUpdatingId] = useState<string | number | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'yes' | 'no' | 'none'>('all');

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await fetch('https://rjj5lzk50b.execute-api.us-east-1.amazonaws.com/prod/guests/');
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

  const totals = list.reduce(
    (acc, guest) => {
      if (guest.isComing) {
        acc.adults += guest.coming?.adults || 0;
        acc.under18 += guest.coming?.under18 || 0;
      }
      return acc;
    },
    { adults: 0, under18: 0 }
  );

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

  const filteredList = list.filter((guest) => {
    const matchesSearch = guest.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'yes' && guest.isComing === true) ||
      (statusFilter === 'no' && guest.isComing === false) ||
      (statusFilter === 'none' && (guest.isComing === null || guest.isComing === undefined));
    return matchesSearch && matchesStatus;
  });

  const toggleLanguage = async (guest: Guest, newLang: 'en' | 'ru') => {
    setUpdatingId(guest.id);
    try {
      const response = await fetch(
        `https://rjj5lzk50b.execute-api.us-east-1.amazonaws.com/prod/guests/${guest.id}`,
        {
          method: 'POST',
          body: JSON.stringify({ ...guest, lang: newLang }),
          headers: { 'Content-Type': 'application/json' },
        },
      );
      if (response.ok) {
        setList((prev) => prev.map((g) => (g.id === guest.id ? { ...g, lang: newLang } : g)));
      }
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <div className="dashboard-container">Loading...</div>;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">🐦 Lovebirds Dashboard</h2>
        <div className="stats-badge">
          Total Coming: <strong>{totals.adults + totals.under18}</strong> 
          <span className="stats-breakdown">
            ({totals.adults} Adults, {totals.under18} Under 18)
          </span>
        </div>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search by name..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="status-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as any)}
        >
          <option value="all">All Statuses</option>
          <option value="yes">✅ Coming</option>
          <option value="no">❌ Not Coming</option>
          <option value="none">⏳ Didn't Reply</option>
        </select>

        <div className="results-count">
          Showing {filteredList.length} of {list.length} guests
        </div>
      </div>

      <table className="guest-table">
        <thead>
          <tr className="table-header">
            <th className="cell">Guest Name</th>
            <th className="cell">Language</th>
            <th className="cell">Coming?</th>
            <th className="cell cell-center">Adults</th>
            <th className="cell cell-center">Under 18</th>
            <th className="cell">Note</th>
            <th className="cell">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((guest) => (
            <tr key={guest.id}>
              <td className="cell cell-name">{guest.name}</td>
              <td className="cell">
                <div className="radio-group">
                  <button
                    onClick={() => guest.lang !== 'en' && toggleLanguage(guest, 'en')}
                    disabled={updatingId === guest.id}
                    className={`radio-btn radio-btn-left ${guest.lang === 'en' ? 'active' : ''}`}
                  >EN</button>
                  <button
                    onClick={() => guest.lang !== 'ru' && toggleLanguage(guest, 'ru')}
                    disabled={updatingId === guest.id}
                    className={`radio-btn radio-btn-right ${guest.lang === 'ru' ? 'active' : ''}`}
                  >RU</button>
                </div>
              </td>
              <td className="cell">{getStatus(guest.isComing)}</td>
              <td className="cell cell-center">
                {guest.isComing ? (guest.coming?.adults || 0) : '-'}
              </td>
              <td className="cell cell-center">
                {guest.isComing ? (guest.coming?.under18 || 0) : '-'}
              </td>
              <td className="cell cell-note">
                {guest.note || <span className="note-placeholder">No note</span>}
              </td>
              <td className="cell">
                <div className="actions-cell">
                  <button onClick={() => handleCopy(guest.id)} className="copy-btn">
                    {copiedId === guest.id ? '✅' : '📋'}
                  </button>
                  <a href={`https://www.georgyandedwine.com/${guest.id}`} target="_blank" rel="noreferrer" className="open-link">
                    Open
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredList.length === 0 && (
        <div className="empty-state">
          No guests found matching your filters.
        </div>
      )}
    </div>
  );
};

export default LovebirdsDashboard;