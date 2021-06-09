import React, {useCallback, useState, useEffect, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button,
    Grid,
    List,
    ListItem,
    Checkbox,
    ListItemIcon,
} from '@material-ui/core';

import {useHttp} from "../../hooks/http.hook";
import {SortContext} from "../../context/sortContext";


export const Conveniences = () => {
    const list_sort = useContext(SortContext);
    const classes = useStyles();
    const {loading, request, error, clearError} = useHttp();
    const [listConveniences, setListConveniences] = useState([]);
    const [checked, setChecked] = React.useState([]);

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

    const handleToggle = (item) => {
        const currentIndex = checked.indexOf(item._id);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(item._id);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleSort = () => {
        list_sort.changeListConveniences(checked);
    };

    const DisplayConveniences = () => (
        <List className={classes.list} dense component="div" role="list">
            {listConveniences.map((item, index) => {
                return (
                    <ListItem
                        key={index}
                        role="listitem"
                        button onClick={() => {handleToggle(item)}}
                        className={classes.listItem}
                    >
                        <ListItemIcon className={classes.iconItem}>
                            <Checkbox
                                checked={checked.indexOf(item._id) !== -1}
                                tabIndex={-1}
                                disableRipple
                            />
                        </ListItemIcon>
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
                    Поиск по удобствам:
                </Grid>

                <List className={classes.list} dense component="div" role="list">
                    <DisplayConveniences />
                </List>
                <Grid container className={classes.linerButton}>
                    <Button
                        className={classes.menuButton}
                        onClick={() => {handleSort()}}
                    >
                        <Grid
                            className={classes.textButton}
                        >
                            Применить
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
        height: '100%',
    },
    row: {
        marginLeft: 100,
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
        width: 150,
        height: 30,
        backgroundColor: '#fff'
    }
}));
