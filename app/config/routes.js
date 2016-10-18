import React from 'react';
import Main from '../components/Main';
import Galleries from '../components/GalleriesContainer';
import Photoset from '../components/Photoset';
import { Route, IndexRoute } from 'react-router';

export default (
  <Route path="/" component={Main} >
      <Route path="/galleries" component={Galleries} />
      <Route path="/photoset/:id/title/:title" component={Photoset} />
  </Route>
);