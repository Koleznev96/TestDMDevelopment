import React, {useCallback, useState, useEffect, useContext} from 'react';
import { useStyles } from './stylesConveniences';
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
    const {request, error, clearError} = useHttp();
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
                        <Grid className={classes.textItemView}>
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
                        className={classes.menuButtonView}
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
