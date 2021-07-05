import React, {useCallback, useState, useEffect, useContext} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import { useStyles } from './stylesRooms';
import {
    Button,
    Grid,
    List,
    ListItem,
    Box
} from '@material-ui/core';

import {useHttp} from "../../hooks/http.hook";


export const RoomsRedaction = () => {
    const history = useHistory();
    const classes = useStyles();
    const {request, error, clearError} = useHttp();
    const [listRooms, setListRooms] = useState(null);

    const getRooms = useCallback(async () => {
        try {
            const data = await request('/api/hotel/rooms', 'GET', null, {});
            await setListRooms(data.rooms);
        } catch (e) {}
    }, [request]);

    useEffect(() => {
        getRooms();
    }, [getRooms]);

    useEffect( () => {
        clearError();
    }, [error, clearError]);

    const roomDelete = async (item) => {
        try {
            const data = await request('/api/hotel/delete-room', 'POST', {
                room: item
            }, {});
            await setListRooms(data.rooms);
        } catch (e) {}
    }

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
            <Button
                onClick={() => {roomDelete(item)}}
                className={classes.buttonDelete}
            >
                <Grid className={classes.textDelete}>
                    Удалить
                </Grid>
            </Button>
        </ListItem>
    )

    const DisplayRooms = () => (
        <List className={classes.list} container justify="center" >
            {listRooms.map((item, index) => {
                return room(item, index);
            })}
            <Button
                className={classes.roomItemNew}
                onClick={() => {history.push('/hotel/new');}}
            >
                <Box className={classes.textPlus}>
                    +
                </Box>
            </Button>
        </List>
    );


    return (
        <Grid container className={classes.root}>
            {listRooms && <DisplayRooms />}
        </Grid>
    );
}