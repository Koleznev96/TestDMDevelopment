import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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
    hr: {
        marginTop: 10,
        width: '100%',
        height: 1,
        backgroundColor: '#2366CA',
    },
    textInput: {
        fontSize: 12,
        color: '#747474',
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
    listItemWiev: {
        marginLeft: 5,
        marginTop: 10,
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
    },
    textError: {
        marginTop: 10,
        color: 'red',
        fontSize: 12,
        marginRight: 20,
    },
    inputCart: {
        width: '100%',
    },
    inputText: {
        width: '100%',
    },
    mainCart: {
        flexDirection: 'row',
    },
}));