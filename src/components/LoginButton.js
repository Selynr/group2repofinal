import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect, error } = useAuth0();

  const handleLogin = async () => {
    try {
      console.log("Attempting login..."); // Log before login
      await loginWithRedirect();
    } catch (e) {
      console.error("Login error:", e);
      alert("Login failed. Please check your Auth0 settings.");
    }
  };

  console.log("Auth0 Login error:", error); // Log Auth0 error

  return <button onClick={handleLogin}>Log In</button>;
};

export default LoginButton;
