import {createContext} from 'react';

function  noop() {}

export const RedactionContext = createContext({
    isRedaction: null,
    changeTrueRedaction: noop,
    changeFalseRedaction: noop,
});
