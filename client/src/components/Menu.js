import React, {useContext} from 'react';
import { useStyles } from './stylesMenu';
import {useHistory} from "react-router-dom";
import {
    Button,
    Grid,
    Box
} from '@material-ui/core';
import {connect} from "react-redux";

// import store from "../store";
import {ACTIONS} from "../store/actionTypes";

export const Menu = (statusRedaction, changeTrueRedaction, changeFalseRedaction) => {
    // const menu = useContext(RedactionContext);
    console.log("statusRedaction-", statusRedaction)
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
                    className={statusRedaction ? classes.menuButton : classes.menuButtonActive}
                    onClick={() => changeFalseRedaction()}
                >
                    <Grid
                        className={statusRedaction ? classes.textButton : classes.textButtonActive}
                    >
                        Просмотр
                    </Grid>
                </Button >
                <Button
                    maxWidth="sm"
                    className={statusRedaction ? classes.menuButtonActive : classes.menuButton}
                    onClick={() => changeTrueRedaction()}
                >
                    <Grid
                        className={statusRedaction ? classes.textButtonActive : classes.textButton}
                    >
                        Редактирование
                    </Grid>
                </Button >
            </Grid>
        </Grid>
    );
}

export default Menu;