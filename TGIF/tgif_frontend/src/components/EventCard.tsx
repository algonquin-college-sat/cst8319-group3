import { useNavigate } from "react-router-dom";

interface Event {
  id: string;
  titleEn: string;
  titleFr: string;
  eventDate: string;
  location: string;
  keynoteSpeaker: string;
}

interface EventCardProps {
  event: Event;
  language: "en" | "fr";
}

const EventCard = ({ event, language }: EventCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div onClick={handleClick} className="event-card cursor-pointer">
      <h2>{language === "en" ? event.titleEn : event.titleFr}</h2>

      <p><strong>Date:</strong> {event.eventDate}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Speaker:</strong> {event.keynoteSpeaker}</p>
    </div>
  );
};

export default EventCard;