// Assume this is your main application file (e.g., index.js or App.js)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';
import { refreshToken } from './actions/authActions';

const renderApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

const initializeApp = async () => {
  // Check if a refresh token is available in local storage
  const refresh_token = localStorage.getItem('refresh_token');

  if (refresh_token) {
    try {
      // Dispatch the refreshToken action to refresh the access token
      await store.dispatch(refreshToken());
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Handle the error as needed (e.g., redirect to login)
    }
  }

  // Render the application after handling token refresh
  renderApp();
};

// Initialize the application
initializeApp();

// ... other code
