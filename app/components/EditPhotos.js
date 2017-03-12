import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { ReactRpg } from 'react-rpg';
import Styles  from '../styles';
import styler from 'react-styling'
import Radium from 'radium';
import Modal from 'react-modal';
import Sortable from 'react-anything-sortable';
import SortableImage  from './SortableImage';

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
    background: 'black',
    color: 'white',
  }
};

const ImagePreview = ({ url, name, style, description, settings }) => {
  const handleSelectedChange = (e) => {
    let selected = e.target.checked;
    settings[e.target.id].selected = settings;
    this.setState({
      settings:settings
    })
  }

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
      imageList: {},
      showOrder: false,
      imageOrder: {},
      settings: []
    }

  }

  handleSort(data) {
    this.setState({
      result: data.join(' '),
      imageOrder: data
    });
  }

  toggleSection() {
    this.setState({
      showOrder: !this.state.showOrder,
    });
  }

  handleRemoveSettingsChange(e){
    let selected = e.target.checked;
    var {settings, imageDetails} = this.state;
    if(!selected){
      for(var j=0; j<imageDetails.settings.length; j++){
        if(imageDetails.settings[j].id == e.target.id){
          imageDetails.settings[j].selected = false;
        }
      }

      var settingToPush = imageDetails.settings.filter(function(el){
        return el.id == e.target.id;
      })
      imageDetails.settings = imageDetails.settings.filter(function(el) {
          return el.id != e.target.id;
      });

      settings.push(
        settingToPush[0]
      )
    }

    this.setState({ 
      settings: settings,
      imageDetails: imageDetails
     });
   }

  handleSelectedSettingsChange(e){
    let selected = e.target.checked;
    var {settings, imageDetails} = this.state;
    if(selected){
      imageDetails.settings.push({
        size: settings[e.target.id].size,
        price: settings[e.target.id].price,
        medium: settings[e.target.id].medium,
        dealer: settings[e.target.id].dealer,
        dealer_cost: settings[e.target.id].dealer_cost,
        has_free_shipping: settings[e.target.id].has_free_shipping,
        id: settings[e.target.id].id,
        selected: true,
      })
      settings.splice(e.target.id, 1);
    }

    this.setState({ 
      settings: settings,
      imageDetails: imageDetails
     });
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
  
  closeModal(e) {
    e.preventDefault();
    this.setState({modalIsOpen: false});
  }

  openModal(url) {
    var index = getIndex(url, this.state.imageList, 'url');
    this.getPossibleSettings(this.state.imageList[index].id);
    this.setState({modalIsOpen: true, imageDetails: this.state.imageList[index]});
  }

  getPossibleSettings(photo_id){
    const apiUrl = API_URL;
    const path = `${apiUrl}/settings/available_settings/${photo_id}`
    axios.get(path)
      .then((response) => {
        var settings = response.data;
        for(var j=0; j<settings.length; j++){
          settings[j].selected = false;
        }
        this.setState({
          settings: settings
        })
      })
      .catch((error) => {
        console.log("Error in get settings:", error);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { files} = this.state;
    const { imageDetails, isFeaturedImage} = this.state;
    const apiUrl = API_URL;
    const path = `${apiUrl}/photos`

     axios.put(path, 
      {
        image:{order: imageDetails.order, photo_id: imageDetails.id, name: imageDetails.name, uniqueFileName: imageDetails.name, settings: imageDetails.settings, isFeatured: true, description: imageDetails.description },
      })
      .then( function(names) {
        console.log('Success')
      })
      .catch((error) => {
        console.log("Error in Edit Photo: ", error);
      });
  }

  saveOrder(e) {
    e.preventDefault();
    const { imageDetails, isFeaturedImage, imageOrder} = this.state;
    const apiUrl = API_URL;
    const path = `${apiUrl}/photos`
    console.log(imageOrder)

    imageOrder.map(function(image, index){
      axios.put(path, 
      {
        image:{order: index + 1 , photo_id: image.id, name: image.name, uniqueFileName: image.name, settings: image.settings, isFeatured: true, description: image.description },
      })
      .then( function(names) {
        console.log('Success')
      })
      .catch((error) => {
        console.log("Error in update order: ", error);
      });
    })
     
  }

  componentDidMount(){
    const apiUrl = API_URL;
    const path = `${apiUrl}/features`
    axios.get(path)
      .then((response) => {
        var items = response.data;
        for(var index=0; index <items.length; index++){
          var image = null;
          if(items[index].settings === undefined){
            items[index].settings = [];
          } else {
            for(var j=0; j<items[index].settings.length; j++){
              items[index].settings[j].selected = true;
            }
          }
          this.configureClickHandler(items, index, items[index].url)
        }
        this.setState({
          imageList: items,
          loading: false,
          modalIsOpen: false,
        })
      })
      .catch((error) => {
        console.log("Error in edit:", error);
      });
  }

  configureClickHandler(image, index, url) {  
    image[index].clickHandler = () => {this.openModal(url)};
  }

  render(){
    const { imageList, loading, currentImage, imageDetails, showOrder, settings} = this.state;
    if(loading){
      return <p>Loading</p>
    } else {
      return (
        <div>
          <button onClick={(x) => {this.toggleSection(x)}}>Toggle View</button>
          <div>
          { showOrder ?
            <div>
            <Sortable onSort={(x) => {this.handleSort(x)}}>
                {
                  imageList.map(function(image, index){
                    return(
                      <SortableImage onclick={(x) => {this.openModal(x)}} url={image.url} order={index} key={index} sortData={image}/>
                    )
                  })
                }
              </Sortable>
              <button onClick={(x) => {this.saveOrder(x)}}>Save Order</button>
            </div>
          : null }
          </div>
          <div>
            {!showOrder ? <ReactRpg imagesArray={imageList} columns={[ 1, 2, 3 ]} padding={10}></ReactRpg> : null}
            <Modal
                isOpen={this.state.modalIsOpen}
                onRequestClose={(x) => this.closeModal(x)}
                contentLabel="Example Modal" 
                style={customStyles}
              >
                <div >
                  <button style={{float: "right"}} onClick={(x) => {this.closeModal(x)}}>Close</button>
                  <ImagePreview style={Styles} name={imageDetails.name} description={imageDetails.description} settings={settings} url={imageDetails != null ? imageDetails.url : "" }/>
                  <div style={Styles.sidebar}>

                    <form>
                      <div>
                        <label name="photo_name" htmlFor="photo_name">Photo Name</label>
                        <input style={style.modalInput} type="text" value={imageDetails.name != null ? imageDetails.name : null} onChange={(x) => {this.handlePhotoNameChange(x) }} title="Photo Name"/>
                        <label name="photo_description" htmlFor="photo_description">Photo Description</label>
                        <input style={style.modalInput} type="text" value={imageDetails.description != null ? imageDetails.description : null} onChange={(x) => {this.handlePhotoDescriptionChange(x) }} title="Photo Description"/>
                        <div>
                        {
                          imageDetails.settings.map(function(setting, index){
                            return(
                              <div key={"div_"+index}>
                                <label key={"selected" + index} name="selected" htmlFor="selected">Selected</label>
                                <input style={style.modalInput} checked={setting.selected != null ? setting.selected : false} key={"input_selected_" + index} id={setting.id} type="checkbox" onClick={(x) => {this.handleRemoveSettingsChange(x)}}/>
                                <br/>
                                <label key={"label_size_" + index} name="size" htmlFor="size">Size - {setting.size}</label>
                                <br/>
                                <label key={"label_price_" + index} name="price" htmlFor="price">Price - ${setting.price}</label>
                                <br/>
                                <label key={"medium_"+index} id={index} value={setting.medium}>Medium - {setting.medium}</label>
                                <br/>
                                <label key={"label_has_free_shipping_" + index} name="shipping" htmlFor="shipping">Has Free Shipping - {setting.has_free_shipping != null ? setting.has_free_shipping.toString() : "false"}</label>
                                <br/>
                                <label key={"label_dealer_" + index} name="dealer" htmlFor="dealer">Dealer - {setting.dealer}</label>
                                <br/>
                                <label key={"label_dealer_cost" + index} name="size" htmlFor="size">Dealer Cost - {setting.dealer_cost}</label>
                                <br/>
                                <br/>
                              </div>
                            )
                          }.bind(this))
                        }
                        </div>
                      </div>
                    <button className="btn btn-default" type="button" onClick={(x) => {this.handleSubmit(x)}}>Save</button>
                    </form>
                  </div>
                  <div style={Styles.content}>
                    <form>
                      <div>
                      {
                        settings.map(function(setting, index){
                          return(
                            <div key={"div_"+index}>
                              <label key={"selected" + index} name="selected" htmlFor="selected">Add</label>
                              <input style={style.modalInput} checked={setting.selected != null ? setting.selected : false} key={"input_selected_" + index} id={index} type="checkbox" onClick={(x) => {this.handleSelectedSettingsChange(x)}}/>
                              <br/>
                              <label key={"label_size_" + index} name="size" htmlFor="size">Size - {setting.size}</label>
                              <br/>
                              <label key={"label_price_" + index} name="price" htmlFor="price">Price - ${setting.price}</label>
                              <br/>
                              <label key={"medium_"+index} id={index} value={setting.medium}>Medium - {setting.medium}</label>
                              <br/>
                              <label key={"label_dealer_" + index} name="dealer" htmlFor="dealer">Dealer - {setting.dealer}</label>
                              <br/>
                              <br/>
                              <br/>
                            </div>
                          )
                        }.bind(this))
                      }
                      </div>
                    </form>
                  </div>
                </div>
              </Modal>     
          </div>    
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
  modalInput {
    color: black;
  }
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