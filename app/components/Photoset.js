import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { ReactRpg } from 'react-rpg';
import Modal from 'react-modal';
import Styles  from '../styles';
// import Helmet from "react-helmet";

import {
  ShareButtons,
  ShareCounts,
  generateShareIcon
} from 'react-share';

const {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  PinterestShareButton,
  VKShareButton,
} = ShareButtons;

const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  PinterestShareCount,
} = ShareCounts;

const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');
const GooglePlusIcon = generateShareIcon('google');
const LinkedinIcon = generateShareIcon('linkedin');
const PinterestIcon = generateShareIcon('pinterest');
const VKIcon = generateShareIcon('vk');

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

class Photoset extends React.Component {
  constructor(){
    super();
    this.state = {
      imageURLs: [],
      id: null,
      title: "",
      loading: true,
      imageDetails: {settings:[]},
      imageList: {}
    }
  }
  componentDidMount(){
    const { id, title } = this.props.params;
    const apiUrl =process.env.API_URL;
    const path = `${apiUrl}/gallery?gallery_id=${id}`

    axios.get(path)
      .then((response) => {
        var items = response.data;
        for(var i=0; i <items.length; i++){
          items[i].clickHandler = (x) => {this.openModal(x) };
        }
        this.setState({
          imageList: items,
          loading: false,
          id: id,
          title: title,
          modalIsOpen: false,
        })
      })
      .catch((error) => {
        console.log("Error in Photoset:", error);
      });


  }

  componentWillReceiveProps(nextProps){
    //handle new props
  }

  openModal(url) {
    var index = getIndex(url, this.state.imageList, 'url');
    this.setState({modalIsOpen: true, imageDetails: this.state.imageList[index]});
  }

  afterOpenModal() {
   // this.refs.subtitle.style.color = 'black';
  }

  closeModal(e) {
    e.preventDefault();
    this.setState({modalIsOpen: false});
  }

  render(){
    const {imageURLs, id, title, count, loading, imageDetails, imageList} = this.state;
    if(loading){
      return(<p>Loading</p>)
    } else {
      console.log(imageDetails)
        return (
        <div>
        <FacebookShareButton
            url={String(window.location)}
            title={"TEST title"} >
            <FacebookIcon
              size={32}
              round />
          </FacebookShareButton>

          <div >
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={(x) => this.afterOpenModal(x)}
              onRequestClose={(x) => this.closeModal(x)}
              contentLabel="Example Modal" 
              style={customStyles}
            >
              <div >
                <button style={{float: "right"}} onClick={(x) => {this.closeModal(x)}}>Close</button>
                <ImagePreview style={Styles} name={imageDetails.name} description={imageDetails.description} url={imageDetails != null ? imageDetails.url : "" }/>
                <form>
                  <div className="form-group" style={{maxWidth:"60%", width: "40%"}}>
                    <label name="price_tag" htmlFor="price_tag">Gear Tag</label>
                    <div className="row">
                      <div className="form-group col-xs-6">
                        <select className="form-control" id="price_tag">
                          <option hidden></option>
                          {
                            imageDetails.settings.map((setting, index) => {
                              return <option key={index} value={setting.price}>{setting.size} - ${setting.price}</option>
                            })                        
                          }
                        </select>   
                      </div>
                      <div className="form-group col-xs-6">
                        <button onClick={(x) => {this.closeModal(x)}}>Buy it!</button>               
                      </div>
                    </div>
                  </div>
                </form>
                <Link to={`/contact/${imageDetails.id}`}>
                  <button>Email me about this photo</button>
                </Link>
              </div>
            </Modal>
            <ReactRpg imagesArray={imageList} columns={[ 1, 2, 3 ]} padding={10} />
          </div>
        </div>
        )
      }
  }
}

export default Photoset;
