import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import LandingPage from "./Pages/LandingPage";
import CalendarPage from "./Pages/CalenderPage";
import EventDetailsPage from "./Pages/EventDetailsPage";
import RegistrationPage from "./Pages/RegistrationPage";
import VolunteerRegistration from "./Pages/VolunteerRegistration";
import ArtistRegistration from "./Pages/ArtistRegistration";
import AboutPage from "./Pages/AboutPage";
import GalleryPage from "./Pages/GalleryPage";
import EventsPage from "./Pages/EventsPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailsPage />} />
        <Route path="/register/:id" element={<RegistrationPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/volunteer" element={<VolunteerRegistration />} />
        <Route path="/artist" element={<ArtistRegistration />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
