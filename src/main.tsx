import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './components/App';
import { GlobalStyle } from './styleTheme/GlobalStyle';
import { AppState } from './context/AppState';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppState>
      <GlobalStyle />
      <App />
    </AppState>
  </React.StrictMode>
);
