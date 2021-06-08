import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import {Conveniences} from "../components/Conveniences";


export const Home = () => {
    const classes = useStyles();

    return (
        <Grid container className="main__content-inner">
            {/*{ <Conveniences /> }*/}
            <h1>Home</h1>
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
