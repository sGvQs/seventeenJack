import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App/App';
import Audio from './Components/Audio/Audio';
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Audio />
    <App />
  </>
);
