import React from "react";
import { Route,Routes } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import CalendarPage from "./Pages/CalenderPage";
import EventDetailsPage from "./Pages/EventDetailsPage";
import RegisterPage from "./Pages/RegisterPage";

function App() {
    return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/events/:id" element={<EventDetailsPage />} />
      <Route path="/register/:eventId" element={<RegisterPage />} />
    </Routes>
  ) 
}

export default App;
