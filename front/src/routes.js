import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewChallenge from './pages/NewChallenge';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch> 
                <Route path="/" exact component={ Logon }/> 
                <Route path="/register" component={ Register }/>

                <Route path="/profile" component={ Profile }/>
                <Route path="/challenges/new" component={ NewChallenge }/>
            </Switch>
        </BrowserRouter>
    );
}

//SWITCH: faz com que apenas 1 rota seja executada por vez
//exact para / não atrapalhar outras rotas, já que é verificado se o caminho comeaça com o que passou no path