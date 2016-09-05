import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import About from './components/About';
import Joke from './components/Joke';

export default (
  <Route component={App}>
    <Route path='/' component={About} />
    <Route path='/jokes/:id' component={Joke} />
  </Route>
);
