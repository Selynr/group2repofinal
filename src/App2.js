import React from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

const domain = "dev-ssangasx1yx1hgv4.us.auth0.com";
const clientId = "dOnLmOn1HMhw3kIa2iw3f05Tj1wNofv2";

function TestAuth() {
  const { loginWithRedirect, isAuthenticated, isLoading, error, user } = useAuth0();

  console.log("isLoading:", isLoading);
  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);
  console.log("error:", error);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <h2>Welcome, {user ? user.name : "User"}!</h2>
          <button onClick={() => alert("Logged in!")}>You are logged in</button>
        </div>
      ) : (
        <button onClick={() => loginWithRedirect()}>Log In</button>
      )}
    </div>
  );
}

function App() {
  return <TestAuth />;
}

export default function RootApp() {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  );
}
