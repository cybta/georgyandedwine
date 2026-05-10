import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion'; // Importing as a type
import mainData from '../../components/invitationData';
import '../css/invitationDataUI.css';
import { ChurchIcon, RestaurantIcon } from '../../../assets/icons';

const InvitationDataUI = ({ lang = 'en' }: { lang: 'en' | 'ru' }) => {
  const data = mainData(lang);

  if (!data) return null;

  const formatExternalUrl = (url: string) => {
    if (!url) return '#';
    return url.startsWith('http') ? url : `https://${url}`;
  };

  // Macro Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Elements pop in one after another
      },
    },
  };


  // 2. Add the : Variants type here
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
        ease: "easeOut" // Now TS knows this is a valid Easing literal
      } 
    }
  };

  return (
    <motion.div
      className="invitation-container"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} // Triggers once when 10% is visible
    >
      {/* Quote Section */}
      <motion.section variants={fadeInUpVariants} className="section quote-section">
        <p className="quote-text">"{data.quote.text}"</p>
        <p className="quote-ref">{data.quote.ref}</p>
      </motion.section>

      <motion.div variants={fadeInUpVariants} className="divider">✦</motion.div>

      {/* Intro & Families */}
      <motion.section variants={fadeInUpVariants} className="section intro-section">
        <p className="intro-text">{data.intro}</p>
        <div className="families">
          <div>{data.georgyFamily}</div>
          <div>{data.edwineFamily}</div>
        </div>
        <p className="invitation-text">{data.invitationText}</p>
      </motion.section>

      {/* Main Event */}
      <motion.section variants={fadeInUpVariants} className="section main-details">
        <h1 className="main-names">{data.names}</h1>
        <h2 className="main-date">{data.date}</h2>
      </motion.section>

      <motion.div variants={fadeInUpVariants} className="divider">✦</motion.div>

      {/* Celebration Details */}
      <motion.section variants={fadeInUpVariants} className="section celebration-section">
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

      <motion.div variants={fadeInUpVariants} className="divider">✦</motion.div>

      {/* Gift Registry */}
      <motion.section variants={fadeInUpVariants} className="section gift-section">
        <h3 className="section-title">{data.gift.title}</h3>
        <p className="wishlist-msg">{data.gift.wishlistMsg}</p>
        <a href="#" className="wishlist-btn" target="_blank" rel="noreferrer">
          {data.gift.wishlistDetails}
        </a>
      </motion.section>
    </motion.div>
  );
};

export default InvitationDataUI;