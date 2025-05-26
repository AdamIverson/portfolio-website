import { AppBar, Toolbar, Typography } from '@mui/material';
import React from 'react';
import Navigation from './Navigation';

const Header: React.FC = () => {
    return (
        <AppBar position="sticky" sx={{ bgcolor: 'background.paper' }}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Adam Iverson Photography
                </Typography>
                <Navigation />
            </Toolbar>
        </AppBar>
    );
};

export default Header;