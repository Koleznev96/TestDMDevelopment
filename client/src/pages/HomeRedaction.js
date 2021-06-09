import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    conveniences: {
        minHeight: '100vh',
        maxHeight: '100%',
    }
}));
