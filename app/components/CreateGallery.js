import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router';
import base64 from 'base-64';
import { ReactRpg } from 'react-rpg';

const imageStyle = {
  maxWidth: "200px"
};

class CreateGallery extends React.Component {
  constructor(){
    super();
    this.state = {
      name: null,
      description : null,
      isProtected: false,
      cover_photo_id: null
    }
  }

  handleProtectedChange(e){
    let isProtected = e.target.checked;
    this.setState({ isProtected: isProtected });
  }

  handleCoverImageChange(e) {
    let checked = e.target.checked;
    this.setState({ isCoverImage: checked })
  }

  handleGalleryNameChange(e) {
    let name = e.target.value;
    this.setState({ name: name });
  }

  handleGalleryDescriptionChange(e) {
    let description = e.target.value;
    this.setState({ description: description });
  }

  handleSubmit(){
    const apiUrl =process.env.API_URL;
    const path = `${apiUrl}/gallery`
    const { name, description, isProtected, galleryCoverPhotoId} = this.state;
    axios.post(path,
    {
        name: name,
        description: description,
        protected: isProtected,
        cover_photo_id: galleryCoverPhotoId
    })
    .then(function(response){
      console.log(response);
    })
    .catch((error) => {
      console.log("Error in Create Gallery: " + error);
    });
  }

  componentWillReceiveProps(nextProps){
    //handle new props
  }

  render(){
      const { name, description, isProtected, galleryCoverPhotoId} = this.state;

      return(
        <div>
          <form onSubmit={(x) => {this.handleSubmit(x)}}>
            <div className="form-group">
              <label name="gallery_name" htmlFor="gallery_name">Gallery Name</label>
              <input type="text" onChange={(x) => {this.handleGalleryNameChange(x) }} id="gallery_name" title="Gallery Name"/>
              <label name="gallery_description" htmlFor="gallery_description">Gallery Description</label>
              <input type="text" onChange={(x) => {this.handleGalleryDescriptionChange(x) }} id="gallery_Description" title="Gallery Description"/>
              <label key="is_protected_label" name="is_protected_label" htmlFor="is_protected_label">Protected gallery?</label>
              <input checked={isProtected} key="is_protected" id="is_protected" type="checkbox" onClick={(x) => {this.handleProtectedChange(x) }}/>
                        
            </div>
          </form>
          <button className="btn btn-default" type="submit" onClick={(x) => {this.handleSubmit(x)}}>Submit</button>
        </div>
      )
  }
  
}

export default CreateGallery;