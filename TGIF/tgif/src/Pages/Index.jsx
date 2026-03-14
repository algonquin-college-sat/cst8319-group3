// @ts-ignore
import React from 'react';
import Header from '../Component/Header';
import HeroSection from '../Component/HeroSection';
import UpcomingEvents from '../Component/UpcomingEvents';
import EventCalendar from '../Component/EventCalender';
import KeynoteSpeakers from '../Component/KeynoteSpeaker';
import Footer from '../Component/Footer';

export default function Index() {
  return (
    <div>
      <Header />
      <HeroSection />
      <UpcomingEvents />
      <EventCalendar />
      <KeynoteSpeakers />
      <Footer />
    </div>
  );
}