import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
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