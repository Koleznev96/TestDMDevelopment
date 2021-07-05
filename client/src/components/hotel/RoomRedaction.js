import React, {useCallback, useState, useEffect} from 'react';
import {useParams} from "react-router";
import { useStyles } from './styles';
import {useHistory} from "react-router-dom";
import { Form, Field } from 'react-final-form'
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

    function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }

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

    const onSubmit = async values => {
        let room = values

        try {
            const data = await request(RoomId !== "new" ? `/api/hotel/update-room` : `/api/hotel/create-room`, 'POST', {
                room,
                conveniences: roomConveniences
            }, {});
            await setRoom(data.room);
            await setRoomConveniences(data.conveniences);
            if (RoomId === "new")
                await history.push(`/hotel/${data.room._id}`);
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

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    // const onSubmit = async values => {
    //     await sleep(300)
    //     window.alert(JSON.stringify(values, 0, 2))
    // }

    return (
        <Grid >
            <Form
                initialValues={room ? room : null}
                onSubmit={onSubmit}
                validate={values => {
                    const errors = {}
                    if (!values.type) {
                        errors.type = 'Тип номера отеля не может быть пустым.'
                    }
                    if (values.costPerDay && !isNumber(values.costPerDay)) {
                        errors.costPerDay = 'Введите число.'
                    }
                    if (values.numberBerths && !isNumber(values.numberBerths)) {
                        errors.numberBerths = 'Введите число.'
                    }
                    if (values.area && !isNumber(values.area)) {
                        errors.area = 'Введите число.'
                    }
                    if (values.numberRooms && !isNumber(values.numberRooms)) {
                        errors.numberRooms = 'Введите число.'
                    }
                    return errors
                }}
                render={({ createRoomHandler, form, submitting, pristine, values }) => (
                    <form onSubmit={createRoomHandler} className={classes.root}>
                        <Grid container className={classes.mainRoom} md={7}>
                            <Grid container className={classes.cartRoom}>
                                <Box container className={classes.cartRoomData}>
                                    <Field name="type">
                                    {({ input, meta }) => (
                                        <Grid className={classes.inputCart}>
                                            <Grid container className={classes.textInput}>Тип</Grid>
                                            <TextField value={room ? room.type : null} {...input} type="text" className={classes.inputText} margin="normal"/>
                                            {meta.error && meta.touched && <span className={classes.textError}>{meta.error}</span>}
                                        </Grid>
                                    )}
                                    </Field>
                                    <Grid className={classes.hr}/>
                                    <Field name="costPerDay">
                                        {({ input, meta }) => (
                                            <Grid className={classes.inputCart}>
                                                <Grid container className={classes.textInput}>Плата за сутки:</Grid>
                                                <TextField {...input} type="text" className={classes.inputText} margin="normal"/>
                                                {meta.error && meta.touched && <span className={classes.textError}>{meta.error}</span>}
                                            </Grid>
                                        )}
                                    </Field>
                                    <Field name="numberBerths">
                                        {({ input, meta }) => (
                                            <Grid className={classes.inputCart}>
                                                <Grid container className={classes.textInput}>Количетсво спальных мест:</Grid>
                                                <TextField {...input} type="text" className={classes.inputText} margin="normal"/>
                                                {meta.error && meta.touched && <span className={classes.textError}>{meta.error}</span>}
                                            </Grid>
                                        )}
                                    </Field>
                                    <Field name="area">
                                        {({ input, meta }) => (
                                            <Grid className={classes.inputCart}>
                                                <Grid container className={classes.textInput}>Площадь:</Grid>
                                                <TextField {...input} type="text" className={classes.inputText} margin="normal"/>
                                                {meta.error && meta.touched && <span className={classes.textError}>{meta.error}</span>}
                                            </Grid>
                                        )}
                                    </Field>
                                    <Field name="numberRooms">
                                        {({ input, meta }) => (
                                            <Grid className={classes.inputCart}>
                                                <Grid container className={classes.textInput}>Количество комнат:</Grid>
                                                <TextField {...input} type="text" className={classes.inputText} margin="normal"/>
                                                {meta.error && meta.touched && <span className={classes.textError}>{meta.error}</span>}
                                            </Grid>
                                        )}
                                    </Field>
                                    <Field name="address">
                                        {({ input, meta }) => (
                                            <Grid className={classes.inputCart}>
                                                <Grid container className={classes.textInput}>Адрес:</Grid>
                                                <TextField {...input} type="text" className={classes.inputText} margin="normal" value={room ? room.address : null}/>
                                                {meta.error && meta.touched && <span className={classes.textError}>{meta.error}</span>}
                                            </Grid>
                                        )}
                                    </Field>
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
                            // onClick={onSubmit}
                            type="button"
                            onClick={() => onSubmit(values)}
                        >
                            <Box
                                className={classes.textButton}
                            >
                                Сохранить
                            </Box>
                        </Button >
                    </Grid>
                    </form>
                )}
            />
        </Grid>
    );
}
