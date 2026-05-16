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
  lang: 'en' | 'ru';
}

// 🌐 Translation Dictionary
const translations = {
  en: {
    deadline: 'Kindly confirm your presence Before July 1.',
    question: 'Will you be attending?',
    errorMsg: 'Please complete all required fields before submitting.',
    btnYes: 'Yes, Of Course!',
    btnNo: 'Regretfully, No',
    labelAdults: 'Adults',
    labelKids: 'Under 18',
    messageLabel: 'Write a message for the Bride & Groom:',
    placeholder: 'Your message here... (Required)',
    btnSubmit: 'Submit My RSVP',
    btnSaving: 'Saving...',
    successMsg: '🎉 Thank you! Your RSVP has been received.',
  },
  ru: {
    deadline: 'Пожалуйста, подтвердите ваше присутствие до первого июля.',
    question: 'Вы сможете присутствовать?',
    errorMsg: 'Пожалуйста, заполните все обязательные поля перед отправкой.',
    btnYes: 'Да, конечно!',
    btnNo: 'К сожалению, нет',
    labelAdults: 'Взрослые',
    labelKids: 'До 18 лет',
    messageLabel: 'Напишите пожелание или сообщение для жениха и невесты:',
    placeholder: 'Ваше сообщение здесь... (Обязательно)',
    btnSubmit: 'Отправить ответ',
    btnSaving: 'Сохранение...',
    successMsg: '🎉 Спасибо! Ваш ответ на приглашение успешно получен.',
  }
};

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
  lang
}) => {
  
  // Guard fallback in case lang is missing or undefined
  const t = translations[lang] || translations.en;

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
        <div className='reservation-text-top'>{t.deadline}</div>
        <p className='input-label' style={{ textAlign: 'center' }}>
          {t.question} <span style={{ color: '#b2313d' }}>*</span>
        </p>

        {showError && (
          <p className='error-msg'>
            {t.errorMsg}
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
            {t.btnYes}
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
            {t.btnNo}
          </button>
        </div>
      </div>

      {tempComing === true && (
        <div className="guest-selection-container" style={{ marginBottom: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <div className="dropdown-field">
            <label className="input-label">{t.labelAdults}</label>
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
              <label className="input-label">{t.labelKids}</label>
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
          {t.messageLabel} <span style={{ color: '#b2313d' }}>*</span>
        </label>
        <textarea
          className={`note-textarea ${showError && !isMessageWritten ? 'error-border' : ''}`}
          value={tempNote}
          onChange={(e) => setTempNote(e.target.value)}
          placeholder={t.placeholder}
          required
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isActuallyValid || isSaving}
        className={`submit-btn ${isSaving ? 'saving' : ''}`}
      >
        {isSaving ? t.btnSaving : t.btnSubmit}
      </button>

      {success && (
        <div className='success-msg'>
          {t.successMsg}
        </div>
      )}
    </div>
  );
};

export default RSVPForm;