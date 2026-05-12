import { useState, useEffect, useRef } from 'react';
import './css/style.css';
import { useParams } from 'react-router-dom';
import mainData from '../components/mainData';
import RSVPForm from './components/RSVPForm'; 
import InvitationDataUI from './components/InvitationDataUI';

interface Guest {
  id: string | number;
  name: string;
  isComing: boolean | null | undefined;
  lang: 'en' | 'ru';
  note: string;
  // Added invited and coming structures
  invited: {
    adults: number;
    under18: number;
  };
  coming?: {
    adults: number;
    under18: number;
  };
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

  const invitationRef = useRef<HTMLDivElement>(null);
  const [showInvitation, setShowInvitation] = useState(false);

  const [tempComing, setTempComing] = useState<boolean | null | undefined>(null);
  const [tempNote, setTempNote] = useState('');
  
  // New States for counts
  const [tempAdults, setTempAdults] = useState<number>(0);
  const [tempUnder18, setTempUnder18] = useState<number>(0);
  
  // State to store the limits from the "invited" object
  const [maxAdults, setMaxAdults] = useState<number>(0);
  const [maxUnder18, setMaxUnder18] = useState<number>(0);

  const [lang, setLang] = useState<'en' | 'ru'>('en');
  const [data, setData] = useState<MainData>();

  // Inside GuestPage component
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Optional: if you want to track play state

  useEffect(() => {
    if (!loading) { // Only run logic if loading is finished
      if (!showInvitation) {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100dvh';
        window.scrollTo(0, 0);
      } else {
        document.documentElement.style.overflow = 'auto';
        document.body.style.overflow = 'auto';
        document.body.style.height = 'auto';
      }
    }
    
    // Clean up function to ensure scroll is restored if component unmounts
    return () => {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    };
  }, [showInvitation, loading]);

  useEffect(() => {
    const fetchGuestData = async () => {
      try {
        const response = await fetch(
          'https://rjj5lzk50b.execute-api.us-east-1.amazonaws.com/prod/guests/',
        );
        const result: Guest[] = await response.json();
        const foundGuest = result.find((g) => String(g.id) === id);

        if (foundGuest) {
          setTempComing(foundGuest.isComing);
          setTempNote(foundGuest.note || '');
          setLang(foundGuest.lang || 'en');
          
          // Set max limits from the fetched 'invited' data
          setMaxAdults(foundGuest.invited?.adults || 0);
          setMaxUnder18(foundGuest.invited?.under18 || 0);

          // Set initial selection based on previous RSVP or default to max
          setTempAdults(foundGuest.coming?.adults ?? foundGuest.invited?.adults ?? 0);
          setTempUnder18(foundGuest.coming?.under18 ?? foundGuest.invited?.under18 ?? 0);

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
            // Send the coming object as requested
            coming: {
                adults: tempComing ? tempAdults : 0,
                under18: tempComing ? tempUnder18 : 0
            }
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

  useEffect(() => {
  // Create audio instance
  audioRef.current = new Audio('/audio/bg-music.mp3');
  audioRef.current.loop = true; // Optional: keeps the music playing
  audioRef.current.volume = 0.3;

  // Cleanup: Stop music if user leaves the page
  return () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };
}, []);

  const handleStart = () => {
    setShowInvitation(true);

    // Play the audio
    if (audioRef.current) {
      audioRef.current.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
      setIsPlaying(true);
    }

    console.log('Invitation revealed, audio should play', isPlaying);
  };

  if (loading) return <div className='container'>Loading invitation...</div>;

  return (
    <div className={`container ${!showInvitation ? 'no-scroll' : ''}`}>
      <section className='welcome-screen pad-20'>
        <h1 className={`namesGEmain ${lang === 'ru' ? 'ru' : ''}`}>{data?.title}</h1>
        <h3>{data?.date}</h3>
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
        <InvitationDataUI lang={lang} id={id} />

        <RSVPForm
          tempComing={tempComing}
          setTempComing={setTempComing}
          tempNote={tempNote}
          setTempNote={setTempNote}
          // Pass new props to Form
          tempAdults={tempAdults}
          setTempAdults={setTempAdults}
          tempUnder18={tempUnder18}
          setTempUnder18={setTempUnder18}
          maxAdults={maxAdults}
          maxUnder18={maxUnder18}
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