import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';

import {useRoutes} from "./routes";
import {Menu} from "./components/Menu";
import {connect} from "react-redux";

function App({statusRedaction, changeTrueRedaction, changeFalseRedaction}) {
    const routes = useRoutes(statusRedaction);
    const menu = Menu(statusRedaction, changeTrueRedaction, changeFalseRedaction)

    return (
            <Router>
                {menu}
                {routes}
            </Router>
    );
}

const mapStateToProps = state => {
    return { statusRedaction: state.statusRedaction };
};

const mapDispatchToProps = dispatch => {
    return {
        changeTrueRedaction: () => dispatch({ type: 'changeTrueRedaction' }),
        changeFalseRedaction: () => dispatch({ type: 'changeFalseRedaction' }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
