import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { App } from './components/App';
import { GlobalStyle } from './styleTheme/GlobalStyle';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename="/cinelounge">
      <GlobalStyle />
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
