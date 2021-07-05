import React from 'react';
import { useStyles } from './styles';
import { Grid } from '@material-ui/core';

import {ConveniencesRedaction} from "../components/home/ConveniencesRedaction";
import {RoomsRedaction} from "../components/home/RoomsRedaction";


export const HomeRedaction = () => {
    const classes = useStyles();

    return (
        <Grid container className={classes.root}>
            <Grid container className={classes.conveniences} md={3}>
                <ConveniencesRedaction />
            </Grid>

            <Grid container className={classes.main} md={9}>
                <RoomsRedaction />
            </Grid>
        </Grid>
    );
};