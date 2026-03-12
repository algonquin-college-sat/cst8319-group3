import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RegisterPage() {
  const { eventId } = useParams();

  const [event, setEvent] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const [message, setMessage] = useState("");

  // 🔹 Load event details
  useEffect(() => {
    axios.get(`http://localhost:8080/api/events/${eventId}`)
      .then(res => setEvent(res.data))
      .catch(err => console.error(err));
  }, [eventId]);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      eventId: Number(eventId)
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/api/registrations",
        payload
      );

      setMessage("🎉 Registration successful!");
      console.log("Server response:", res.data);

      // clear form
      setForm({
        firstName: "",
        lastName: "",
        email: ""
      });

    } catch (error) {
      console.error(error);

      if (error.response && error.response.status === 409) {
        setMessage("⚠️ You are already registered for this event.");
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
