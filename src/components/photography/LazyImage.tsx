import { Box, Skeleton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, width, height }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Box sx={{ width, height, position: 'relative' }}>
      {!loaded && (
        <Skeleton
          variant="rectangular"
          width={width}
          height={height}
          sx={{ position: 'absolute' }}
        />
      )}
      <img
        ref={imgRef}
        src={inView ? src : undefined}
        alt={alt}
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }}
      />
    </Box>
  );
};

export default LazyImage;