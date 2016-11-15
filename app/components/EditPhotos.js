import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { ReactRpg } from 'react-rpg';
import Styles  from '../styles';
import styler from 'react-styling'
import Radium from 'radium';
import Modal from 'react-modal';

const customStyles = {
  overlay : {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
  },
  content: {
    border: '0',
    borderRadius: '4px',
    bottom: 'auto',
    minHeight: '10rem',
    left: '50%',
    padding: '2rem',
    position: 'fixed',
    right: 'auto',
    top: '50%',
    transform: 'translate(-50%,-50%)',
    minWidth: '40rem',
    width: '80%',
    maxWidth: '100%',
    maxHeight: '100%',
    background: 'black'
  }
};

const ImagePreview = ({ url, name, style, description }) => {
  return (
    <div style={style.container}>
      <div style={style.sidebar}>
        <img src={url}  style={style.modalImage} alt={url}  />
        <p>sidebar content here</p>
      </div>
      <div style={style.content}>
        <h1>{name}</h1>
        <h1>Description</h1>
        <p>{description}</p>
      </div>
    </div>
  )
};

function getIndex(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}

class EditPhoto extends React.Component {
  constructor(){
    super();
    this.state = {
      id: null,
      title: "",
      loading: true,
      imageDetails: {settings:[]},
      imageList: {}
    }

  }

  handleSettingPriceChange(e){
    let price = e.target.value;
    var imageDetails = this.state.imageDetails;
    
    imageDetails.settings[e.target.id].price = price;
    this.setState({ imageDetails: imageDetails });
  }

  handleSettingSizeChange(e){
    let size = e.target.value;
    var imageDetails = this.state.imageDetails;    
    imageDetails.settings[e.target.id].size = size;
    this.setState({ imageDetails: imageDetails });
  }
  handlePhotoDescriptionChange(e) {
    let description = e.target.value;
    var imageDetails = this.state.imageDetails;
    imageDetails.description = description;
    this.setState({ imageDetails: imageDetails });
  }

  handlePhotoNameChange(e) {
    let fileName = e.target.value;
    var imageDetails = this.state.imageDetails;
    imageDetails.name = fileName;
    this.setState({ imageDetails: imageDetails });
  }
  
  handleMediumChange(e) {
    let medium = e.target.value;
    var imageDetails = this.state.imageDetails;
        console.log(medium)
    console.log(e.target.id)
    console.log(imageDetails.settings)
    imageDetails.settings[e.target.id].medium = medium;
    this.setState({ imageDetails: imageDetails });
  }

  handleAddSetting(e){
    var newArray = this.state.imageDetails; 
    // var settingsLength = newArray[newArray.length - 1].settings.length;
    var settingsLength = newArray.settings.length;
    //check if last setting is still null

    if(settingsLength == 0 || newArray.settings[settingsLength - 1].size != null)
    {
      newArray.settings.push({size: null, price:null, medium: null}); 
      this.setState({imageDetails: newArray})
    }
  }

  closeModal(e) {
    e.preventDefault();
    this.setState({modalIsOpen: false});
  }

  openModal(url) {
    var index = getIndex(url, this.state.imageList, 'url');
    this.setState({modalIsOpen: true, imageDetails: this.state.imageList[index]});
  }

  handleSubmit(e) {
    e.preventDefault();
    const { files} = this.state;
    const { imageDetails, isFeaturedImage} = this.state;
    const apiUrl = process.env.API_URL;
    const path = `${apiUrl}/photos`

     axios.put(path, 
      {
        image:{photo_id: imageDetails.id, name: imageDetails.name, uniqueFileName: imageDetails.name, settings: imageDetails.settings, isFeatured: true, description: imageDetails.description },
      })
      .then( function(names) {
        console.log('Success')
      })
      .catch((error) => {
        console.log("Error in Edit Photo: ", error);
      });
  }

  componentDidMount(){
    const apiUrl = process.env.API_URL;
    const path = `${apiUrl}/features`
    axios.get(path)
      .then((response) => {
        var items = response.data;
        console.log(items)
        for(var index=0; index <items.length; index++){
          var image = null;
          items[index].clickHandler = (x) => {this.openModal(x) };
        }
        this.setState({
          imageList: items,
          loading: false,
          modalIsOpen: false,
        })
      })
      .catch((error) => {
        console.log("Error in Featured:", error);
      });
  }

  componentWillReceiveProps(nextProps){
    //handle new props
  }


