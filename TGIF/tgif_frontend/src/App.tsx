import { Toaster } from './components/ui/sonner';
import LandingPage from './Pages/LandingPage';
import CalendarPage from "./Pages/CalenderPage";
import EventDetailsPage from "./Pages/EventDetailsPage";
import RegisterPage from "./Pages/RegisterPage";

import './App.css'
import { TooltipProvider } from './components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './Context/LanguageProvider';
import  Index from './Pages/Index';
import About from './Pages/About';
import Registration from './Pages/Registration';
import History from './Pages/History';
import Sponsors from './Pages/Sponsor';
import Volunteer from './Pages/Volunteer';
import AuthCallback from './Pages/AuthCallback';
import AuthError from './Pages/AuthError';
import NotFound from './Pages/NotFound';

// MODULE_IMPORTS_START
// MODULE_IMPORTS_END

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* MODULE_PROVIDERS_START */}
    {/* MODULE_PROVIDERS_END */}
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/landingpage" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/history" element={<History />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/auth/error" element={<AuthError />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/events/:id" element={<EventDetailsPage />} />
            <Route path="/register/:eventId" element={<RegisterPage />} />
            {/* MODULE_ROUTES_START */}
            {/* MODULE_ROUTES_END */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
    {/* MODULE_PROVIDERS_CLOSE */}
  </QueryClientProvider>
);

export default App;


