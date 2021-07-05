import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    conveniences: {
        minHeight: '100vh',
        maxHeight: '100%',
    }
}));