import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { ReactRpg } from 'react-rpg';
import Styles  from '../styles';
import styler from 'react-styling'
import Radium from 'radium';
import Lightbox from 'react-images';
import LightboxContact from './LightboxContactComponent';


function getIndex(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}

class FeaturedImages extends React.Component {
  constructor(){
    super();
    this.state = {
      id: null,
      title: "",
      loading: true,
      imageList: {},
      currentImage: 0,
      lightboxIsOpen: false,
      images: []
    }
    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
  }

  openModal(url) {
    var index = getIndex(url, this.state.primaryPhotos, 'url');
    var photo = this.state.primaryPhotos[index];
    //window.location = `#/photoset/${photo.id}/title/${photo.title}`
  }

  componentDidMount(){
    var images =  
      [{
          index: 0,
          src: "http://www.boundless-journey.com/portfolio/images/examples/cornerDetail.jpg",
          caption: 
            <div>
              <div className="row">
                <div className="form-group col-xs-6">
                  <p style={{color: "white"}}>Corner detail of wrapped canvas</p>
                </div>
              </div>
            </div>,
          onClick: this.openLightbox.bind(this,0)
        },
        {
          index: 1,
          src: "http://www.boundless-journey.com/portfolio/images/examples/largeCanvas.jpg",
          caption: 
            <div>
              <div className="row">
                <div className="form-group col-xs-6">
                  <p style={{color: "white"}}>Large wrapped canvas</p>
                </div>
              </div>
            </div>,
          onClick: this.openLightbox.bind(this,1)
        }];

      this.setState({
        imageList: images.map(function(image, index)
        {
          image.url = image.src; 
          image.clickHandler = this.openLightbox.bind(image,index);
          return image;
        }.bind(this)),
        images: images,
        loading: false,
        modalIsOpen: false,
      })
  }

  gotoPrevious () {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext () {
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  gotoImage (index) {
    this.setState({
      currentImage: index,
    });
  }
  handleClickImage () {
    if (this.state.currentImage === this.state.imageList.length - 1) return;
    this.gotoNext();
  }
  openLightbox (index,x) {
    event.preventDefault();
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox () {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }

  render(){
    const { imageList, images, loading, currentImage} = this.state;
    if(loading){
      return <p>Loading</p>
    } else {
      return (
        <div>
          <ReactRpg imagesArray={imageList} columns={[ 1, 2, 3 ]} padding={10} ></ReactRpg>            

        <Lightbox
        currentImage={currentImage}
        images={ images }
        isOpen={this.state.lightboxIsOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClickImage={this.handleClickImage}
        onClose={this.closeLightbox}
        theme={theme}
      />
      </div>
      )
    }
  }
}

export default Radium(FeaturedImages);

const theme = {
  // container
  container: { 
    background: 'rgba(0, 0, 0, 0.9)',
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


