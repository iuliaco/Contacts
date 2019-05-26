import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Main from './components/Main.jsx';
import Routes from './routes';
import { Provider } from 'react-redux';
import store from './store';
import jwt_decode from 'jwt-decode';
import setAuthToken from './setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authentication';

if(localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  console.log(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  console.log(decoded);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/login';
  }
}

ReactDOM.render(
  <Provider store = { store }>
   <BrowserRouter>
    <Main/>
  </BrowserRouter> 
  </Provider>, document.getElementById('root'));
