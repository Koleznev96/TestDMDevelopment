import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import {useRoutes} from "./routes";
import {useRedaction} from "./hooks/redaction.hook";
import {RedactionContext} from "./context/redactionContext";
import {Menu} from "./components/Menu";

function App() {
    const {isRedaction, changeTrueRedaction, changeFalseRedaction} = useRedaction();
    const routes = useRoutes(isRedaction);

    return (
        <RedactionContext.Provider value={{
            isRedaction, changeTrueRedaction, changeFalseRedaction
        }}>
            <Menu />
            <div className="App">
                <Router>
                    {routes}
                </Router>
            </div>
        </RedactionContext.Provider>
    );
}

export default App;