  render(){
    const { imageList, loading, currentImage, imageDetails} = this.state;
    console.log(imageDetails)
    if(loading){
      return <p>Loading</p>
    } else {
      return (
        <div>
          <ReactRpg imagesArray={imageList} columns={[ 1, 2, 3 ]} padding={10} ></ReactRpg>   
          <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={(x) => this.closeModal(x)}
              contentLabel="Example Modal" 
              style={customStyles}
            >
              <div >
                <button style={{float: "right"}} onClick={(x) => {this.closeModal(x)}}>Close</button>
                <ImagePreview style={Styles} name={imageDetails.name} description={imageDetails.description} url={imageDetails != null ? imageDetails.url : "" }/>
                <form>
                  <div>
                    <label name="photo_name" htmlFor="photo_name">Photo Name</label>
                    <input type="text" value={imageDetails.name != null ? imageDetails.name : null} onChange={(x) => {this.handlePhotoNameChange(x) }} title="Photo Name"/>
                    <label name="photo_description" htmlFor="photo_description">Photo Description</label>
                    <input type="text" value={imageDetails.description != null ? imageDetails.description : null} onChange={(x) => {this.handlePhotoDescriptionChange(x) }} title="Photo Description"/>
                    <div>
                    {
                      imageDetails.settings.map(function(setting, index){
                        return(
                          <div key={"div_"+index}>
                            <label key={"label_size_" + index} name="size" htmlFor="size">Size</label>
                            <input key={"input_size_" + index} id={index} value={setting.size != null ? setting.size : null} type="text" onChange={(x) => {this.handleSettingSizeChange(x) }} title="Size"/>
                            <label key={"label_price_" + index} name="price" htmlFor="price">Price</label>
                            <input key={"input_price_"+index} id ={index} value={setting.price != null ? setting.price : null} type="decimal" onChange={(x) => {this.handleSettingPriceChange(x) }} title="Price"/>
                            <select value={setting.medium} key={"medium_"+index} className="form-control" id={index} onChange={(x) => {this.handleMediumChange(x)}}>
                              <option key={"medium_none"+index} value="" style={{display: "none"}}>Medium</option>
                              <option key={"medium_canvas_"+index} value="Canvas" style={{display: "none"}}>Canvas</option>
                              <option key={"medium_print_"+index} value="Paper Print" style={{display: "none"}}>Paper Print</option>
                            </select> 
                          </div>
                        )
                      }.bind(this))
                    }
                    </div>
                    <button className="btn btn-default" type="button" onClick={(x) => {this.handleAddSetting(x)}}>Add Setting</button>
                  </div>
                <button className="btn btn-default" type="button" onClick={(x) => {this.handleSubmit(x)}}>Submit</button>
                </form>
              </div>
            </Modal>         
      </div>
      )
    }
  }
}

export default Radium(EditPhoto);

const theme = {
  // container
  container: { 
    // background: 'rgba(255, 255, 255, 0.9)',
    background: 'rgba(0, 0, 0, 0.9)',
    // height: 'auto',
    // top: '100px',
    // bottom: '10%'
  },

  // arrows
  arrow: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    fill: '#222',
    opacity: 0.6,
    transition: 'opacity 200ms',

    ':hover': {
      opacity: 1,
    },
  },
  arrow__size__medium: {
    borderRadius: 40,
    height: 40,
    marginTop: -20,

    '@media (min-width: 768px)': {
      height: 70,
      padding: 15,
    },
  },
  arrow__direction__left: { marginLeft: 10 },
  arrow__direction__right: { marginRight: 10 },

  // header
  close: {
    fill: '#D40000',
    opacity: 0.6,
    transition: 'all 200ms',

    ':hover': {
      opacity: 1,
    },
  },

  // footer
  footer: {
    color: 'black',
  },
  footerCount: {
    color: 'rgba(0, 0, 0, 0.6)',
  },

  // thumbnails
  thumbnail: {
  },
  thumbnail__active: {
    boxShadow: '0 0 0 2px #00D8FF',
  },
};


const style = styler
`
  .thumbnail {
    position: relative;
    width: 400px;
    height: 400px;
    overflow: hidden;
  }
  .thumbnail_img {
    position: absolute;
    left: 50%;
    top: 50%;
    height: 100%;
    width: auto;
    overflow:hidden;
    -webkit-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
            transform: translate(-50%,-50%);
  }
  .img_portrait {
    width: 100%;
    height: auto;
    overflow:hidden;
  }

  div_image {
    position: relative;
    margin-bottom: 20px;
    width: 100%; 
    overflow: hidden;
    min-height: 200px;

    &:hover {
      opacity: 0.7;
    }
  }

  div_hover {
    &:hover {
      opacity: 0.7;
    }
  }

  .h2{
    position: absolute;
    top: 0px;
    left: 0;
    right: 0;
    width: 400px;
    max-width:  window.innerWidth
    background: rgb(0, 0, 0); 
    background: rgba(0, 0, 0, 0.7); 
    margin-top: 0px;
    margin-left: auto;
    margin-right: auto;
    color: white; 
    font-size: 35px;
    letter-spacing: -1px;
    line-height: 200%
  }
`


