import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Tasks from './pages/Tasks/index';


export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Tasks} />
            </Switch>
        </BrowserRouter>
    );
}
