import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion'; 
import mainData from '../../components/invitationData';
import '../css/invitationDataUI.css';
import { ChurchIcon, RestaurantIcon } from '../../../assets/icons';

const filterID : string[] = [
  "84102", "19283", "55021", "92710", "44829", 
  "20391", "67123", "88321", "37261", "50482", 
  "77218", "83921", "30429", "75104", "14293", 
  "68201", "00000"
];

interface InvitationDataUIProps {
  lang: 'en' | 'ru';
  id?: string; 
}

const InvitationDataUI = ({ lang = 'en', id }: InvitationDataUIProps) => {
  const data = mainData(lang);
  const isSpecialGuest = id ? filterID.includes(id) : false;

  if (!data) return null;

  const formatExternalUrl = (url: string) => {
    if (!url) return '#';
    return url.startsWith('http') ? url : `https://${url}`;
  };

  // 1. Unified viewport setting for reuse across sections
  const viewConfig = { once: true, amount: 0.4 };

  // 2. Kept your clean variant setup 
  const fadeInUpVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50 
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

  // Optional: A small sequential stagger specifically for the internal celebration cards
  const cardsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    // Parent wrapper is now a standard div or clean motion tracking container
    <div className="invitation-container">
      
      {/* Quote Section */}
      <motion.section 
        variants={fadeInUpVariants} 
        initial="hidden"
        whileInView="visible"
        viewport={viewConfig}
        className="section quote-section"
      >
        <p className="quote-text">"{data.quote.text}"</p>
        <p className="quote-ref">{data.quote.ref}</p>
      </motion.section>

      <motion.div 
        variants={fadeInUpVariants} 
        initial="hidden"
        whileInView="visible"
        viewport={viewConfig}
        className="divider"
      >
        ✦
      </motion.div>

      {/* Intro & Families */}
      <motion.section 
        variants={fadeInUpVariants} 
        initial="hidden"
        whileInView="visible"
        viewport={viewConfig}
        className="section intro-section"
      >
        <p className="intro-text">{data.intro}</p>
        <div className={`families ${lang === 'ru' ? 'ru' : ''}`}>
          <div>{data.georgyFamily}</div>
          <div>{data.edwineFamily}</div>
        </div>
        <p className="invitation-text">{data.invitationText}</p>
      </motion.section>

      {/* Main Event */}
      <motion.section 
        variants={fadeInUpVariants} 
        initial="hidden"
        whileInView="visible"
        viewport={viewConfig}
        className="section main-details"
      >
        <h1 className={`main-names ${lang === 'ru' ? 'ru' : ''}`}>{data.names}</h1>
        <h2 className="main-date">{data.date}</h2>
      </motion.section>

      <motion.div 
        variants={fadeInUpVariants} 
        initial="hidden"
        whileInView="visible"
        viewport={viewConfig}
        className="divider"
      >
        ✦
      </motion.div>

      {/* Celebration Details — Animates container & staggers the 2 cards together */}
      <motion.section 
        variants={cardsContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewConfig}
        className="section celebration-section"
      >
        <div className="event-grid">
          {/* Church Card */}
          <motion.div variants={fadeInUpVariants} className="event-card">
            <h4>{data.celebration.churchData.title}</h4>
            <ChurchIcon size={100} fill="#000" />
            <p>{data.celebration.churchData.time}</p>
            <p><b>{data.celebration.churchData.location}</b></p>
            <a
              href={formatExternalUrl(data.celebration.churchData.map)}
              className="map-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Map
            </a>
          </motion.div>

          {/* Restaurant Card */}
          <motion.div variants={fadeInUpVariants} className="event-card">
            <h4>{data.celebration.restaurantData.title}</h4>
            <RestaurantIcon size={100} fill="#000" />
            <p>{data.celebration.restaurantData.time}</p>
            <p><b>{data.celebration.restaurantData.location}</b></p>
            <a
              href={formatExternalUrl(data.celebration.restaurantData.map)}
              className="map-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Map
            </a>
          </motion.div>
        </div>
      </motion.section>

      <motion.div 
        variants={fadeInUpVariants} 
        initial="hidden"
        whileInView="visible"
        viewport={viewConfig}
        className="divider"
      >
        ✦
      </motion.div>

      {/* Gift Registry */}
      {!isSpecialGuest && (
        <motion.section 
          variants={fadeInUpVariants} 
          initial="hidden"
          whileInView="visible"
          viewport={viewConfig}
          className="section gift-section"
        >
          <h3 className="section-title">{data.gift.title}</h3>
          <p className="wishlist-msg">{data.gift.wishlistMsg}</p>
          <a href="#" className="wishlist-btn" target="_blank" rel="noreferrer">
            {data.gift.wishlistDetails}
          </a>
        </motion.section>
      )}
      
    </div>
  );
};

export default InvitationDataUI;