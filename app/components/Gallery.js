import React from 'react';
import axios from 'axios';
import { ReactRpg } from 'react-rpg';
import Radium from 'radium';
import Lightbox from 'react-images';
import LightboxContact from './LightboxContactComponent';
import Helmet from "react-helmet";
import { ThreeBounce } from 'better-react-spinkit'

var tagSearch = '';

function containsTag(element, index, array){
  return element.tag.toLowerCase().includes(tagSearch);
}

function getIndex(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}

class Gallery extends React.Component {
  constructor(){
    super();
    this.state = {
      id: null,
      title: "",
      loading: true,
      imageList: {},
      currentImage: 0,
      lightboxIsOpen: false,
      images: [],
      modalVisible: false
    }
    this.closeLightbox = this.closeLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
    this.gotoImage = this.gotoImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
  }

  componentDidUpdate(){
      const {id} = this.props.params;
      if(id != this.state.gallery_id){
        if(id != undefined)
          this.getGalleryPhotos(id);
      }
  }
  
  getGalleryPhotos(id){
    const apiUrl = process.env.API_URL;
    const path = `${apiUrl}/gallery/${id}`
    axios.get(path)
      .then((response) => {
        var items = response.data.photos;
        var images = [];
        for(var index=0; index <items.length; index++){
            var image = null;
            items[index].clickHandler = this.openLightbox.bind(this,index);
            image = {
              index: index,
              src: items[index].url,
              caption: <LightboxContact imageDetails={items[index]}/>,
              onClick: this.openLightbox.bind(this,index)
            }
            items[index].url = items[index].thumbnail_url; //change react-rpg image to thumbnail
            images.push(image);
        }
        this.setState({
          imageList: items,
          filterImages: items,
          images: images,
          loading: false,
          modalIsOpen: false,
          gallery_id: id
        })
      })
      .catch((error) => {
        console.log("Error in Featured:", error);
      });
  }

  componentDidMount(){
    const {id} = this.props.params;
    if(id != undefined)
      this.getGalleryPhotos(id);
  }

