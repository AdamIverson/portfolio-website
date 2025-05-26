import EmailIcon from '@mui/icons-material/Email';
import {
  Alert,
  Box,
  Button,
  Container,
  Grid, Paper, Snackbar,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';


const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would be connected to your backend service or email provider
    console.log('Form data submitted:', formData);

    // Show success message (in a real app, this would happen after API response)
    setSnackbar({
      open: true,
      message: 'Thank you! Your message has been sent.',
      severity: 'success'
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: 'calc(100vh - 64px)',
        py: 6
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h2" component="h1" gutterBottom>
          Contact Me
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 4, bgcolor: 'background.paper' }}>
              <Typography variant="h5" gutterBottom>
                Send a Message
              </Typography>

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  margin="normal"
                />

                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  margin="normal"
                />

                <TextField
                  fullWidth
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  margin="normal"
                />

                <TextField
                  fullWidth
                  label="Your Message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  multiline
                  rows={4}
                  margin="normal"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    mt: 3,
                    px: 4,
                    bgcolor: 'text.primary',
                    color: 'background.default',
                    '&:hover': {
                      bgcolor: 'text.secondary',
                    }
                  }}
                >
                  Send Message
                </Button>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 4, mb: 4, bgcolor: 'background.paper' }}>
              <Typography variant="h5" gutterBottom>
                Contact Information
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <EmailIcon sx={{ mr: 2 }} />
                <Typography>
                  <a href="mailto:contact@adamiverson.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                    contact@adamiverson.com
                  </a>
                </Typography>
              </Box>
            </Paper>

            <Paper elevation={3} sx={{ p: 4, bgcolor: 'background.paper' }}>
              <Typography variant="h5" gutterBottom>
                Photography Services
              </Typography>
              <Typography paragraph>
                I'm available for portrait sessions, events, commercial projects, and travel photography. Please inquire for rates and availability.
              </Typography>
              <Typography>
                Based in San Francisco, CA — available worldwide for commissioned work.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactPage;