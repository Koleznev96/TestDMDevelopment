import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';

import {Home} from "./pages/Home";
import {HomeRedaction} from "./pages/HomeRedaction";
import {Hotel} from "./pages/Hotel";
import {HotelRedaction} from "./pages/HotelRedaction";

export const useRoutes = isRedaction => {
    if (!isRedaction) {
        return (
            <Switch>
                <Route path="/home" exact>
                    <Home/>
                </Route>
                <Route path="/hotel/:id" exact>
                    <Hotel/>
                </Route>
                <Redirect to="/home"/>
            </Switch>
        );
    }
    return (
        <Switch>
            <Route path="/home" exact>
                <HomeRedaction/>
            </Route>
            <Route path="/hotel/:id" >
                <HotelRedaction/>
            </Route>
            <Redirect to="/home"/>
        </Switch>
    );
}
