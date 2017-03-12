import React from 'react';
import axios from 'axios';
import { Link,browserHistory } from 'react-router';
import { ReactRpg } from 'react-rpg';
import ReactGA from 'react-ga';


const LightboxContactComponent = ({imageDetails}) => {
  var photos = [];
  ReactGA.modalview('Lightbox/ImageDetails/'+imageDetails.id);


  return (
    <div>
      <div className="row">
        <div className="form-group col-xs-6">
          <p style={{color: "white"}}>{imageDetails.name}</p>
        </div>
        <div >
          <button type={"button"} className={"btn btn-success"} style={{fontSize: '12px', float: 'right', padding: '5px 5px'}}><a href={`/imageDetails/${imageDetails.id}`}>See Details</a></button>
        </div>
      </div>
    </div>
  )
}

export default LightboxContactComponent;