import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Box, Breadcrumbs, Button, Container, IconButton, Link, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import PhotoGallery from '../components/photography/PhotoGallery';

interface GalleryParams extends Record<string, string | undefined> {
  album?: string;
  subalbum?: string;
}

const GalleryPage: React.FC = () => {
  const { album, subalbum } = useParams<GalleryParams>();
  const navigate = useNavigate();
  const [currentAlbum, setCurrentAlbum] = useState<string>(album || 'travel');
  const [currentSubalbum, setCurrentSubalbum] = useState<string | null>(subalbum || null);

  // Main categories
  const albums = ['travel', 'minnesota', 'portraits', 'events', 'landscapes'];

  // Subcategories mapping
  const subalbums: Record<string, string[]> = {
    travel: ['italy', 'puerto rico', 'kenya'],
    minnesota: ['MAYDAY2017', 'north shore'],
    portraits: ['studio', 'outdoor', 'family'],
    events: ['weddings', 'concerts', 'festivals'],
    landscapes: ['mountains', 'oceans', 'forests']
  };

  useEffect(() => {
    if (album) {
      setCurrentAlbum(album);
    }
    if (subalbum) {
      setCurrentSubalbum(subalbum);
    } else {
      setCurrentSubalbum(null);
    }
  }, [album, subalbum]);

  const handleAlbumChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentAlbum(newValue);
    setCurrentSubalbum(null);
    navigate(`/gallery/${newValue}`);
  };

  const handleSubalbumSelect = (subalbum: string) => {
    setCurrentSubalbum(subalbum);
    navigate(`/gallery/${currentAlbum}/${subalbum}`);
  };

  const getFolderPath = () => {
    // Just use the subalbum name directly if it exists
    if (currentSubalbum) {
      return currentSubalbum;
    }
    return currentAlbum;
  };

  // Generate a dynamic title
  const pageTitle = subalbum
    ? `${subalbum.charAt(0).toUpperCase() + subalbum.slice(1)} | a.iverson photos`
    : `${currentAlbum.charAt(0).toUpperCase() + currentAlbum.slice(1)} | a.iverson photos`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={`View Adam Iverson's ${subalbum || album || 'photography'} collection`} />
      </Helmet>
      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          minHeight: 'calc(100vh - 64px)',
          pt: 4,
          pb: 6
        }}
      >
        <Container maxWidth="xl">

          {/* Main category tabs */}
          <Tabs
            value={currentAlbum}
            onChange={handleAlbumChange}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mb: 3 }}
          >
            {albums.map(a => (
              <Tab
                key={a}
                label={a.charAt(0).toUpperCase() + a.slice(1)}
                value={a}
              />
            ))}
          </Tabs>

          {/* Navigation area with consistent positioning */}
          <Box
            sx={{
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            {/* Back button - only visible in subalbum view */}
            {currentSubalbum && (
              <IconButton
                onClick={() => {
                  setCurrentSubalbum(null);
                  navigate(`/gallery/${currentAlbum}`);
                }}
                aria-label="back"
                sx={{
                  color: 'text.secondary',
                  p: 0.5,
                  '&:hover': { color: 'text.primary' }
                }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>
            )}

            {/* Always show breadcrumbs in the same position */}
            <Breadcrumbs>
              <Link
                color="inherit"
                onClick={() => navigate('/gallery')}
                sx={{ cursor: 'pointer' }}
              >
                Gallery
              </Link>

              {currentSubalbum ? (
                <Link
                  color="inherit"
                  onClick={() => {
                    setCurrentSubalbum(null);
                    navigate(`/gallery/${currentAlbum}`);
                  }}
                  sx={{
                    cursor: 'pointer',
                    textTransform: 'capitalize'
                  }}
                >
                  {currentAlbum}
                </Link>
              ) : (
                <Typography color="text.primary" sx={{ textTransform: 'capitalize' }}>
                  {currentAlbum}
                </Typography>
              )}

              {currentSubalbum && (
                <Typography color="text.primary" sx={{ textTransform: 'capitalize' }}>
                  {currentSubalbum}
                </Typography>
              )}
            </Breadcrumbs>
          </Box>

          {/* Subcategory buttons - only shown when no subalbum is selected */}
          {currentAlbum && !currentSubalbum && subalbums[currentAlbum] && (
            <Box sx={{ mb: 4 }}>
              {subalbums[currentAlbum].map(sub => (
                <Button
                  key={sub}
                  variant="outlined"
                  sx={{ mr: 2, mb: 2, textTransform: 'capitalize' }}
                  onClick={() => handleSubalbumSelect(sub)}
                >
                  {sub}
                </Button>
              ))}
            </Box>
          )}

          {/* Photo gallery */}
          {currentAlbum && (
            <PhotoGallery albumName={getFolderPath()} />
          )}
        </Container>
      </Box>
    </>
  );
};

export default GalleryPage;