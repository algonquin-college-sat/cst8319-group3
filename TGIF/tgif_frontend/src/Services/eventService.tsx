const API_BASE = "http://localhost:8080/api";

export const getUpcomingEvents = async () => {
  const response = await fetch(`${API_BASE}/events/upcoming`);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return await response.json();
};

export const getAllEvents = async () => {
  const response = await fetch(`${API_BASE}/events`);
  if (!response.ok) {
    throw new Error("Failed to fetch events");
  }
  return await response.json();
};

export const getEventById = async (id) => {
  const response = await fetch(`${API_BASE}/events/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch event");
  }
  return await response.json();
};