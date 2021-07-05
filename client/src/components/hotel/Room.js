import React, {useCallback, useState, useEffect} from 'react';
import {useParams} from "react-router";
import { useStyles } from './styles';
import {
    Grid,
    List,
    ListItem,
    Box
} from '@material-ui/core';

import {useHttp} from "../../hooks/http.hook";


export const Room = () => {
    const classes = useStyles();
    const {request, error, clearError} = useHttp();
    const RoomId = useParams().id;
    const [room, setRoom] = useState(null);
    const [roomConveniences, setRoomConveniences] = useState(null);

    const getRoom = useCallback(async () => {
        try {
            const data = await request(`/api/hotel/room/${RoomId}`, 'GET', null, {});
            await setRoom(data.room);
            await setRoomConveniences(data.roomConveniences);
        } catch (e) {}
    }, [request]);

    useEffect(() => {
        getRoom();
    }, [getRoom]);

    useEffect( () => {
        clearError();
    }, [error, clearError]);

    const DisplayRoomConveniences = () => (
        <List className={classes.list}>
            {roomConveniences.map((item, index) => {
                return (
                    <ListItem className={classes.listItemWiev}>
                        <Box className={classes.textItem}>
                            {item.commodity}
                        </Box>
                    </ListItem>
                );
            })}
        </List>
    );

    return (
        <Grid container className={classes.root}>
            <Grid container className={classes.mainRoom} md={7}>
                <Grid container className={classes.cartRoom}>
                    <Grid container className={classes.textCartRoomType}>
                        {room && room.type}
                        <Grid className={classes.hr}/>
                    </Grid>
                    <Box container className={classes.cartRoomData}>
                        <Box className={classes.textDataItem}>
                            Плата за сутки: {room && room.costPerDay} руб.
                        </Box>
                        <Box className={classes.textDataItem}>
                            Количетсво спальных мест: {room && room.numberBerths}
                        </Box>
                        <Box className={classes.textDataItem}>
                            Площадь: {room && room.area}
                        </Box>
                        <Box className={classes.textDataItem}>
                            Количество комнат: {room && room.numberRooms}
                        </Box>
                        <Box className={classes.textDataItem}>
                            Адрес: {room && room.address}
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Grid container className={classes.mainConvenience} md={5}>
                <Grid container className={classes.cartConvenience}>
                    <Grid container className={classes.textCartConvenience}>
                        Удобства:
                        <Grid className={classes.hr}/>
                    </Grid>
                    <Grid container className={classes.cartConvenienceList}>
                        {roomConveniences && <DisplayRoomConveniences />}
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}