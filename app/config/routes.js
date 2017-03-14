import React from 'react';
import Main from '../components/Main';
import CreateFeature from '../components/AddFeaturedPhoto';
import EditPhoto from '../components/EditPhotos';
import Contact from '../components/ContactForm';
import Featured from '../components/FeaturedImages';
import ImageDetails from '../components/ImageDetails';
import About from '../components/About';
import Examples from '../components/Examples';
import EditPhotoSettings from '../components/EditPhotoSettings';
import OrderingInfo from '../components/OrderingInfo';
import LightboxContactComponent from '../components/LightboxContactComponent';

import { Route, IndexRoute } from 'react-router';

const Routes = (
  <Route path="/" component={Main} >
      <Route path="/addFeature" component={CreateFeature} />
      <Route path="/editPhoto" component={EditPhoto} />
      <Route path="/contact(/:photo_id)(/:name)" component={Contact} />
      <Route path="/featured" component={Featured} />
      <Route path="/imageDetails/:id" component={ImageDetails} />
      <Route path="/about" component={About} />
      <Route path="/examples" component={Examples} />
      <Route path="/editPhotoSettings" component={EditPhotoSettings} />
      <Route path="/orderingInfo" component={OrderingInfo} />      

  </Route>
);

export default Routes;

// const Routes = (
//   <Route path="/" component={Main} >
//       <Route path="/galleries" component={Galleries} />
//       <Route path="/photoset/:id/title/:title" component={Photoset} />
//       <Route path="/createGallery" component={CreateGallery} />
//       <Route path="/addFeature" component={CreateFeature} />
//       <Route path="/editPhoto" component={EditPhoto} />
//       <Route path="/contact(/:photo_id)(/:name)" component={Contact} />
//       <Route path="/featured" component={Featured} />
//       <Route path="/imageDetails/:id" component={ImageDetails} />
//       <Route path="/about" component={About} />
//       <Route path="/examples" component={Examples} />
//       <Route path="/editPhotoSettings" component={EditPhotoSettings} />
//       <Route path="/orderingInfo" component={OrderingInfo} />      

//   </Route>
// );