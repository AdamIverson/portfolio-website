import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

const theaterProjects = [
    {
        title: 'Hamlet',
        image: 'path/to/hamlet.jpg',
        description: 'A modern adaptation of Shakespeare\'s classic play.'
    },
    {
        title: 'The Wizard of Oz',
        image: 'path/to/wizard-of-oz.jpg',
        description: 'A vibrant musical journey down the yellow brick road.'
    },
    {
        title: 'Death of a Salesman',
        image: 'path/to/death-of-a-salesman.jpg',
        description: 'A poignant exploration of the American Dream.'
    }
];

const TheaterProjects: React.FC = () => {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Theater Projects
            </Typography>
            <Grid container spacing={2}>
                {theaterProjects.map((project, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={project.image}
                                alt={project.title}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {project.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {project.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default TheaterProjects;