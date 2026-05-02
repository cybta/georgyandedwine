import { useState, useEffect, useRef } from 'react';
import './css/style.css';
import { useParams } from 'react-router-dom';
import mainData from '../components/mainData';
import RSVPForm from './components/RSVPForm'; // Import the new component
import InvitationDataUI from './components/InvitationDataUI'; // Import the new component

interface Guest {
  id: string | number;
  name: string;
  isComing: boolean | null | undefined;
  lang: 'en' | 'ru';
  note: string;
}

type MainData = {
  title: string;
  description: string;
  date: string;
};

const GuestPage = () => {
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  // 1. Create the reference
  const invitationRef = useRef<HTMLDivElement>(null);
  const [showInvitation, setShowInvitation] = useState(false);

  const [tempComing, setTempComing] = useState<boolean | null | undefined>(
    null,
  );

  const [tempNote, setTempNote] = useState('');
  const [guestName, setGuestName] = useState('');
  const [lang, setLang] = useState<'en' | 'ru'>('en');
  const [data, setData] = useState<MainData>();

  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const response = await fetch(
          'https://rjj5lzk50b.execute-api.us-east-1.amazonaws.com/prod/guests/',
        );
        const result: Guest[] = await response.json();
        const foundGuest = result.find((g) => String(g.id) === id);

        if (foundGuest) {
          setGuestName(foundGuest.name);
          setTempComing(foundGuest.isComing);
          setTempNote(foundGuest.note || '');
          setLang(foundGuest.lang || 'en');

          const getData: MainData | undefined = mainData(foundGuest.lang);
          setData(getData);
        }
      } catch (error) {
        console.error('Error fetching guest:', error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchGuestData();
  }, [id]);

  useEffect(() => {
    if (showInvitation && invitationRef.current) {
      // We use a small timeout to ensure the DOM has updated the 'opacity'
      // and layout before the scroll starts.
      const timer = setTimeout(() => {
        invitationRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [showInvitation]);

  const handleSubmit = async () => {
    if (tempComing === null || tempComing === undefined) {
      setShowError(true);
      return;
    }
    setIsSaving(true);
    setShowError(false);

    try {
      await fetch(
        `https://rjj5lzk50b.execute-api.us-east-1.amazonaws.com/prod/guests/${id}`,
        {
          method: 'POST',
          body: JSON.stringify({
            isComing: tempComing,
            note: tempNote,
            lang: lang,
          }),
          headers: { 'Content-Type': 'application/json' },
        },
      );
      setSuccess(true);
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.log(error);
      alert('Something went wrong saving your RSVP.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleStart = () => {
    setShowInvitation(true);
  };

  if (loading) return <div className='container'>Loading invitation...</div>;
  if (!guestName) return <div className='container'>Invitation not found.</div>;

  return (
    <div className='container'>
      <section className='welcome-screen pad-20'>
        <h2 className='guest-greeting'>{guestName}!</h2>

        <h1>{data?.title}</h1>
        <h2>{data?.description}</h2>
        <h3>{data?.date}</h3>

        <p className='sub-text'>We'd love to know if you can join us.</p>

        <button
          className={ showInvitation ? 'start-btn hide' : 'start-btn show'}
          onClick={() => handleStart()}
        >
          Start
        </button>
      </section>

      <section
        ref={invitationRef}
        className={`invitation-details pad-20 ${showInvitation ? 'show-invitation' : 'hide-invitation'}`}
      >

        <InvitationDataUI lang={lang} />

        <RSVPForm
          tempComing={tempComing}
          setTempComing={setTempComing}
          tempNote={tempNote}
          setTempNote={setTempNote}
          handleSubmit={handleSubmit}
          isSaving={isSaving}
          showError={showError}
          setShowError={setShowError}
          success={success}
          isFormValid={tempComing !== null && tempComing !== undefined}
        />
      </section>
    </div>
  );
};

export default GuestPage;
