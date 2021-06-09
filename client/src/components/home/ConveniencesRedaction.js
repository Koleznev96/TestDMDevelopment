import React, {useCallback, useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
    const [commodity, setCommodity] = useState(null);

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
            <Grid container className={classes.row}>
                <Grid container className={classes.textHeader}>
                    Редактирование удобств:
                </Grid>

                <List className={classes.list} dense component="div" role="list">
                    <DisplayConveniences />
                </List>

                <Grid container className={classes.linerButton}>
                    <TextField
                        placeholder="Название"
                        id="email"
                        name="email"
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
                </Grid>
            </Grid>
        </Grid>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#2366CA',
    },
    row: {
        marginLeft: 80,
        flexDirection: 'column',
    },
    itemConveniences: {
        height: 20,
        width: '80%',
        backgroundColor: '#000',
    },
    itemConveniencesActive: {
        height: 20,
        width: '80%',
        backgroundColor: '#fff',
    },
    textItem: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 12,
    },
    listItem: {
        width: '100%',
    },
    iconItem: {
        height: 24,
        width: 24,
    },
    textHeader: {
        marginLeft: 5,
        color: '#fff',
        fontSize: 14,
        width: '100%',
        fontWeight: '700',
    },
    textButton: {
        fontWeight: '300',
        color: '#2366CA',
        fontSize: 16,
    },
    linerButton: {
        width: '100%',
        justifyContent: 'center',
    },
    menuButton: {
        marginTop: 35,
        width: 150,
        height: 30,
        backgroundColor: '#fff'
    },
    buttonDelete: {
        width: 20,
        height: 20,
        backgroundColor: '#fff'
    },
    textDelete: {
        color: 'red',
        fontSize: 10,
    },
    inputText: {
        width: 150,
        height: 5,
        color: '#fff',
    },
}));
