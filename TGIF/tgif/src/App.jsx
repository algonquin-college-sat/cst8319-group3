import React from "react";
import { Route,Routes } from "react-router-dom";
import Index from "./Pages/Index";
import CalendarPage from "./Pages/CalenderPage";
import EventDetailsPage from "./Pages/EventDetailsPage";
import RegisterPage from "./Pages/RegisterPage";
import RegistrationPage from "./Pages/RegistrationPage";
import VolunteerRegistration from "./Pages/VolunteerRegistration";
import ArtistRegistration from "./Pages/ArtistRegistration";
import AboutPage from "./Pages/AboutPage";
import GalleryPage from "./Pages/GalleryPage";
import {LanguageProvider} from "./Context/LanguageContext";

function App() {
    return (
        <LanguageProvider>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/events/:id" element={<EventDetailsPage />} />
                <Route path="/register/:eventId" element={<RegisterPage />} />
                <Route path="/register/:id" element={<RegistrationPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/volunteer" element={<VolunteerRegistration />} />
                <Route path="/artist" element={<ArtistRegistration />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
            </Routes>
        </LanguageProvider>
  ) 
}

export default App;
