import { useNavigate } from "react-router-dom";

const EventCard = ({ event, language }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div  onClick={handleClick} className="event-card">
      <h2>{language === "EN" ? event.titleEn : event.titleFr}</h2>

      <p>
        <strong>Date:</strong> {event.eventDate}
      </p>

      <p>
        <strong>Location:</strong> {event.location}
      </p>

      <p>
        <strong>Speaker:</strong> {event.keynoteSpeaker}
      </p>
    </div>
  );
};

export default EventCard;
