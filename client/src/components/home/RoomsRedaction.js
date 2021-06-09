import React, {useCallback, useState, useEffect, useContext} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff',
        width: '100%',
    },
    textItem: {
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
    roomItemNew: {
        marginLeft: 35,
        width: 600,
        height: 170,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textPlus: {
        color: '#2366CA',
        fontSize: 60,
        fontWeight: '700',
    },
    buttonDelete: {
        width: 100,
        height: 170,
        backgroundColor: '#fff',
    },
    textDelete: {
        color: 'red',
        fontSize: 10,
    },
}));
