import React from 'react';
import Main from '../components/Main';
import Galleries from '../components/GalleriesContainer';
import Photoset from '../components/Photoset';
import CreateGallery from '../components/CreateGallery';
import CreateFeature from '../components/AddFeaturedPhoto';
import EditPhoto from '../components/EditPhotos';
import Contact from '../components/ContactForm';
import Featured from '../components/FeaturedImages';
import ImageDetails from '../components/ImageDetails';
import About from '../components/About';
import Examples from '../components/Examples';
import EditPhotoSettings from '../components/EditPhotoSettings';
import { Route, IndexRoute } from 'react-router';

module.exports = (
  <Route path="/" component={Main} >
      <Route path="/galleries" component={Galleries} />
      <Route path="/photoset/:id/title/:title" component={Photoset} />
      <Route path="/createGallery" component={CreateGallery} />
      <Route path="/addFeature" component={CreateFeature} />
      <Route path="/editPhoto" component={EditPhoto} />
      <Route path="/contact(/:photo_id)(/:name)" component={Contact} />
      <Route path="/featured" component={Featured} />
      <Route path="/imageDetails/:id" component={ImageDetails} />
      <Route path="/about" component={About} />
      <Route path="/examples" component={Examples} />
      <Route path="/editPhotoSettings" component={EditPhotoSettings} />
  </Route>
);