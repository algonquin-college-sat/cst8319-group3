// Vite requires env vars to start with VITE_

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const AUTH_REDIRECT_URI =
  import.meta.env.VITE_AUTH_REDIRECT_URI || 'http://localhost:5173/auth/callback';


export const loadRuntimeConfig = () => {
  return {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL,
    authRedirectUri: import.meta.env.VITE_AUTH_REDIRECT_URI
  };
};