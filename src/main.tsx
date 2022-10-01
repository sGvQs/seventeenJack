import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Audio from './Audio'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Audio/>
    <App />
  </React.StrictMode>
)
