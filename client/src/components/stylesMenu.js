import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    header: {
        padding: 0,
        margin: 0,
        width: '100%',
        height: 60,
        flexDirection: 'row',
        backgroundColor: '#2366CA',
    },
    menuIcon: {
        height: 60,
        flexDirection: 'row',
    },
    menu: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButton: {
        width: '50%',
        height: 56,
    },
    menuButtonActive: {
        width: '50%',
        height: 56,
        backgroundColor: '#fff',
    },
    focusVisibleMenuButton: {
        backgroundColor: '#000',
    },
    textButton: {
        color: '#fff',
    },
    textButtonActive: {
        color: '#2366CA',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));