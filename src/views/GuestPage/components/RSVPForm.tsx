import React from 'react';

interface RSVPFormProps {
  tempComing: boolean | null | undefined;
  setTempComing: (val: boolean) => void;
  tempNote: string;
  setTempNote: (val: string) => void;
  tempAdults: number;
  setTempAdults: (val: number) => void;
  tempUnder18: number;
  setTempUnder18: (val: number) => void;
  maxAdults: number;
  maxUnder18: number;
  handleSubmit: () => void;
  isSaving: boolean;
  showError: boolean;
  setShowError: (val: boolean) => void;
  success: boolean;
  isFormValid: boolean;
}

const RSVPForm: React.FC<RSVPFormProps> = ({
  tempComing,
  setTempComing,
  tempNote,
  setTempNote,
  tempAdults,
  setTempAdults,
  tempUnder18,
  setTempUnder18,
  maxAdults,
  maxUnder18,
  handleSubmit,
  isSaving,
  showError,
  setShowError,
  success,
}) => {
  
  // 1. Logic: Form is valid if:
  // - They said No
  // - OR they said Yes AND at least one person (adult or child) is selected
  const isActuallyValid = 
    tempComing === false || 
    (tempComing === true && (tempAdults + tempUnder18) > 0);

  // Helper to generate array for dropdown options
  // For adults, if attending, we start the range from 1 to avoid "Yes" with 0 guests.
  const createOptions = (min: number, max: number) => 
    Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return (
    <div className='rsvp-card'>
      <div style={{ marginBottom: '30px' }}>
        <div>Kindly confirm your presence Before July 1st.</div>
        <p className='input-label' style={{ textAlign: 'center' }}>
          Will you be attending? <span style={{ color: '#b2313d' }}>*</span>
        </p>

        {showError && (
          <p className='error-msg'>
            Please select an option before submitting.
          </p>
        )}

        <div className='button-group'>
          <button
            onClick={() => {
              setTempComing(true);
              setShowError(false);
              // If they click Yes and it's currently 0, default to 1 adult
              if (tempAdults === 0) setTempAdults(1);
            }}
            className={`toggle-button ${tempComing === true ? 'active-yes' : ''} ${showError ? 'error-border' : ''}`}
          >
            Yes, I'm Coming!
          </button>
          <button
            onClick={() => {
              setTempComing(false);
              setShowError(false);
              // Set counts to 0 and they will be hidden
              setTempAdults(0);
              setTempUnder18(0);
            }}
            className={`toggle-button ${tempComing === false ? 'active-no' : ''} ${showError ? 'error-border' : ''}`}
          >
            Regretfully, No
          </button>
        </div>
      </div>

      {/* Conditional Rendering: Only show guest counts if "Coming" is true */}
      {tempComing === true && (
        <div className="guest-selection-container" style={{ marginBottom: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <div className="dropdown-field">
            <label className="input-label">Adults</label>
            <select 
              value={tempAdults} 
              onChange={(e) => setTempAdults(Number(e.target.value))}
              className="guest-dropdown"
            >
              {/* If coming, Adults must be at least 1 (unless they are only bringing children) */}
              {/* Usually, at least 1 adult is required for an RSVP group */}
              {createOptions(1, maxAdults).map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {maxUnder18 > 0 && (
            <div className="dropdown-field">
              <label className="input-label">Under 18</label>
              <select 
                value={tempUnder18} 
                onChange={(e) => setTempUnder18(Number(e.target.value))}
                className="guest-dropdown"
              >
                {createOptions(0, maxUnder18).map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}

      <div style={{ textAlign: 'left' }}>
        <label className='input-label'>Say something for the couple:</label>
        <textarea
          className='note-textarea'
          value={tempNote}
          onChange={(e) => setTempNote(e.target.value)}
          placeholder='Your message here...'
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isActuallyValid || isSaving}
        className={`submit-btn ${isSaving ? 'saving' : ''}`}
      >
        {isSaving ? 'Saving...' : 'Submit My RSVP'}
      </button>

      {success && (
        <div className='success-msg'>
          🎉 Thank you! Your RSVP has been received.
        </div>
      )}
    </div>
  );
};

export default RSVPForm;