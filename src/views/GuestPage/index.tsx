import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Guest {
  id: string | number;
  name: string;
  isComing: boolean | null | undefined;
  note: string;
}

const GuestPage = () => {
  const { id } = useParams<{ id: string }>();

  // State Management
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // Form State
  const [tempComing, setTempComing] = useState<boolean | null | undefined>(
    null,
  );
  const [tempNote, setTempNote] = useState('');
  const [guestName, setGuestName] = useState('');

  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const response = await fetch(
          'https://rjj5lzk50b.execute-api.us-east-1.amazonaws.com/prod/guests/',
        );
        const data: Guest[] = await response.json();

        // Find specific guest by ID from URL
        const foundGuest = data.find((g) => String(g.id) === id);

        if (foundGuest) {
          setGuestName(foundGuest.name);
          setTempComing(foundGuest.isComing);
          setTempNote(foundGuest.note || '');
        }
      } catch (error) {
        console.error('Error fetching guest:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchGuestData();
  }, [id]);

  const handleSubmit = async () => {
    // FORCE VALIDATION: Stop if no choice is made
    if (tempComing === null || tempComing === undefined) {
      setShowError(true);
      return;
    }

    setIsSaving(true);
    setShowError(false);

    const payload = {
      isComing: tempComing,
      note: tempNote,
    };

    try {
      // Sending update to the API
      await fetch(
        `https://rjj5lzk50b.execute-api.us-east-1.amazonaws.com/prod/guests/${id}`,
        {
          method: 'POST',
          body: JSON.stringify(payload),
          headers: { 'Content-Type': 'application/json' },
        },
      );

      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000); // Hide success message after 4s
    } catch (error) {
      console.error('Failed to save:', error);
      alert('Something went wrong saving your RSVP.');
    } finally {
      setIsSaving(false);
    }
  };

  // Determine if the submit button should look active
  const isFormValid = tempComing !== null && tempComing !== undefined;

  if (loading) return <div style={containerStyle}>Loading invitation...</div>;
  if (!guestName)
    return <div style={containerStyle}>Invitation not found.</div>;

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h1 style={{ color: '#b2313d', margin: '0 0 10px 0' }}>
          Hi {guestName}!
        </h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          We'd love to know if you can join us.
        </p>

        {/* --- RSVP Toggle Section --- */}
        <div style={{ marginBottom: '30px' }}>
          <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>
            Will you be attending? <span style={{ color: '#b2313d' }}>*</span>
          </p>

          {showError && (
            <p
              style={{
                color: '#b2313d',
                fontSize: '14px',
                marginBottom: '10px',
              }}
            >
              Please select an option before submitting.
            </p>
          )}

          <div style={buttonGroupStyle}>
            <button
              onClick={() => {
                setTempComing(true);
                setShowError(false);
              }}
              style={{
                ...toggleButtonStyle,
                backgroundColor: tempComing === true ? '#28a745' : '#fff',
                color: tempComing === true ? '#fff' : '#333',
                borderColor:
                  tempComing === true
                    ? '#28a745'
                    : showError
                      ? '#b2313d'
                      : '#ddd',
              }}
            >
              Yes, I'm Coming!
            </button>
            <button
              onClick={() => {
                setTempComing(false);
                setShowError(false);
              }}
              style={{
                ...toggleButtonStyle,
                backgroundColor: tempComing === false ? '#b2313d' : '#fff',
                color: tempComing === false ? '#fff' : '#333',
                borderColor:
                  tempComing === false
                    ? '#b2313d'
                    : showError
                      ? '#b2313d'
                      : '#ddd',
              }}
            >
              Regretfully, No
            </button>
          </div>
        </div>

        {/* --- Notes Section --- */}
        <div style={{ textAlign: 'left', marginBottom: '30px' }}>
          <label style={labelStyle}>Add a note (dietary needs, etc):</label>
          <textarea
            value={tempNote}
            onChange={(e) => setTempNote(e.target.value)}
            placeholder='Your message here...'
            style={textareaStyle}
          />
        </div>

        {/* --- Submit Button --- */}
        <button
          onClick={handleSubmit}
          disabled={isSaving}
          style={{
            ...submitButtonStyle,
            backgroundColor: !isFormValid
              ? '#eee'
              : isSaving
                ? '#aaa'
                : '#b2313d',
            color: !isFormValid ? '#999' : '#fff',
            cursor: !isFormValid ? 'not-allowed' : 'pointer',
          }}
        >
          {isSaving ? 'Saving...' : 'Submit My RSVP'}
        </button>

        {success && (
          <div
            style={{ marginTop: '20px', color: '#28a745', fontWeight: 'bold' }}
          >
            🎉 Thank you! Your RSVP has been received.
          </div>
        )}
      </div>
    </div>
  );
};

// --- Styles ---
const containerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundColor: '#fff5f8',
  padding: '20px',
};

const cardStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '40px',
  borderRadius: '24px',
  boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
  textAlign: 'center',
  maxWidth: '450px',
  width: '100%',
  fontFamily: 'sans-serif',
};

const buttonGroupStyle: React.CSSProperties = {
  display: 'flex',
  gap: '15px',
  justifyContent: 'center',
};

const toggleButtonStyle: React.CSSProperties = {
  padding: '14px 20px',
  border: '2px solid',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  fontWeight: 'bold',
  flex: 1,
  fontSize: '14px',
};

const labelStyle: React.CSSProperties = {
  fontWeight: 'bold',
  display: 'block',
  marginBottom: '10px',
  fontSize: '14px',
  color: '#444',
};

const textareaStyle: React.CSSProperties = {
  width: '100%',
  height: '120px',
  padding: '12px',
  borderRadius: '12px',
  border: '1px solid #ddd',
  fontFamily: 'inherit',
  resize: 'none',
  boxSizing: 'border-box',
  outline: 'none',
};

const submitButtonStyle: React.CSSProperties = {
  width: '100%',
  padding: '16px',
  border: 'none',
  borderRadius: '12px',
  fontWeight: 'bold',
  fontSize: '16px',
  transition: 'all 0.3s',
};

export default GuestPage;
