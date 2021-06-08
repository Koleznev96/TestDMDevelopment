import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import {RedactionContext} from "../context/redactionContext";


export const Menu = () => {
    const menu = useContext(RedactionContext);
    const classes = useStyles();

    return (
        <Grid container className={classes.header} justify="center">
            <Grid container className={classes.menuIcon} justify="center">

            </Grid>
            <Grid container className={classes.menu} justify="center">
                <Button className={classes.menuButton} onClick={() => {menu.changeFalseRedaction()}}>Просмотр</Button>
                <Button className={classes.menuButton} onClick={() => {menu.changeTrueRedaction()}}>Редактирование</Button>
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme) => ({
    header: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
    },
    menuIcon: {
        width: '20%',
        height: 60,
        flexDirection: 'row',
    },
    menu: {
        width: '80%',
        height: 60,
        flexDirection: 'row',
    },
    menuButton: {
        width: '50%',
        height: '100%',
    },
}));
