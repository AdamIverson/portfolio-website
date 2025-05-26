import { Box, Card, CardContent, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
    return (
        <Box sx={{ bgcolor: 'background.default', color: 'text.primary' }}>
            {/* Hero section with your best photo */}
            <Box sx={{
                height: 'calc(100vh - 64px)',
                // backgroundImage: 'url(https://res.cloudinary.com/aiphoto/image/upload/c_scale,w_1920,q_auto/)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'flex-end'
            }}>
                <Container maxWidth="xl">
                    <Typography variant="h2" sx={{ mb: 2, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
                        adam iverson
                    </Typography>
                    <Typography variant="h4" sx={{ mb: 6, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
                        village idiot
                    </Typography>
                </Container>
            </Box>

            {/* Featured Collections */}
            <Box sx={{ py: 8 }}>
                <Container maxWidth="xl">
                    <Typography variant="h3" sx={{ mb: 4 }}>Featured Collections</Typography>
                    <Grid container spacing={3}>
                        {['italy', 'portraits', 'events', 'nature'].map(album => (
                            <Grid item xs={12} sm={6} md={3} key={album}>
                                <Card
                                    sx={{
                                        height: 300,
                                        backgroundImage: `url(https://res.cloudinary.com/aiphoto/image/upload/${album}/cover)`,
                                        backgroundSize: 'cover',
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        transition: '0.3s',
                                        '&:hover': { transform: 'scale(1.03)' }
                                    }}
                                    component={Link}
                                    to={`/gallery/${album}`}
                                >
                                    <CardContent sx={{ width: '100%', bgcolor: 'rgba(0,0,0,0.6)' }}>
                                        <Typography variant="h6" sx={{ color: 'white', textTransform: 'capitalize' }}>
                                            {album}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default HomePage;