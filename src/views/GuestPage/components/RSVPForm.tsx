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
  
  // Form is valid if text is typed AND they chose a status (and adults > 0 if they're coming)
  const isMessageWritten = tempNote.trim().length > 0;
  const isActuallyValid = 
    isMessageWritten && 
    (tempComing === false || (tempComing === true && tempAdults > 0));

  const createOptions = (min: number, max: number) => 
    Array.from({ length: max - min + 1 }, (_, i) => i + min);

  return (
    <div className='rsvp-card'>
      <div style={{ marginBottom: '30px' }}>
        <div>Kindly confirm your presence Before July the first.</div>
        <p className='input-label' style={{ textAlign: 'center' }}>
          Will you be attending? <span style={{ color: '#b2313d' }}>*</span>
        </p>

        {showError && (
          <p className='error-msg'>
            Please complete all required fields before submitting.
          </p>
        )}

        <div className='button-group'>
          <button
            onClick={() => {
              setTempComing(true);
              setShowError(false);
              if (tempAdults === 0) setTempAdults(1);
            }}
            className={`toggle-button ${tempComing === true ? 'active-yes' : ''} ${showError ? 'error-border' : ''}`}
          >
            Yes, Of Course!
          </button>
          <button
            onClick={() => {
              setTempComing(false);
              setShowError(false);
              setTempAdults(0);
              setTempUnder18(0);
            }}
            className={`toggle-button ${tempComing === false ? 'active-no' : ''} ${showError ? 'error-border' : ''}`}
          >
            Regretfully, No
          </button>
        </div>
      </div>

      {tempComing === true && (
        <div className="guest-selection-container" style={{ marginBottom: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <div className="dropdown-field">
            <label className="input-label">Adults</label>
            <select 
              value={tempAdults} 
              onChange={(e) => setTempAdults(Number(e.target.value))}
              className="guest-dropdown"
            >
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
        <label className='input-label'>
          Write a message for the Bride & Groom: <span style={{ color: '#b2313d' }}>*</span>
        </label>
        <textarea
          className={`note-textarea ${showError && !isMessageWritten ? 'error-border' : ''}`}
          value={tempNote}
          onChange={(e) => setTempNote(e.target.value)}
          placeholder='Your message here... (Required)'
          required
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