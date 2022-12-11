import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { Audio } from './Components/Audio';
import './main.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <Audio />
    <App />
  </>
);
