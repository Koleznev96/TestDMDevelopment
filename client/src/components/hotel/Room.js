import React, {useCallback, useState, useEffect} from 'react';
import {useParams} from "react-router";
import { makeStyles } from '@material-ui/core/styles';
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
                    <ListItem className={classes.listItem}>
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

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff',
        width: '100%',
        paddingTop: 10,
    },
    mainRoom: {
        paddingLeft: 30,
    },
    mainConvenience: {
        paddingLeft: 55,
        paddingRight: 10,
    },
    cartConvenience: {
        width: '100%',
        padding: 10,
        backgroundColor: '#F2F0F0',
        borderRadius: 20,
        paddingBottom: 30,
    },
    cartConvenienceList: {
        width: '100%',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: '#2366CA',
        borderRadius: 5,
    },
    cartRoom: {
        width: '100%',
        padding: 5,
        backgroundColor: '#F2F0F0',
        borderRadius: 20,
        paddingLeft: 30,
        paddingRight: 30,
    },
    textCartConvenience: {
        marginTop: 20,
        fontSize: 20,
        width: '100%',
        color: '#000',
        fontWeight: '700',
    },
    textCartRoomType: {
        marginTop: 20,
        fontSize: 28,
        width: '100%',
        color: '#000',
        fontWeight: '700',
    },
    cartRoomData: {
        marginTop: 20,
        width: '100%',
    },
    hr: {
        marginTop: 10,
        width: '100%',
        height: 1,
        backgroundColor: '#2366CA',
    },
    textItem: {
        color: '#2366CA',
        fontSize: 14,
    },
    listItem: {
        marginTop: 5,
        height: 20,
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    list: {
        paddingLeft: 20,
        direction: "row",
        width: '100%',
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
    boxData: {
        marginTop: 10,
        width: '100%',
    },
    boxDataColom: {
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
    textDataItem: {
        marginBottom: 10,
        color: '#2366CA',
        fontSize: 14,
    },
}));
