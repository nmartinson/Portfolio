import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { ReactRpg } from 'react-rpg';

const previewStyles = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position: 'fixed',
  border: 'solid #1a1a1a 10px',
  zIndex: '3',
};
const imageStyle = {
  maxWidth: "800px"
};

const ImagePreview = ({ url }) => <img src={url} style={previewStyles} alt={url} width="50%" height="auto" />;

const Gallery = ({primaryPhotos}) => {
  var photos = [];


  return (
    <div className='image transition'>
    {
      primaryPhotos.map(function(photo, idx) {
            return (<div><Link key={idx} to={`/photoset/${photo.id}/title/${photo.title}`}>
                    <img style={imageStyle} src={photo.url}/>
                  </Link></div>)
        }.bind(this))
    }
    </div>
  )
}

export default Gallery;