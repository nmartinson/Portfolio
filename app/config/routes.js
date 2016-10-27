import React from 'react';
import Main from '../components/Main';
import Galleries from '../components/GalleriesContainer';
import Photoset from '../components/Photoset';
import CreateGallery from '../components/CreateGallery';
import Contact from '../components/ContactForm';
import { Route, IndexRoute } from 'react-router';

module.exports = (
  <Route path="/" component={Main} >
      <Route path="/galleries" component={Galleries} />
      <Route path="/photoset/:id/title/:title" component={Photoset} />
      <Route path="/createGallery" component={CreateGallery} />
      <Route path="/contact(/:photo_id)" component={Contact} />
  </Route>
);