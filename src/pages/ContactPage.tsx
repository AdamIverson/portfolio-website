import emailjs from '@emailjs/browser';
import EmailIcon from '@mui/icons-material/Email';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Snackbar,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log('Sending email with data:', formData);

      const result = await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS Success:', result);

      setSnackbar({
        open: true,
        message: 'Thank you! Your message has been sent successfully.',
        severity: 'success'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      console.error('EmailJS Error:', error);
      setSnackbar({
        open: true,
        message: 'Sorry, there was an error sending your message. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Helmet>
        <title>Contact | adam iverson photography</title>
        <meta name="description" content="Get in touch with Adam Iverson for photography services and inquiries" />
      </Helmet>

      <Box
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
          minHeight: 'calc(100vh - 64px)',
          py: 6
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 300,
              letterSpacing: 2,
              mb: 4
            }}
          >
            Contact
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Paper elevation={3} sx={{ p: 4, bgcolor: 'background.paper' }}>
                <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
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
                    disabled={loading}
                    sx={{ mb: 2 }}
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
                    disabled={loading}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    margin="normal"
                    disabled={loading}
                    sx={{ mb: 2 }}
                  />

                  <TextField
                    fullWidth
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    multiline
                    rows={6}
                    margin="normal"
                    disabled={loading}
                    sx={{ mb: 3 }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={loading}
                    sx={{
                      py: 1.5,
                      fontSize: '1.1rem',
                      textTransform: 'none',
                      bgcolor: 'primary.main',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                      '&:disabled': {
                        bgcolor: 'action.disabled',
                      }
                    }}
                  >
                    {loading ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircularProgress size={20} color="inherit" />
                        Sending...
                      </Box>
                    ) : (
                      'Send Message'
                    )}
                  </Button>
                </form>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 4, mb: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h5" gutterBottom>
                  Get in Touch
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography>
                    <Box
                      component="a"
                      href="mailto:contact@adamiverson.com"
                      sx={{
                        color: 'primary.main',
                        textDecoration: 'none',
                        '&:hover': {
                          textDecoration: 'underline'
                        }
                      }}
                    >
                      contact@adamiverson.com
                    </Box>
                  </Typography>
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  I typically respond within 24 hours.
                </Typography>
              </Paper>

              <Paper elevation={3} sx={{ p: 4, bgcolor: 'background.paper' }}>
                <Typography variant="h5" gutterBottom>
                  Photography Services
                </Typography>
                <Typography paragraph color="text.secondary">
                  Available for portrait sessions, events, commercial projects, and travel photography.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Based in Minneapolis, MN — available for travel worldwide.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleClose}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
            elevation={6}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default ContactPage;