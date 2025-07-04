// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* fallback={<div>Loading...</div>} */}
    <Suspense >
      <App />
    </Suspense>
  </React.StrictMode>
)
