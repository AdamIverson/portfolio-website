import { Box, Container, Typography, useTheme } from '@mui/material';
import React from 'react';
import PhotoGallery from '../components/photography/PhotoGallery';

const PhotographyPage: React.FC = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                bgcolor: 'background.default',
                color: 'text.primary',
                minHeight: '100vh',
                pb: 4,
                margin: 0,
                padding: 0,
                position: 'absolute', // This helps eliminate gaps
                top: '64px', // Adjust based on your header height
                left: 0,
                right: 0,
                width: '100%'
            }}
        >
            <Container maxWidth="xl">
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        pt: 4,
                        pb: 2,
                        fontWeight: 500,
                        color: 'text.primary'  // Uses theme text color
                    }}
                >
                    Photography
                </Typography>
                <PhotoGallery albumName="italy" />
            </Container>
        </Box>
    );
};

export default PhotographyPage;