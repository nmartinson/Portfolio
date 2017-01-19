import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { ReactRpg } from 'react-rpg';
import ReactGA from 'react-ga';


const LightboxContactComponent = ({imageDetails}) => {
  var photos = [];

  console.log('Lightbox/ImageDetails/'+imageDetails.id)
  ReactGA.modalview('Lightbox/ImageDetails/'+imageDetails.id);
  
  const handleEmailClick = (e) => {
    var params = e.target.dataset.message.split(",")
    window.location = `#/contact/${params[0]}/${params[1]}`
  }

  const handleDetailsClick = (e) => {
    window.location = `#/imageDetails/${imageDetails.id}`
  }

  return (
    <div>
      <div className="row">
        <div className="form-group col-xs-6">
          <p style={{color: "white"}}>{imageDetails.name}</p>
        </div>
        <div >
          <button type={"button"} className={"btn btn-success"} style={{fontSize: '12px', float: 'right', padding: '5px 5px'}} onClick={handleDetailsClick}>See Details</button>
        </div>
      </div>
    </div>
  )
}

export default LightboxContactComponent;