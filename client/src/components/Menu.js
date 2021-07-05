import React, {useContext} from 'react';
import { useStyles } from './stylesMenu';
import {useHistory} from "react-router-dom";
import {
    Button,
    Grid,
    Box
} from '@material-ui/core';

import {RedactionContext} from "../context/redactionContext";
import {useSelector, useDispatch} from "react-redux";

export const Menu = () => {
    const dispatch = useDispatch();
    const status = useSelector(state => state.status);

    // const menu = useContext(RedactionContext);
    const history = useHistory();
    const classes = useStyles();

    return (
        <Grid container className={classes.header}>
            <Grid container className={classes.menuIcon} md={3}>
                <Button
                    className={classes.menuButton}
                    onClick={() => {history.push('/');}}
                >
                    <Box
                        className={classes.textButton}
                    >
                        Главная
                    </Box>
                </Button >
            </Grid>
            <Grid container className={classes.menu} md={9}>
                <Button
                    className={status ? classes.menuButton : classes.menuButtonActive}
                    onClick={() => dispatch({type: 'decrement'})}
                >
                    <Grid
                        className={status ? classes.textButton : classes.textButtonActive}
                    >
                        Просмотр
                    </Grid>
                </Button >
                <Button
                    maxWidth="sm"
                    className={status ? classes.menuButtonActive : classes.menuButton}
                    onClick={() => dispatch({type: 'increment'})}
                >
                    <Grid
                        className={status ? classes.textButtonActive : classes.textButton}
                    >
                        Редактирование
                    </Grid>
                </Button >
            </Grid>
        </Grid>
    );
}