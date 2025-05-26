import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const HeroSection: React.FC = () => {
    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                backgroundImage: 'url(/path/to/your/background-image.jpg)',
                backgroundSize: 'cover',
                color: 'white',
                textAlign: 'center',
                padding: 2,
            }}
        >
            <Typography variant="h2" component="h1" gutterBottom>
                Welcome to My Portfolio
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                Explore my work in photography, theater, and development.
            </Typography>
            <Button variant="contained" color="primary" href="#about">
                Learn More
            </Button>
        </Box>
    );
};

export default HeroSection;