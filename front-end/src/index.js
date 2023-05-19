import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import RecipesAppProvider from './context/RecipesAppProvider';

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <RecipesAppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </RecipesAppProvider>,
  );
