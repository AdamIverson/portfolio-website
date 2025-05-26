import React from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';

const projects = [
    {
        title: 'Project One',
        description: 'Description of project one.',
    },
    {
        title: 'Project Two',
        description: 'Description of project two.',
    },
    {
        title: 'Project Three',
        description: 'Description of project three.',
    },
];

const DevelopmentProjects: React.FC = () => {
    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Development Projects
            </Typography>
            <Grid container spacing={2}>
                {projects.map((project, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5">{project.title}</Typography>
                                <Typography variant="body2">{project.description}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default DevelopmentProjects;