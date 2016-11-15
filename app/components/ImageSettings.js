import React from 'react';
import Radium, { Style, StyleRoot } from "radium";

const ImageSettings = ({ imageDetails, style }) => {
  const handleEmailClick = (e) => {
    var params = e.target.dataset.message.split(",")
    window.location = `#/contact/${params[0]}/${params[1]}`
  }

  return (
    <div>
      <p style={{fontSize: '20px'}}><b>{imageDetails.name}</b></p>
      <p>{imageDetails.description}</p>
      <select className="form-control" id="price_tag" style={{width: "auto"}}>
        <option value="" style={{display: "none"}}>Prices and Sizes</option>
        {
          imageDetails.settings.map((setting, index) => {
            return <option key={index} value={setting.price}>{setting.size} - ${setting.price}</option>
          })                        
        }
      </select>   
      <button className={"hidden"}>Buy it!</button>               
      <button style={{marginTop: '10px', marginBottom: "10px", padding:"5px", fontSize:"12px"}} type={"button"} className={"btn btn-success"} data-message={[imageDetails.id, imageDetails.name]} onClick={handleEmailClick}>Contact me about this photo</button>
    </div>
  )
}

export default Radium(ImageSettings);