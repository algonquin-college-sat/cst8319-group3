import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // or Next.js useRouter
import { API_BASE_URL, AUTH_REDIRECT_URI } from '../lib/config';

export default function AuthCallback() {
  const navigate = useNavigate(); // redirect after login

  useEffect(() => {
    async function login() {
      try {
        // Example: make a POST request to your auth endpoint
        const response = await fetch(`${API_BASE_URL}/auth/login/callback`, {
          method: 'POST',
          credentials: 'include', // if using cookies
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            redirect_uri: AUTH_REDIRECT_URI,
            // Include any code or token from the query string if needed
          }),
        });

        if (!response.ok) {
          throw new Error('Authentication failed');
        }

        // Redirect to dashboard or home page
        navigate('/dashboard');
      } catch (err) {
        console.error(err);
        navigate('/login?error=auth_failed');
      }
    }

    login();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Processing authentication...</p>
      </div>
    </div>
  );
}