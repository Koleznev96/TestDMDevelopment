import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#2366CA',
        height: '100%',
    },
    row: {
        marginLeft: 100,
        flexDirection: 'column',
    },
    textItemView: {
        color: '#fff',
        fontSize: 12,
    },
    listItem: {
        width: '100%',
    },
    iconItem: {
        height: 24,
        width: 24,
    },
    textButton: {
        fontWeight: '300',
        color: '#2366CA',
        fontSize: 16,
    },
    linerButton: {
        width: '100%',
    },
    menuButtonView: {
        width: 150,
        height: 30,
        backgroundColor: '#fff'
    },
    rowRed: {
        marginLeft: 80,
        flexDirection: 'column',
    },
    textItem: {
        marginLeft: 10,
        color: '#fff',
        fontSize: 12,
    },
    textHeader: {
        marginLeft: 5,
        color: '#fff',
        fontSize: 14,
        width: '100%',
        fontWeight: '700',
    },
    menuButton: {
        marginLeft: 10,
        width: 150,
        height: 30,
        backgroundColor: '#fff'
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
    inputText: {
        width: 150,
        height: 5,
        color: '#fff',
    },
    textError: {
        marginTop: 10,
        color: 'red',
        fontSize: 12,
        marginRight: 20,
    }
}));