import { createStore } from 'redux';
import {ACTIONS} from "./actionTypes";

const statusRedactionReducer = (state = { statusRedaction: false }, action) => {
    switch (action.type) {
        case ACTIONS.changeTrueRedaction: return {statusRedaction: true};
        case ACTIONS.changeFalseRedaction: return {statusRedaction: false};
    }
    return state;
};

const store = createStore(statusRedactionReducer);

export default store;