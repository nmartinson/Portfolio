import React from 'react';
import Radium, { Style, StyleRoot } from "radium";

const ImageMeta = ({ imageDetails, style }) => {
  console.log(imageDetails)
  
  function formatDate(dateString) {
    var date = new Date(dateString);
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
  }

  return (
    <div>
      <ul style={{listStyleType: 'none', textAlign: 'left', padding:'0'}}>
        <li><b>Copyright:</b> {imageDetails.copyright}</li>
        <li><b>Exposure Time:</b> {imageDetails.exposure_time}</li>
        <li><b>Focal Length:</b> {imageDetails.focal_length}</li>
        <li><b>Aperture:</b> <i>f/</i>{imageDetails.fstop}</li>
        <li><b>ISO:</b> {imageDetails.iso}</li>
        <li><b>Camera:</b> {imageDetails.model}</li>
        <li><b>Date Taken:</b> {formatDate(imageDetails.date)}</li>
      </ul>
    </div>
  )
}

export default Radium(ImageMeta);
