import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import {Conveniences} from "../components/home/Conveniences";
import {Rooms} from "../components/home/Rooms";
import {useSort} from "../hooks/sort.hook";
import {SortContext} from "../context/sortContext";

export const Home = () => {
    const {listConveniences, changeListConveniences} = useSort();
    const classes = useStyles();

    return (
        <SortContext.Provider value={{
            listConveniences, changeListConveniences
        }}>
            <Grid container className={classes.root}>
                <Grid container className={classes.conveniences} md={3}>
                    <Conveniences />
                </Grid>

                <Grid container className={classes.rooms} md={9}>
                    <Rooms />
                </Grid>

            </Grid>
        </SortContext.Provider>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    conveniences: {
        minHeight: '100vh',
        maxHeight: '100%',
    },
    rooms: {

    }
}));
