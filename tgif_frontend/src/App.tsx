import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './Context/LanguageContext';
import Index from './Pages/Index';
import About from './Pages/About';
import Registration from './Pages/Registration';
import History from './Pages/History';
import Sponsors from './Pages/Sponsors';
import Volunteer from './Pages/Volunteer';
import Admin from './Pages/Admin';
import AuthCallback from './Pages/AuthCallback';
import AuthError from './Pages/AuthError';
import NotFound from './Pages/NotFound';
import Login from './Pages/Login';
import Artist from './Pages/Artist';
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
            <Route path="/about" element={<About />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/history" element={<History />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/volunteer" element={<Volunteer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/artist" element={<Artist />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route path="/auth/error" element={<AuthError />} />
            
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