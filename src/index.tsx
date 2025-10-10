import React from 'react';

import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import publicPath from '../publicPath';

import "@fontsource/roboto/500.css";

import App from './App/App';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement!);

root.render(
    <BrowserRouter basename={publicPath}>
      <App />
    </BrowserRouter>
);
