import React, {useCallback, useState, useEffect} from 'react';
import { useStyles } from './stylesConveniences';
import {
    Button,
    Grid,
    List,
    ListItem,
    TextField,
} from '@material-ui/core';

import {useHttp} from "../../hooks/http.hook";


export const ConveniencesRedaction = () => {
    const classes = useStyles();
    const {request, error, clearError} = useHttp();
    const [listConveniences, setListConveniences] = useState([]);
    const [commodity, setCommodity] = useState("");
    const [errorNameCommodity, setErrorNameCommodity] = useState(false);

    const getConveniences = useCallback(async () => {
        try {
            const data = await request('/api/conveniences/commodities', 'GET', null, {});
            await setListConveniences(data.conveniences);
        } catch (e) {}
    }, [request]);

    useEffect(() => {
        getConveniences();
    }, [getConveniences]);

    useEffect( () => {
        clearError();
    }, [error, clearError]);

    const handleDeleteConvenience = async (item) => {
        try {
            const data = await request('/api/conveniences/delete-commodity', 'POST', {
                convenience: item
            }, {});
            await setListConveniences(data.conveniences);
        } catch (e) {}
    };

    const handleCreatConvenience = async () => {
        if (commodity === "") {
            setErrorNameCommodity(true);
            return
        }
        setErrorNameCommodity(false);
        try {
            const data = await request('/api/conveniences/create-commodity', 'POST', {
                convenience: {commodity}
            }, {});
            await setListConveniences(data.conveniences);
        } catch (e) {}
    };

    const DisplayConveniences = () => (
        <List className={classes.list} dense component="div" role="list">
            {listConveniences.map((item, index) => {
                return (
                    <ListItem
                        key={index}
                        role="listitem"
                        className={classes.listItem}
                    >
                        <Button
                            onClick={() => {handleDeleteConvenience(item)}}
                            className={classes.buttonDelete}
                        >
                            <Grid className={classes.textDelete}>
                                Удалить
                            </Grid>
                        </Button>

                        <Grid className={classes.textItem}>
                            {item.commodity}
                        </Grid>
                    </ListItem>
                );
            })}
            <ListItem />
        </List>
    );


    return (
        <Grid container className={classes.root}>
            <Grid container className={classes.rowRed}>
                <Grid container className={classes.textHeader}>
                    Редактирование удобств:
                </Grid>

                <List className={classes.list} dense component="div" role="list">
                    <DisplayConveniences />
                </List>

                <Grid container className={classes.linerButton}>
                    <TextField
                        placeholder="Название"
                        id="commodity"
                        name="commodity"
                        className={classes.inputText}
                        onChange={(event) => {setCommodity(event.target.value)}}
                    />


                    <Button
                        className={classes.menuButton}
                        onClick={() => {handleCreatConvenience()}}
                    >

                    <Grid
                        className={classes.textButton}
                    >
                        Создать
                    </Grid>

                    </Button >

                    { errorNameCommodity &&
                    <Grid className={classes.textError}>
                        Название удобства не может быть пустым.
                    </Grid>
                    }
                </Grid>
            </Grid>
        </Grid>
    );
}
