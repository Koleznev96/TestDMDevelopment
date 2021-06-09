import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Grid,
} from '@material-ui/core';

import {RedactionContext} from "../context/redactionContext";


export const Menu = () => {
    const menu = useContext(RedactionContext);
    const classes = useStyles();

    return (
        <Grid container className={classes.header}>
            <Grid container className={classes.menuIcon} md={3}>

            </Grid>
            <Grid container className={classes.menu} md={9}>
                <Button
                    className={menu.isRedaction ? classes.menuButton : classes.menuButtonActive}
                    onClick={() => {menu.changeFalseRedaction()}}
                >
                    <Grid
                        className={menu.isRedaction ? classes.textButton : classes.textButtonActive}
                    >
                        Просмотр
                    </Grid>
                </Button >
                <Button
                    maxWidth="sm"
                    className={menu.isRedaction ? classes.menuButtonActive : classes.menuButton}
                    onClick={() => {menu.changeTrueRedaction()}}
                >
                    <Grid
                        className={menu.isRedaction ? classes.textButtonActive : classes.textButton}
                    >
                        Редактирование
                    </Grid>
                </Button >
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme) => ({
    header: {
        padding: 0,
        margin: 0,
        width: '100%',
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#2366CA',
    },
    menuIcon: {
        height: 60,
        flexDirection: 'row',
    },
    menu: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButton: {
        width: '50%',
        height: 56,
    },
    menuButtonActive: {
        width: '50%',
        height: 56,
        backgroundColor: '#fff',
    },
    focusVisibleMenuButton: {
        backgroundColor: '#000',
    },
    textButton: {
        color: '#fff',
    },
    textButtonActive: {
        color: '#2366CA',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));
