import React from 'react';
import { Box, Container, Typography, Grid, Avatar, Paper } from '@mui/material';

const AboutPage: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: 'calc(100vh - 64px)', // Account for header
        py: 6
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Avatar
              src="https://res.cloudinary.com/aiphoto/image/upload/v1/your-profile-photo"
              alt="Adam Iverson"
              sx={{
                width: '100%',
                height: 'auto',
                maxWidth: 350,
                aspectRatio: '1',
                mx: 'auto',
                boxShadow: 3
              }}
              variant="rounded"
            />
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Typography variant="h2" component="h1" gutterBottom>
              About Me
            </Typography>
            
            <Typography variant="h5" paragraph sx={{ fontWeight: 300, mb: 3 }}>
              Hi, I'm Adam Iverson — a photographer with 15 years of experience capturing moments across the globe.
            </Typography>
            
            <Typography paragraph>
              My journey with photography began in 2008, when I first picked up a DSLR and found myself captivated by the ability to freeze moments in time. Since then, my camera has become an extension of how I see the world.
            </Typography>
            
            <Typography paragraph>
              I've had the privilege of documenting life across diverse landscapes, from the ancient streets of Italy to intimate portraits that tell personal stories. My work focuses on finding authentic moments and presenting them with honesty and artistic vision.
            </Typography>
            
            <Typography paragraph>
              When I'm not behind the lens, I enjoy exploring new destinations, experimenting with different visual techniques, and sharing my knowledge with aspiring photographers.
            </Typography>
            
            <Paper elevation={2} sx={{ p: 3, mt: 4, bgcolor: 'background.paper' }}>
              <Typography variant="h6" gutterBottom>
                Equipment
              </Typography>
              <Typography paragraph>
                I primarily shoot with Sony mirrorless systems, specifically the α7R IV, paired with G Master series lenses. For certain projects, I also utilize medium format digital systems to achieve specific aesthetic qualities.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutPage;