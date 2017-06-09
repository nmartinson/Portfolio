import React from 'react';
import Radium, { Style, StyleRoot } from "radium";

const ImageMeta = ({ imageDetails, style }) => {
  
  function formatDate(dateString) {
    var date = new Date(dateString);
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
  }
  function getClass(data){
    if(data == null || data == "")
      return "hidden";
    return null;
  }

  return (
    <div>
      <ul style={{listStyleType: 'none', textAlign: 'left', padding:'0'}}>
        <li className={getClass(imageDetails.copyright)}><b>Copyright:</b> {imageDetails.copyright}</li>
        <li className={getClass(imageDetails.exposure_time)}><b>Exposure Time:</b> {imageDetails.exposure_time}</li>
        {
          imageDetails.lens == "" ? null : <li className={getClass(imageDetails.lens)}><b>Lens:</b> {imageDetails.lens}</li> 
        }
               
        <li className={getClass(imageDetails.focal_length)}><b>Focal Length:</b> {imageDetails.focal_length}</li>
        <li className={getClass(imageDetails.fstop)}><b>Aperture:</b> <i>f/</i>{imageDetails.fstop}</li>
        <li className={getClass(imageDetails.iso)}><b>ISO:</b> {imageDetails.iso}</li>
        <li className={getClass(imageDetails.model)}><b>Camera:</b> {imageDetails.model}</li>
        <li className={getClass(imageDetails.date)}><b>Date Taken:</b> {formatDate(imageDetails.date)}</li>
      </ul>
    </div>
  )
}

export default Radium(ImageMeta);
