import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { createHashHistory } from 'history';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });

import Dashboard from './client/js/components/home/dashboard.js';
import Signup from './client/js/components/login/signup.js';
import Login from './client/js/components/login/login.js';


ReactDOM.render(
    <Router history={appHistory}>
        <Route path="/" component={Dashboard}></Route>        	
    		<Route path="/signup" component={Signup}></Route>
        <Route path="/login" component={Login}></Route>
    </Router>,
    document.getElementById('app')
);