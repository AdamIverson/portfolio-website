import { Box, CircularProgress, Modal } from '@mui/material';
import { CloudinaryContext, Image, Transformation } from 'cloudinary-react';
import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { Photo } from '../../types';
import './masonry-styles.css';

interface PhotoGalleryProps {
  albumName?: string;
  photos?: Photo[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ albumName, photos: initialPhotos }) => {
  const [open, setOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(-1);
  const [photos, setPhotos] = useState<Photo[]>(initialPhotos || []);
  const cloudName = "aiphoto";
  const [displayedPhotos, setDisplayedPhotos] = useState<Photo[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const PHOTOS_PER_PAGE = 20;

  console.log('trigger that build');

  // Load more photos when scrolling near bottom
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000) {
        loadMorePhotos();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [photos, page]);

  const loadMorePhotos = () => {
    if (loading || !photos) return;

    const startIndex = (page - 1) * PHOTOS_PER_PAGE;
    const endIndex = page * PHOTOS_PER_PAGE;
    const newPhotos = photos.slice(startIndex, endIndex);

    if (newPhotos.length > 0) {
      setDisplayedPhotos(prev => [...prev, ...newPhotos]);
      setPage(prev => prev + 1);
    }
  };

  const handleOpen = (photo: Photo) => {
    const index = photos?.findIndex(p => p.id === photo.id) ?? -1;
    setSelectedPhotoIndex(index);
    setSelectedPhoto(photo);
    setOpen(true);
    preloadAdjacentImages(index);
  };


  const preloadAdjacentImages = (currentIndex: number) => {
    if (!photos) return;

    [-1, 1].forEach(offset => {
      const adjacentIndex = currentIndex + offset;
      if (adjacentIndex >= 0 && adjacentIndex < photos.length) {
        const img = new window.Image();
        img.src = `https://res.cloudinary.com/${cloudName}/image/upload/q_auto/${photos[adjacentIndex].id}`;
      }
    });
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!open || !photos) return;

      if (e.key === 'ArrowLeft' && selectedPhotoIndex > 0) {
        const newIndex = selectedPhotoIndex - 1;
        setSelectedPhotoIndex(newIndex);
        setSelectedPhoto(photos[newIndex]); // Use full photos array
        preloadAdjacentImages(newIndex);
      } else if (e.key === 'ArrowRight' && selectedPhotoIndex < photos.length - 1) {
        const newIndex = selectedPhotoIndex + 1;
        setSelectedPhotoIndex(newIndex);
        setSelectedPhoto(photos[newIndex]); // Use full photos array
        preloadAdjacentImages(newIndex);
      } else if (e.key === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [open, selectedPhotoIndex, photos]);

  // Reset when album changes
  useEffect(() => {
    if (photos && photos.length > 0) {
      const initialPhotos = photos.slice(0, PHOTOS_PER_PAGE);
      setDisplayedPhotos(initialPhotos);
      setPage(2);
    }
  }, [photos]);

  useEffect(() => {
    // If no initial photos are provided, fetch them from Cloudinary
    if (!initialPhotos && albumName) {
      console.log('albumName', albumName);
      fetchPhotosFromCloudinary(albumName);
    }
  }, [albumName, initialPhotos]);

  // In your PhotoGallery.tsx file
  const fetchPhotosFromCloudinary = async (albumPath: string) => {
    try {
      console.log('Fetching photos for album:', albumPath);

      // Change this line to use Netlify Functions
      const response = await fetch(`/.netlify/functions/photos?album=${albumPath}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server response:', errorText);
        throw new Error(`Server error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      // ... rest of your code
    } catch (error) {
      console.error('Error fetching photos:', error);
      setPhotos([]);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <CloudinaryContext cloudName={cloudName}>
      <Masonry
        breakpointCols={{
          default: 4,
          1100: 3,
          700: 2,
          500: 1
        }}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
        {displayedPhotos?.map((photo, index) => (
          <div key={`${photo.id}-${index}`}>
            <Box
              sx={{
                overflow: 'hidden',
                borderRadius: 1,
                mb: 1,
                '&:hover': {
                  boxShadow: 6,
                  '& img': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.3s ease-in-out'
                  }
                }
              }}
            >
              <Image
                publicId={photo.id}
                alt={photo.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease-in-out'
                }}
                onClick={() => handleOpen(photo)}
              >
                <Transformation quality="auto" fetchFormat="auto" />
              </Image>
            </Box>
          </div>
        ))}
      </Masonry>

      {/* Loading indicator */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxWidth: '90%',
          maxHeight: '90vh',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
          borderRadius: 2,
          outline: 'none',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {selectedPhoto && (
            <>
              <Box sx={{
                maxHeight: 'calc(90vh - 80px)',
                maxWidth: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}>
                <Image
                  publicId={selectedPhoto.id}
                  alt={selectedPhoto.title}
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                >
                  <Transformation quality="auto" fetchFormat="auto" />
                </Image>
              </Box>
              {/* <Typography variant="h6" mt={1}>{selectedPhoto.title}</Typography> */}
            </>
          )}
        </Box>
      </Modal>
    </CloudinaryContext>
  );
};

export default PhotoGallery;