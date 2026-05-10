import mainData from '../../components/invitationData';
import '../css/invitationDataUI.css';

import { ChurchIcon, RestaurantIcon } from '../../../assets/icons';

const InvitationDataUI = ({ lang = 'en' }: { lang: 'en' | 'ru' }) => {
  const data = mainData(lang);

  if (!data) return null;

  // Helper function to ensure external links actually work
  const formatExternalUrl = (url: string) => {
    if (!url) return '#';
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <div className='invitation-container'>
      {/* Quote Section */}
      <section className='section quote-section'>
        <p className='quote-text'>"{data.quote.text}"</p>
        <p className='quote-ref'>{data.quote.ref}</p>
      </section>

      <div className='divider'>✦</div>

      {/* Intro & Families */}
      <section className='section intro-section'>
        <p className='intro-text'>{data.intro}</p>
        <div className='families'>
          <div>{data.georgyFamily}</div>
          <div>{data.edwineFamily}</div>
        </div>
        <p className='invitation-text'>{data.invitationText}</p>
      </section>

      {/* Main Event */}
      <section className='section main-details'>
        <h1 className='main-names'>{data.names}</h1>
        <h2 className='main-date'>{data.date}</h2>
      </section>
      
      <div className='divider'>✦</div>

      {/* Celebration Details */}
      <section className='section celebration-section'>
        <div className='event-grid'>
          {/* Church Card */}
          <div className='event-card'>
            <h4>{data.celebration.churchData.title}</h4>
            <ChurchIcon size={100} fill="#000" />
            <p>{data.celebration.churchData.time}</p>
            <p><b>{data.celebration.churchData.location}</b></p>
            <a 
              href={formatExternalUrl(data.celebration.churchData.map)} 
              className='map-link'
              target='_blank' 
              rel='noopener noreferrer'
            >
              View Map
            </a>
          </div>

          {/* Restaurant Card */}
          <div className='event-card'>
            <h4>{data.celebration.restaurantData.title}</h4>
            <RestaurantIcon size={100} fill="#000" />
            <p>{data.celebration.restaurantData.time}</p>
            <p><b>{data.celebration.restaurantData.location}</b></p>
            <a 
              href={formatExternalUrl(data.celebration.restaurantData.map)} 
              className='map-link' 
              target='_blank' 
              rel='noopener noreferrer'
            >
              View Map
            </a>
          </div>
        </div>
      </section>
      <div className='divider'>✦</div>

      {/* Gift Registry */}
      <section className='section gift-section'>
        <h3 className='section-title'>{data.gift.title}</h3>
        <p className='gratitude'>{data.gift.gratitude}</p>
        <p className='wishlist-msg'>{data.gift.wishlistMsg}</p>
        <a href='#' className='wishlist-btn' target='_blank' rel='noreferrer'>
          {data.gift.wishlistDetails}
        </a>
        <p className='wishlist-msg'>{data.gift.reservationMsg}</p>
      </section>
    </div>
  );
};

export default InvitationDataUI;
