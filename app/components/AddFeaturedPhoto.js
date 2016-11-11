import React from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router';
import base64 from 'base-64';
import { ReactRpg } from 'react-rpg';
var exif = require('exif-js');
var xmpReader = require('xmp-reader');

const imageStyle = {
  maxWidth: "200px"
};

class AddFeaturedPhoto extends React.Component {
  constructor(){
    super();
    this.state = {
      files: [],
      isFeaturedImage: true,
      xmpData: null,
      exifData: null
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
    const { files, isFeaturedImage, exifData, xmpData} = this.state;
    const apiUrl = process.env.API_URL;
    const path = `${apiUrl}/features`

    var images = files.map((fileItem, index) => {
      var exposure = '';
      if(exifData.ExposureTime.denominator == 1){
        exposure = exifData.ExposureTime.numerator + ' s';
      } else{
        exposure = exifData.ExposureTime.numerator + '/' + exifData.ExposureTime.denominator + ' s';
      }
      return { file: fileItem.file, 
        name: fileItem.inputName,
        uniqueFileName: fileItem.name, 
        settings: fileItem.settings, 
        isFeatured: isFeaturedImage, 
        description: fileItem.description,
        imageData: {
          copyright: exifData.Copyright,
          date: exifData.DateTimeOriginal,
          fstop: exifData.FNumber.numerator,
          exposureTime: exposure,
          focalLength: exifData.FocalLengthIn35mmFilm + "mm",
          iso: exifData.ISOSpeedRatings,
          make: exifData.Make,
          model: exifData.Model,
        }
      }
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
    this.getImageData(acceptedFiles[0]);
    this.setState({ files: this.state.files.concat(newFiles) })
  }

  getImageData(file){
    var fileReader = new FileReader();
    fileReader.onload = function(progressEvent) {
      var result = progressEvent.target.result;
      var {files, exifData, xmpData} = this.state;
      var exifResults = exif.readFromBinaryFile(result);
      console.log(exifResults)

      var buffer = this.toBuffer(result);
      xmpReader.fromBuffer(buffer).then(
        (data)=> {
          console.log(data); 
          files[0].inputName = data.title;
          files[0].description = data.description;
          this.setState({files: files, exifData: exifResults, xmpData: data})},
        (err) => console.log(err)
      ); 
    }.bind(this);
    fileReader.readAsArrayBuffer(file);
  }

  toBuffer(ab) {
    var buf = new Buffer(ab.byteLength);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
  } 

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps){
    //handle new props
  }
  render(){
    const { files} = this.state;
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
                            <input id={idx} type="text" value={photo.inputName != null || photo.inputName != '' ? photo.inputName : ''} onChange={(x) => {this.handlePhotoNameChange(x) }} title="Photo Name"/>
                            <label name="photo_description" htmlFor="photo_description">Photo Description</label>
                            <input id={idx} type="text" value={photo.description != null || photo.description != '' ? photo.description : ''} onChange={(x) => {this.handlePhotoDescriptionChange(x) }} title="Photo Description"/>
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
