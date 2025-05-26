import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useMemo, useState } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import GalleryPage from './pages/GalleryPage';
import HomePage from './pages/HomePage';
const App: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          // Optional: customize colors for dark mode
          ...(mode === 'dark' && {
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
          }),
        },
      }),
    [mode],
  );

  return (
    <HelmetProvider>

      <ThemeProvider theme={theme}>
        <Helmet>
          <title>adam iverson photography</title>
          <meta name="description" content="Photography portfolio showcasing 15 years of work" />
          <link rel="icon" href="/logo-grey.png" />
        </Helmet>

        <CssBaseline />
        <Router>
          <Header />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/gallery/:album/:subalbum" component={GalleryPage} />
            <Route path="/gallery/:album?" component={GalleryPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/contact" component={ContactPage} />
          </Switch>
          <Footer />
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;