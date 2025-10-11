import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import { AuthProvider } from '../contexts/AuthContext/AuthContext';
import { applicationTheme } from '../theme/applicationTheme';
import { MainPage } from '../pages/MainPage';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={applicationTheme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <MainPage />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
