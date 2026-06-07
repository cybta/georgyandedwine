import React from 'react';

interface RSVPFormProps {
  tempComing: boolean | null | undefined;
  setTempComing: (val: boolean | null) => void;
  tempNote: string;
  setTempNote: (val: string) => void;
  tempAdults: number | '';
  setTempAdults: (val: number | '') => void;
  tempUnder18: number | '';
  setTempUnder18: (val: number | '') => void;
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
    selectPlaceholder: 'Select...',
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
    selectPlaceholder: 'Выбрать...',
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

  const isMessageWritten = tempNote.trim().length > 0;
  
  // Validation checks for individual field status
  const isAttendanceSelected = tempComing === true || tempComing === false;
  const isAdultsSelected = tempComing === true ? (typeof tempAdults === 'number' && tempAdults > 0) : true;
  const isKidsSelected = (tempComing === true && maxUnder18 > 0) ? (typeof tempUnder18 === 'number') : true;
  
  // The client-side validity check to block/allow final backend processing
  const isActuallyValid = 
    isMessageWritten && 
    isAttendanceSelected && 
    isAdultsSelected && 
    isKidsSelected;

  const createOptions = (min: number, max: number) => 
    Array.from({ length: max - min + 1 }, (_, i) => i + min);

  // Custom click handler to capture validation states properly before running submission logic
  const onFormSubmitClick = () => {
    if (!isActuallyValid) {
      setShowError(true);
    } else {
      setShowError(false);
      handleSubmit();
    }
  };

  return (
    <div className='rsvp-card'>
      <div style={{ marginBottom: '30px' }}>
        <div className='reservation-text-top'>{t.deadline}</div>
        <p className='input-label' style={{ textAlign: 'center' }}>
          {t.question} <span style={{ color: '#b2313d' }}>*</span>
        </p>

        {showError && !isActuallyValid && (
          <p className='error-msg-box'>
            {t.errorMsg}
          </p>
        )}

        <div className='button-group'>
          <button
            type="button"
            onClick={() => {
              setTempComing(true);
              setTempAdults('');
              setTempUnder18('');
            }}
            className={`toggle-button ${tempComing === true ? 'active-yes' : ''} ${(showError && !isAttendanceSelected) ? 'error-border' : ''}`}
          >
            {t.btnYes}
          </button>
          <button
            type="button"
            onClick={() => {
              setTempComing(false);
              setTempAdults(0);
              setTempUnder18(0);
            }}
            className={`toggle-button ${tempComing === false ? 'active-no' : ''} ${(showError && !isAttendanceSelected) ? 'error-border' : ''}`}
          >
            {t.btnNo}
          </button>
        </div>
      </div>

      {tempComing === true && (
        <div className="guest-selection-container" style={{ marginBottom: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
          <div className="dropdown-field">
            <label className="input-label">{t.labelAdults} <span style={{ color: '#b2313d' }}>*</span></label>
            <select 
              value={tempAdults} 
              onChange={(e) => setTempAdults(e.target.value === '' ? '' : Number(e.target.value))}
              className={`guest-dropdown ${showError && !isAdultsSelected ? 'error-border' : ''}`}
            >
              <option value="">{t.selectPlaceholder}</option>
              {createOptions(1, maxAdults).map(num => (
                <option key={num} value={num}>{num}</option>
              ))}
            </select>
          </div>

          {maxUnder18 > 0 && (
            <div className="dropdown-field">
              <label className="input-label">{t.labelKids} <span style={{ color: '#b2313d' }}>*</span></label>
              <select 
                value={tempUnder18} 
                onChange={(e) => setTempUnder18(e.target.value === '' ? '' : Number(e.target.value))}
                className={`guest-dropdown ${showError && !isKidsSelected ? 'error-border' : ''}`}
              >
                <option value="">{t.selectPlaceholder}</option>
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
        onClick={onFormSubmitClick}
        disabled={isSaving}
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