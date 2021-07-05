import React, {useCallback, useState, useEffect, useContext} from 'react';
import {NavLink} from "react-router-dom";
import { useStyles } from './stylesRooms';
import {
    Grid,
    List,
    ListItem,
    Box
} from '@material-ui/core';

import {useHttp} from "../../hooks/http.hook";
import {SortContext} from "../../context/sortContext";


export const Rooms = () => {
    const list_sort = useContext(SortContext);
    const classes = useStyles();
    const {request, error, clearError} = useHttp();
    const [listRooms, setListRooms] = useState(null);
    const [roomConveniences, setRoomConveniences] = useState(null);

    const getRooms = useCallback(async () => {
        try {
            const data = await request('/api/hotel/rooms', 'GET', null, {});
            await setListRooms(data.rooms);
            await setRoomConveniences(data.roomConveniences);
        } catch (e) {}
    }, [request]);

    useEffect(() => {
        getRooms();
    }, [getRooms]);

    useEffect( () => {
        clearError();
    }, [error, clearError]);

    const room = (item, index) => (
        <ListItem>
            <NavLink
                to={"/hotel/" + item._id}
                key={index.toString()}
                className={classes.listItem}
                borderColor="error.main"
            >
                <Box className={classes.textItem}>
                    {item.type}
                </Box>
                <Box className={classes.boxData}>
                    <Box className={classes.hr}/>
                </Box>
                <Box className={classes.boxDataColom}>
                    <Box className={classes.textDataItem}>
                        Плата за сутки: {item.costPerDay} руб.
                    </Box>
                    <Box className={classes.textDataItem}>
                        Количетсво спальных мест: {item.numberBerths}
                    </Box>
                    <Box className={classes.textDataItem}>
                        Площадь: {item.area}
                    </Box>
                </Box>
            </NavLink>
        </ListItem>
    )

    const DisplayRooms = () => (
        <List className={classes.list} container justify="center" >
            {listRooms.map((item, index) => {
                if (list_sort.listConveniences.length !== 0) {
                    let status = false;
                    for (let i = 0; i < list_sort.listConveniences.length; i++) {
                        const currentIndex = roomConveniences.find(x => (x.roomId === item._id) &&
                            (x.convenienceId === list_sort.listConveniences[i]));
                        if (currentIndex) {
                            status = true;
                        }
                    }

                    if (status)
                        return room(item, index);
                    else
                        return null;
                }
                return room(item, index);
            })}
        </List>
    );


    return (
        <Grid container className={classes.root}>
            {listRooms && roomConveniences && <DisplayRooms />}
        </Grid>
    );
}