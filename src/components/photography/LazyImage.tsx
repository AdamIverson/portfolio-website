// Create a new file: src/components/photography/LazyImage.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';
import { Image, Transformation } from 'cloudinary-react';

interface LazyImageProps {
  publicId: string;
  alt: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

const LazyImage: React.FC<LazyImageProps> = ({ publicId, alt, onClick, style }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100px' } // Start loading 100px before the image enters viewport
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box ref={imgRef} sx={{ position: 'relative' }}>
      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height={200}
          sx={{
            borderRadius: 1,
            position: isInView ? 'absolute' : 'static',
            top: 0,
            left: 0,
            zIndex: 1
          }}
        />
      )}
      
      {isInView && (
        <img
          src={`https://res.cloudinary.com/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto,w_auto,dpr_auto,c_scale/${publicId}`}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onClick={onClick}
          style={{
            ...style,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out',
            position: 'relative',
            zIndex: 2,
            width: '100%',
            height: 'auto',
            cursor: 'pointer'
          }}
        />
      )}
    </Box>
  );
};

export default LazyImage;