import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { ReactRpg } from 'react-rpg';

const LightboxContactComponent = ({imageDetails}) => {
  var photos = [];

  const handleEmailClick = (e) => {
    var params = e.target.dataset.message.split(",")
    window.location = `#/contact/${params[0]}/${params[1]}`
  }

  const handleDetailsClick = (e) => {
    // var params = e.target.dataset.message.split(",")
    //console.log(imageDetails)
    window.location = `#/imageDetails/${imageDetails.id}`
  }

  return (
    <div>
      <div className="row">
        <div className="form-group col-xs-6">
          <p style={{color: "white"}}>{imageDetails.name}</p>
        </div>
        <div className="form-group col-xs-6">
          <button type={"button"} className={"btn btn-success"} style={{fontSize: '12px', padding: '5px 5px'}} onClick={handleDetailsClick}>See Details</button>
        </div>
      </div>
    </div>
  )
}

export default LightboxContactComponent;