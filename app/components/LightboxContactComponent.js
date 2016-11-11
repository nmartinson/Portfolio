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

  return (
      <div>
        <div>
          <p style={{color: "white"}}>{imageDetails.name}</p>
        </div>
        <form>
          <div className="form-group">
            <div className="row">
              <div className="form-group col-xs-6">
                <select className="form-control" id="price_tag">
                  <option value="" style={{display: "none"}}>Prices and Sizes</option>
                  {
                    imageDetails.settings.map((setting, index) => {
                      return <option key={index} value={setting.price}>{setting.size} - ${setting.price}</option>
                    })                        
                  }
                </select>   
              </div>
              <div className="hidden form-group col-xs-3">
                <button >Buy it!</button>               
              </div>
              <div className="form-group col-xs-6">
                <button type={"button"} className={"btn btn-success"} data-message={[imageDetails.id, imageDetails.name]} onClick={handleEmailClick}>Email me about this photo</button>
              </div>
            </div>
          </div>
        </form>
      </div>
  )
}

export default LightboxContactComponent;