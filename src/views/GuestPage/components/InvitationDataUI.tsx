import mainData from '../../components/invitationData'; // Assuming this is your logic function
import '../css/invitationDataUI.css';

const InvitationDataUI = ({ lang = 'en' }: { lang: 'en' | 'ru' }) => {
  const data = mainData(lang);

  if (!data) return null;

  return (
    <div className="invitation-container">
      {/* Quote Section */}
      <section className="section quote-section">
        <p className="quote-text">"{data.quote.text}"</p>
        <p className="quote-ref">{data.quote.ref}</p>
      </section>

      <div className="divider">✦</div>

      {/* Intro & Families */}
      <section className="section intro-section">
        <p className="intro-text">{data.intro}</p>
        <div className="families">
          <p>{data.georgyFamily}</p>
          <p className="and-symbol">&</p>
          <p>{data.edwineFamily}</p>
        </div>
        <p className="invitation-text">{data.invitationText}</p>
      </section>

      {/* Main Event */}
      <section className="section main-details">
        <h1 className="main-names">{data.names}</h1>
        <h2 className="main-date">{data.date}</h2>
      </section>

      {/* Celebration Details */}
      <section className="section celebration-section">
        <h3 className="section-title">{data.celebration.title}</h3>
        <div className="event-grid">
          <div className="event-card">
            <h4>Ceremony</h4>
            <p>{data.celebration.churchData.time}</p>
            <p>{data.celebration.churchData.location}</p>
            <a href={data.celebration.churchData.map} className="map-link">View Map</a>
          </div>
          <div className="event-card">
            <h4>Reception</h4>
            <p>{data.celebration.restaurantData.time}</p>
            <p>{data.celebration.restaurantData.location}</p>
            <a href={data.celebration.restaurantData.map} className="map-link">View Map</a>
          </div>
        </div>
      </section>

      {/* Gift Registry */}
      <section className="section gift-section">
        <h3 className="section-title">{data.gift.title}</h3>
        <p className="gratitude">{data.gift.gratitude}</p>
        <p className="wishlist-msg">{data.gift.wishlistMsg}</p>
        <a href="#" className="wishlist-btn">{data.gift.wishlistDetails}</a>
      </section>
    </div>
  );
};

export default InvitationDataUI;