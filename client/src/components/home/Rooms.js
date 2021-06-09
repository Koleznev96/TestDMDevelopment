import React, {useCallback, useState, useEffect, useContext} from 'react';
import {NavLink} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
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

    function routerId(id) {
        return "/hotel/" + id;
    }

    const room = (item, index) => (
        <ListItem>
            <NavLink
                to={routerId(item._id)}
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
                        for (let k = 0; k < roomConveniences.length; k++) {
                            if (roomConveniences[k].roomId === item._id){
                                status = list_sort.listConveniences[i] === roomConveniences[k].convenienceId;
                            }
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

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff',
        width: '100%',
    },
    textItem: {
        marginTop: 15,
        color: '#000',
        fontSize: 18,
    },
    listItem: {
        padding: 5,
        marginLeft: 20,
        width: 600,
        height: 170,
        backgroundColor: '#F2F0F0',
        borderRadius: 20,
        paddingLeft: 30,
        paddingRight: 30,
    },
    list: {
        marginTop: 10,
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
    hr: {
        width: '100%',
        height: 1,
        backgroundColor: '#2366CA',
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
