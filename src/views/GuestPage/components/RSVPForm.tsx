import React from 'react';

interface RSVPFormProps {
  tempComing: boolean | null | undefined;
  setTempComing: (val: boolean) => void;
  tempNote: string;
  setTempNote: (val: string) => void;
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
  handleSubmit,
  isSaving,
  showError,
  setShowError,
  success,
  isFormValid,
}) => {
  return (
    <div className='rsvp-card'>
      <div style={{ marginBottom: '30px' }}>
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
            }}
            className={`toggle-button ${tempComing === true ? 'active-yes' : ''} ${showError ? 'error-border' : ''}`}
          >
            Yes, I'm Coming!
          </button>
          <button
            onClick={() => {
              setTempComing(false);
              setShowError(false);
            }}
            className={`toggle-button ${tempComing === false ? 'active-no' : ''} ${showError ? 'error-border' : ''}`}
          >
            Regretfully, No
          </button>
        </div>
      </div>

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
        disabled={!isFormValid || isSaving}
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
