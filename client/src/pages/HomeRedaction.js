import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import {ConveniencesRedaction} from "../components/ConveniencesRedaction";


export const HomeRedaction = () => {
    const classes = useStyles();

    return (
        <Grid container className="">
            <h1>HotelRedaction</h1>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));
