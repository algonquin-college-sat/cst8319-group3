import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Event {
  id: number;
  titleEn: string;
  titleFr: string;
  eventDate: string;
  location: string;
  keynoteSpeaker?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

function RegisterPage() {
  const { eventId } = useParams<{ eventId: string }>();

  const [event, setEvent] = useState<Event | null>(null);
  const [form, setForm] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: ""
  });
  const [message, setMessage] = useState<string>("");

  // 🔹 Load event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get<Event>(
          `http://localhost:8080/api/events/${eventId}`
        );
        setEvent(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    if (eventId) fetchEvent();
  }, [eventId]);

  // 🔹 Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Submit registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventId) return;

    const payload = { ...form, eventId: Number(eventId) };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/registrations",
        payload
      );

      setMessage("🎉 Registration successful!");
      console.log("Server response:", res.data);

      setForm({ firstName: "", lastName: "", email: "" });
    } catch (error) {
  console.error(error);

  if (axios.isAxiosError(error)) {  // ✅ Type guard for axios errors
    if (error.response?.status === 409) {
      setMessage("⚠️ You are already registered for this event.");
    } else {
      setMessage("❌ Registration failed. Please try again.");
    }
  } else {
    setMessage("❌ Registration failed. Please try again.");
  }
}
  };

  if (!event) return <p>Loading event...</p>;

  return (
    <div className="container">
      <h2>Register for {event.titleEn}</h2>
      <p><b>Date:</b> {event.eventDate}</p>
      <p><b>Location:</b> {event.location}</p>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          required
          value={form.firstName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          required
          value={form.lastName}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={handleChange}
        />

        <button type="submit">Confirm Registration</button>
      </form>
    </div>
  );
}

export default RegisterPage;