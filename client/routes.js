import React from 'react';
import { Route, Switch } from 'react-router-dom';
import App from './components/App.js';
import LoginView from './components/LoginView.js';
import RegisterView from './components/RegisterView.js';
import AddcardView from './components/AddcardView.js';

export const Routes = () => (
    <Switch>
      <Route exact path='/' component={App} />
      <Route exact path='/login' component={LoginView} />
      <Route exact path='/register' component={RegisterView} />
      <Route exact path='/addcard' component={AddcardView} />

    </Switch>
);
export default Routes;
