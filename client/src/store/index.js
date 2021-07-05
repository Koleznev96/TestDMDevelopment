import { createStore } from 'redux';

const statusReducer = (state = { status: false }, action) => {
    if (action.type === 'increment') {
        return {
            status: true
        }
    }

    if (action.type === 'decrement') {
        return {
            status: false
        }
    }

    return state;
};

const store = createStore(statusReducer);

export default store;