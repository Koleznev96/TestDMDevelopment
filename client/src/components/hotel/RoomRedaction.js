import React, {useCallback, useState, useEffect} from 'react';
import {useParams} from "react-router";
import { makeStyles } from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import {
    Grid,
    List,
    ListItem,
    Box,
    TextField, Button
} from '@material-ui/core';

import {useHttp} from "../../hooks/http.hook";


export const RoomRedaction = () => {
    const history = useHistory();
    const classes = useStyles();
    const {request, error, clearError} = useHttp();
    const RoomId = useParams().id;
    const [room, setRoom] = useState(null);
    const [roomConveniences, setRoomConveniences] = useState([]);
    const [conveniences, setConveniences] = useState(null);

    const changeRoomHandler = event => {
        setRoom({ ...room, [event.target.name]: event.target.value });
    }

    const getRoom = useCallback(async () => {
        try {
            let data;
            if (RoomId !== "new") {
                data = await request(`/api/hotel/room/${RoomId}`, 'GET', null, {});
                await setRoom(data.room);
                await setRoomConveniences(data.roomConveniences);
            }
            else {
                data = await request('/api/conveniences/commodities', 'GET', null, {});
            }
            await setConveniences(data.conveniences);
        } catch (e) {}
    }, [request]);

    useEffect(() => {
         getRoom();
    }, [getRoom, RoomId]);

    useEffect( () => {
        clearError();
    }, [error, clearError]);

    const createRoomHandler = async () => {
        try {
            const data = await request(RoomId !== "new" ? `/api/hotel/update-room` : `/api/hotel/create-room`, 'POST', {
                room,
                conveniences: roomConveniences
            }, {});
            await setRoom(data.room);
            await setRoomConveniences(data.conveniences);
            if (RoomId === "new")
                history.push(`/hotel/${room._id}`);


        } catch (e) {}
    }

    const handleDeleteConvenience = async (item) => {
        const currentIndex = roomConveniences.indexOf(item);
        const newRoomConveniences = [...roomConveniences];

        if (currentIndex !== -1) {
            newRoomConveniences.splice(currentIndex, 1);
        }

        setRoomConveniences(newRoomConveniences);
    };

    const handleAddConvenience = async (item) => {
        const currentIndex = roomConveniences.find(x => x._id === item._id);
        const newRoomConveniences = [...roomConveniences];

        if (!currentIndex) {
            newRoomConveniences.push(item);
        }

        setRoomConveniences(newRoomConveniences);
    };

    const DisplayRoomConveniences = () => (
        <List className={classes.list}>
            {roomConveniences.map((item, index) => {
                return (
                    <ListItem className={classes.rItem}>
                        <Button
                            onClick={() => {handleDeleteConvenience(item)}}
                            className={classes.buttonDelete}
                        >
                            <Grid className={classes.textDelete}>
                                Удалить
                            </Grid>
                        </Button>
                        <Grid className={classes.listItem}>
                            <Box className={classes.textItem}>
                                {item.commodity}
                            </Box>
                        </Grid>
                    </ListItem>
                );
            })}
        </List>
    );

    const DisplayConveniences = () => (
        <List className={classes.list}>
            {conveniences.map((item, index) => {
                return (
                    <ListItem className={classes.rItem}>
                        <Button
                            onClick={() => {handleAddConvenience(item)}}
                            className={classes.buttonDelete}
                        >
                            <Grid className={classes.textAdd}>
                                Добавить
                            </Grid>
                        </Button>
                        <Grid className={classes.listItem}>
                            <Box className={classes.textItem}>
                                {item.commodity}
                            </Box>
                        </Grid>
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
                        <Grid container className={classes.textInput}>
                            Тип:
                        </Grid>
                        <TextField
                            value={room ? room.type : null}
                            margin="normal"
                            required
                            fullWidth
                            id="type"
                            name="type"
                            onChange={changeRoomHandler}
                        />
                        <Grid className={classes.hr}/>
                    </Grid>
                    <Box container className={classes.cartRoomData}>
                        <Box className={classes.textDataItem}>
                            <Grid container className={classes.textInput}>
                                Плата за сутки:
                            </Grid>
                            <TextField
                                value={room ? room.costPerDay : null}
                                fullWidth
                                id="costPerDay"
                                name="costPerDay"
                                autoFocus
                                onChange={changeRoomHandler}
                            />
                        </Box>
                        <Box className={classes.textDataItem}>
                            <Grid container className={classes.textInput}>
                                Количетсво спальных мест:
                            </Grid>
                            <TextField
                                value={room ? room.numberBerths : null}
                                fullWidth
                                id="numberBerths"
                                name="numberBerths"
                                autoFocus
                                onChange={changeRoomHandler}
                            />
                        </Box>
                        <Box className={classes.textDataItem}>
                            <Grid container className={classes.textInput}>
                                Площадь:
                            </Grid>
                            <TextField
                                value={room ? room.area : null}
                                fullWidth
                                id="area"
                                name="area"
                                autoFocus
                                onChange={changeRoomHandler}
                            />
                        </Box>
                        <Box className={classes.textDataItem}>
                            <Grid container className={classes.textInput}>
                                Количество комнат:
                            </Grid>
                            <TextField
                                value={room ? room.numberRooms : null}
                                fullWidth
                                id="numberRooms"
                                name="numberRooms"
                                autoFocus
                                onChange={changeRoomHandler}
                            />
                        </Box>
                        <Box className={classes.textDataItem}>
                            <Grid container className={classes.textInput}>
                                Адрес:
                            </Grid>
                            <TextField
                                value={room ? room.address : null}
                                fullWidth
                                id="address"
                                name="address"
                                autoFocus
                                onChange={changeRoomHandler}
                            />
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
                    <Grid container className={classes.textCartConvenience}>
                        Выберите подходящие:
                        <Grid className={classes.hr}/>
                    </Grid>
                    <Grid container className={classes.cartConvenienceList}>
                        {conveniences && <DisplayConveniences />}
                    </Grid>
                </Grid>
            </Grid>
            <Grid container className={classes.mainButton} md={12}>
                <Button
                    className={classes.menuButton}
                    onClick={createRoomHandler}
                >
                    <Box
                        className={classes.textButton}
                    >
                        Сохранить
                    </Box>
                </Button >
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
    textInput: {
        fontSize: 12,
        color: '#747474',
    },
    mainRoom: {
        paddingLeft: 30,
    },
    mainButton: {
        marginTop: 30,
        width: '100%',
        alignItems: 'center',
    },
    menuButton: {
        height: 80,
        width: '100%',
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
        marginLeft: 5,
        color: '#2366CA',
        fontSize: 14,
    },
    rItem: {
    },
    listItem: {
        marginLeft: 5,
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
    buttonDelete: {
        width: 20,
        height: 20,
        backgroundColor: '#fff'
    },
    textDelete: {
        color: 'red',
        fontSize: 10,
    },
    textAdd: {
        color: '#2366CA',
        fontSize: 10,
    }
}));
