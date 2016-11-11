import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router';
import base64 from 'base-64';
import { ReactRpg } from 'react-rpg';

const imageStyle = {
  maxWidth: "200px"
};

class AddFeaturedPhoto extends React.Component {
  constructor(){
    super();
    this.state = {
      files: [],
      isFeaturedImage: true
    }
  }

  handleSettingPriceChange(e){
    let price = e.target.value;
    var fileList = this.state.files;
    
    fileList[0].settings[e.target.id].price = price;
    this.setState({ files: fileList });
  }

  handleSettingSizeChange(e){
    let size = e.target.value;
    var fileList = this.state.files;

    fileList[0].settings[e.target.id].size = size;
    this.setState({ files: fileList });
  }
  handlePhotoDescriptionChange(e) {
    let description = e.target.value;
    var fileList = this.state.files;
    fileList[e.target.id].description = description;

    this.setState({ files: fileList });
  }

  handlePhotoNameChange(e) {
    let fileName = e.target.value;
    var fileList = this.state.files;
    fileList[e.target.id].inputName = fileName;

    this.setState({ files: fileList });
  }
  
  handleAddSetting(e){
    var newArray = this.state.files.slice(); 
    var settingsLength = newArray[newArray.length - 1].settings.length;
  console.log(settingsLength)
    //check if last setting is still null

    if(settingsLength == 0 || newArray[newArray.length - 1].settings[settingsLength - 1].size != null)
    {
      newArray[newArray.length - 1].settings.push({size: null, price:null}); 
      this.setState({files: newArray})
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { files} = this.state;
    var reader  = new FileReader();
    var total = files.length; 
    var loaded = 0;


    for(var i=0; i< total; i++){
      reader.onload = (function (file) {
        return function(evt){
          loaded++;
          var Files = this.state.files;
          Files[file.id].file = reader.result;
          //this.setState({files: Files});
          if (loaded == total){
            this.uploadFiles();
          }
        };
      })(files[i]).bind(this);
      reader.readAsDataURL(files[i]);
    }
  }

  uploadFiles(){
    const { files, isFeaturedImage} = this.state;
    const apiUrl = process.env.API_URL;
    const path = `${apiUrl}/features`

    var images = files.map((fileItem, index) => {
      return { file: fileItem.file, name: fileItem.inputName, uniqueFileName: fileItem.name, settings: fileItem.settings, isFeatured: isFeaturedImage, description: fileItem.description }
    });

     axios.post(path, 
      {
        images: images,
      })
      .then( function(names) {
        var newFiles = this.state.files;

        newFiles.map((file,index) => {
          for(var i =0; i<names.data.length; i++){
            if(file.name == names.data[i] ){
              newFiles.splice(index, 1);
            }
          }
        })
        
        this.setState({ files: newFiles });  
      }.bind(this))
      .catch((error) => {
        console.log("Error in Create Feature: ", error);
      });
  }

  handleMediumChange(e) {
    let medium = e.target.value;
    var fileList = this.state.files;

    fileList[0].settings[e.target.id].medium = medium;
    this.setState({ files: fileList });
  }

  onDrop(acceptedFiles, rejectedFiles) {
    var fileCount = this.state.files.length;
    var newFiles = acceptedFiles.map((file, index) => {
        file.url = file.preview;
        file.id = fileCount + index;
        file.inputName = "";
        file.settings = [];
        file.isFeatured = true;
        return file
    })
    this.setState({ files: this.state.files.concat(newFiles) })
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){
    //handle new props
  }
  render(){
    const { files} = this.state;
    if(files.length > 0){
    console.log(files[0].settings)}
      return(
        <div>
          <form onSubmit={(x) => {this.handleSubmit(x)}}>
            <Dropzone onDrop={(x) => {this.onDrop(x)}}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
            <div>
            {
              files.map(function(photo, idx) {
                  return (<div>
                            <label name="photo_name" htmlFor="photo_name">Photo Name</label>
                            <input id={idx} type="text" onChange={(x) => {this.handlePhotoNameChange(x) }} title="Photo Name"/>
                            <label name="photo_description" htmlFor="photo_description">Photo Description</label>
                            <input id={idx} type="text" onChange={(x) => {this.handlePhotoDescriptionChange(x) }} title="Photo Description"/>
                            <div>
                            {
                              photo.settings.map(function(setting, index){
                                return(
                                  <div>
                                    <label name="size" htmlFor="size">Size</label>
                                    <input key={index + "key"} id={index} type="text" onChange={(x) => {this.handleSettingSizeChange(x) }} title="Size"/>
                                    <label name="price" htmlFor="price">Price</label>
                                    <input id={index} type="decimal" onChange={(x) => {this.handleSettingPriceChange(x) }} title="Price"/>
                                    <select className="form-control" id="medium" onChange={(x) => {this.handleMediumChange(x)}}>
                                      <option value="" style={{display: "none"}}>Medium</option>
                                      <option value="Canvas" style={{display: "none"}}>Canvas</option>
                                      <option value="Paper Print" style={{display: "none"}}>Paper Print</option>
                                    </select> 
                                  </div>
                                )
                              }, this)
                            }
                            </div>
                            <button className="btn btn-default" type="button" onClick={(x) => {this.handleAddSetting(x)}}>Add Setting</button>
                            <Link key={idx} to={`/photoset/${photo.id}/title/${photo.title}`}>
                              <img style={imageStyle} src={photo.url}/>
                            </Link>
                          </div>)
              }.bind(this))
            }
            </div>
            <button className="btn btn-default" type="submit" onClick={(x) => {this.handleSubmit(x)}}>Submit</button>
          </form>
        </div>
      )
  }
}

export default AddFeaturedPhoto;