  filterByTag (data) {
    tagSearch = data.target.value.toLowerCase();
    if(tagSearch != ""){
      var imageList = this.state.imageList;
      var filterImages = imageList.filter(function(el){
        return el.tags.some(containsTag)
      });
    } else {
      filterImages = this.state.imageList;
    }
    this.setState({ filterImages: filterImages });
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
    const { imageList, images, loading, currentImage, filterImages} = this.state;
    if(loading){
      return (
        <div style={{position: 'relative', left:'auto', right:'auto'}}>
            <ThreeBounce size={50}/>         
            <Helmet
              htmlAttributes={{"lang": "en"}} // amp takes no value
              title="Landscape & Nature Photography | Boundless Journey"
              titleTemplate="Landscape & Nature Photography | Boundless Journey"
              defaultTitle="Landscape & Nature Photography | Boundless Journey"
              meta={[
                  {"name": "twitter:image", "content": "http://www.boundless-journey.com/portfolio/images/features/DSC_6429-Pano-Edit-2.jpg"},
                  {"name": "thumbnail", "content": "http://www.boundless-journey.com/portfolio/images/features/thumbnails/DSC_6429-Pano-Edit-2_thumb.jpg"},
                  {"property": "og:image", "content": "http://www.boundless-journey.com/portfolio/images/features/DSC_6429-Pano-Edit-2.jpg"},
                  {"property": "og:title", "content": "Landscape & Nature Photography | Boundless Journey"},
                  {"property": "og:url", "content": `www.portfolio.boundless-journey.com`},
                  {"property": "og:description", "content": "Landscape & Nature Photography | Boundless Journey"},
                  {"property": "og:type", "content": "website"}
              ]}
            />
        </div>
      ) 
    } else {
      return (
        <div>
          <Helmet
            htmlAttributes={{"lang": "en"}} // amp takes no value
            title="Landscape & Nature Photography | Boundless Journey"
            titleTemplate="Landscape & Nature Photography | Boundless Journey"
            defaultTitle="Landscape & Nature Photography | Boundless Journey"
            meta={[
                {"name": "twitter:image", "content": "http://www.boundless-journey.com/portfolio/images/features/DSC_6429-Pano-Edit-2.jpg"},
                {"name": "thumbnail", "content": "http://www.boundless-journey.com/portfolio/images/features/thumbnails/DSC_6429-Pano-Edit-2_thumb.jpg"},
                {"property": "og:image", "content": "http://www.boundless-journey.com/portfolio/images/features/DSC_6429-Pano-Edit-2.jpg"},
                {"property": "og:title", "content": "Landscape & Nature Photography | Boundless Journey"},
                {"property": "og:url", "content": `www.portfolio.boundless-journey.com`},
                {"property": "og:description", "content": "Landscape & Nature Photography | Boundless Journey"},
                {"property": "og:type", "content": "website"}
            ]}
          />
          <div className="box" style={search.search}>
            <div className="container-1">
              <span className="icon"><i className="fa fa-search"></i></span>
              <input type="search" id="search" placeholder="Search Tags" onChange={(x) => {this.filterByTag(x) }}/>
            </div>
          </div>
          <ReactRpg imagesArray={filterImages} columns={[ 1, 2, 4 ]} padding={10} ></ReactRpg>            

        <Lightbox
        currentImage={currentImage}
        images={ images }
        isOpen={this.state.lightboxIsOpen}
        onClickPrev={this.gotoPrevious}
        onClickNext={this.gotoNext}
        onClickImage={this.handleClickImage}
        onClose={this.closeLightbox}
        showCloseButton={true}
        preloadNextImage={true}
        theme={theme}
        width={"100%"}
        backdropClosesModal={false}
        showImageCount={false}
      />
      </div>
      )
    }
  }
}


export default Radium(Gallery);

const search = {
  search: {
    marginTop: -40,
    position: 'absolute',
    backgroundColor: 'rgb(147,157,157)',

    '@media (max-width: 2000px) and (min-width: 768px)': {
      marginLeft: '60%',
    },
    '@media (max-width: 767px) and (min-width: 320px)': {
      marginLeft: '35%',
      width: '100px',
    },
    '@media (max-width: 767px) and (min-width: 320px) and (orientation: portrait)': {
      marginLeft: '35%',
      width: '100px',
    },
    '@media (max-width: 350px) and (min-width: 320px) and (orientation: portrait)': {
      marginLeft: '32%',
      width: '100px',
    },
    '@media (max-width: 767px) and (min-width: 320px) and (orientation: landscape)': {
      marginLeft: '50%',
      width: '160px',
    },
    '@media (max-width: 600px) and (min-width: 320px) and (orientation: landscape)': {
      marginLeft: '45%',
      width: '140px',
    },
  },
}

const theme = {
  // container
  container: { 
    // background: 'rgba(255, 255, 255, 0.9)',
    background: 'rgba(0, 0, 0, 0.9)',
    height: '100%',
    // top: '100px',
    padding: '0px',
    margin: '0px'
  },

  // arrows
  arrow: {
    opacity: 0.6,
    transition: 'opacity 200ms',

    ':hover': {
      opacity: 1,
    },
  },
  arrow__size__medium: {
    height: 40,
    marginTop: -20,

    '@media (min-width: 768px)': {
      height: 70,
      padding: 15,
    },
  },
  arrow__direction__left: { marginLeft: -10 },
  arrow__direction__right: { marginRight: -10 },

  // header
  close: {
    fill: '#D40000',
    opacity: 0.6,
    transition: 'all 200ms',

    ':hover': {
      opacity: 1,
    },
  },
  // header
  header:{
    height:'0'
  },
  
  // footer
  footer: {
    height:'0',
    color: 'black',
    paddingLeft:'10px'
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
