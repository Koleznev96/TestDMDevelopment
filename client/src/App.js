import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import {useRoutes} from "./routes";
import {useRedaction} from "./hooks/redaction.hook";
import {RedactionContext} from "./context/redactionContext";
import {Menu} from "./components/Menu";
import {Provider, useSelector} from "react-redux";

import store from "./store";

function App() {
    // const {isRedaction, changeTrueRedaction, changeFalseRedaction} = useRedaction();
    const status = useSelector(state => state.status);
    const routes = useRoutes(status);

    return (
        <Provider store={store}>
            <Router>
                <Menu />
                {routes}
            </Router>
        </Provider>
    );
}

export default App;
