import { useState, useEffect, useRef } from 'react';
import './css/style.css';
import { useParams, useNavigate } from 'react-router-dom';
import mainData from '../components/mainData';
import RSVPForm from './components/RSVPForm'; 
import InvitationDataUI from './components/InvitationDataUI';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

// Vite imports this asset and compiles a unique path version for deployment
import weddingMusic from '../assets/bg-music.mp3';

interface Guest {
  id: string | number;
  name: string;
  isComing: boolean | null | undefined;
  lang: 'en' | 'ru';
  note: string;
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
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const invitationRef = useRef<HTMLDivElement>(null);
  const [showInvitation, setShowInvitation] = useState(false);

  const [tempComing, setTempComing] = useState<boolean | null | undefined>(null);
  const [tempNote, setTempNote] = useState('');
  
  const [tempAdults, setTempAdults] = useState<number | ''>('');
  const [tempUnder18, setTempUnder18] = useState<number | ''>('');
  
  const [maxAdults, setMaxAdults] = useState<number>(0);
  const [maxUnder18, setMaxUnder18] = useState<number>(0);

  const [lang, setLang] = useState<'en' | 'ru'>('en');
  const [data, setData] = useState<MainData>();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); 

  useEffect(() => {
    if (!loading) { 
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
          
          setMaxAdults(foundGuest.invited?.adults || 0);
          setMaxUnder18(foundGuest.invited?.under18 || 0);

          setTempAdults(foundGuest.coming?.adults ?? foundGuest.invited?.adults ?? 0);
          setTempUnder18(foundGuest.coming?.under18 ?? foundGuest.invited?.under18 ?? 0);

          const guestLang = foundGuest.lang || 'en';
          const getData: MainData | undefined = mainData(guestLang);
          setData(getData);

          // DYNAMIC META TAG UPDATE LOGIC
          const titleText = guestLang === 'ru' ? 'Георгий и Эдвин' : 'Georgy & Edwine';
          const descText = guestLang === 'ru' 
            ? 'Вы приглашены на свадьбу Георгия и Эдвин!' 
            : "You are invited to Georgy & Edwine's wedding!";

          document.title = titleText;

          document.querySelector('meta[property="og:title"]')?.setAttribute('content', titleText);
          document.querySelector('meta[property="og:description"]')?.setAttribute('content', descText);
        } else {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Error fetching guest:', error);
        navigate('/', { replace: true });
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchGuestData();
  }, [id, navigate]); 

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

  // Fixed hook referencing the bundled binary asset module instead of a static string URL
  useEffect(() => {
    audioRef.current = new Audio(weddingMusic);
    audioRef.current.loop = true; 
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25, 
        delayChildren: 0.1,    
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      }
    }
  };

  const handleStart = () => {
    setShowInvitation(true);

    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true); 
        })
        .catch(error => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(err => console.log(err));
      setIsPlaying(true);
    }
  };

  if (loading) return <div className='container white-col'>Loading invitation...</div>;

  return (
    <div className={`container ${!showInvitation ? 'no-scroll' : ''}`}>
      
      {showInvitation && (
        <button 
          onClick={toggleMute}
          className={`audio-toggle-btn ${isPlaying ? "mute-icon" : "unmute-icon"}`}
          aria-label={isPlaying ? "Mute Background Music" : "Unmute Background Music"}
        >
        </button>
      )}

      <section className='welcome-screen pad-20'>
        <motion.div
          className="intro-container" 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            variants={itemVariants}
            className={`namesGEmain ${lang === 'ru' ? 'ru' : ''}`}
          >
            {data?.title}
          </motion.h1>

          <motion.h3 variants={itemVariants}>
            {data?.date}
          </motion.h3>

          <motion.div variants={itemVariants}>
            <button
              className={showInvitation ? 'start-btn hide' : 'start-btn show'}
              onClick={() => handleStart()}
            >
              {lang === 'en' ? 'Start' : 'Начать'}
            </button>
          </motion.div>
        </motion.div>
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
          lang={lang}
        />
      </section>
    </div>
  );
};

export default GuestPage;