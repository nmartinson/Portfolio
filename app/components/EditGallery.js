import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link, Router } from 'react-router';
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

// const ImagePreview = ({ url, name, style, description, settings }) => {
//   const handleSelectedChange = (e) => {
//     let selected = e.target.checked;
//     settings[e.target.id].selected = settings;
//     this.setState({
//       settings:settings
//     })
//   }

//   return (
//     <div style={style.container}>
//       <div style={style.sidebar}>
//         <img src={url}  style={style.modalImage} alt={url}  />
//         <p>sidebar content here</p>
//       </div>
//       <div style={style.content}>
//         <h1>{name}</h1>
//         <h1>Description</h1>
//         <p>{description}</p>
//       </div>
//     </div>
//   )
// };

function getIndex(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}


class EditGallery extends React.Component {
  constructor(){
    super();
    this.state = {
      id: null,
      title: "",
      loadinggallerys: true,
      loading: true,
      imageList: {},
      showOrder: false,
      imageOrder: {},
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

  handleGalleryDescriptionChange(e) {
    let description = e.target.value;
    var gallery = this.state.gallery;
    gallery.description = description;
    this.setState({ gallery: gallery });
  }

  handleGalleryNameChange(e) {
    let name = e.target.value;
    var gallery = this.state.gallery;
    gallery.name = name;
    this.setState({ gallery: gallery });
  }

  handleDelete(e) {
    e.preventDefault();
    const { gallery} = this.state;
    const apiUrl =process.env.API_URL;
    const path = `${apiUrl}/gallery/${gallery.id}`

     axios.delete(path)
      .then( function(response) {
        console.log(response)
        if(response.data == 200)
        {
          console.log('Delete Success')
          window.location = '/featured'


        }

      })
      .catch((error) => {
        console.log("Error in Delete gallery Submit: ", error);
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    const {gallery} = this.state;
    const apiUrl =process.env.API_URL;
    const path = `${apiUrl}/gallery`

      axios.put(path,
      {
          id: gallery.id,
          name: gallery.name,
          description: gallery.description,
          protected: gallery.isProtected,
          cover_photo_id: gallery.galleryCoverPhotoId
      })
      .then( function(names) {
        console.log('Success')
        window.location.reload()
      })
      .catch((error) => {
        console.log("Error in Edit gallery Submit: ", error);
      });
  }

  // saveOrder(e) {
  //   e.preventDefault();
  //   const { gallery, isFeaturedImage, imageOrder, selectedGalleries} = this.state;
  //   const apiUrl =process.env.API_URL;
  //   const path = `${apiUrl}/gallerys`
  //   console.log(imageOrder)

  //   imageOrder.map(function(image, index){
  //     axios.put(path, 
  //     {
  //       image:{
  //         order: index + 1,
  //         gallery_id: image.id,
  //         name: image.name,
  //         uniqueFileName: image.name,
  //         settings: image.settings,
  //         isFeatured: true,
  //         description: image.description, 
  //         galleries: selectedGalleries 
  //       },
  //     })
  //     .then( function(names) {
  //       console.log('Success')
  //     })
  //     .catch((error) => {
  //       console.log("Error in update order: ", error);
  //     });
  //   })
  // }

  componentDidMount(){
    const {id} = this.props.params;
    this.getGalleryDetails(id);
  }

  configureClickHandler(image, index, url) {  
    image[index].clickHandler = () => {this.openModal(url)};
  }

  getGalleryDetails(id){
    const apiUrl =process.env.API_URL;
    const path = `${apiUrl}/gallery/${id}`
    axios.get(path)
      .then((response) => {
        var gallery = response.data;
        console.log('GALLERY');
        console.log(gallery);
        this.setState({
          gallery: gallery,
          loading: false
        })
      })
      .catch((error) => {
        console.log("Error in edit gallery get Galleries:", error);
      });
  }

  render(){
    const {loading, showOrder, gallery} = this.state;
    if(loading){
      return <p>Loading</p>
    } else {
      return (
        <div>
          <button onClick={(x) => {this.toggleSection(x)}}>Toggle View</button>
          <div>
          { showOrder ?
            <div>

            </div>
          : null }
          </div>
          <div>
                <div >
                  <form>
                    <div>
                      <label name="gallery_name" htmlFor="gallery_name">Gallery Name</label>
                      <input type="text" value={gallery.name != null ? gallery.name : null} onChange={(x) => {this.handleGalleryNameChange(x) }} title="Gallery Name"/>
                      <label name="gallery_description" htmlFor="gallery_description">Gallery Description</label>
                      <input type="text" value={gallery.description != null ? gallery.description : null} onChange={(x) => {this.handleGalleryDescriptionChange(x) }} title="Gallery Description"/>
    
                    </div>
                  <button className="btn btn-default" type="button" onClick={(x) => {this.handleSubmit(x)}}>Save</button>
                  <button className="btn btn-default" type="button" onClick={(x) => {this.handleDelete(x)}}>Delete</button>
                  </form>
                </div>   
          </div>    
      </div>
      )
    }
  }
}

export default Radium(EditGallery);
                  // <ImagePreview style={Styles} name={gallery.name} description={gallery.description} settings={settings} url={gallery != null ? gallery.url : "" }/>

            // {!showOrder ? <ReactRpg imagesArray={imageList} columns={[ 1, 2, 3 ]} padding={10}></ReactRpg> : null}

            // <Sortable onSort={(x) => {this.handleSort(x)}}>
            //     {
            //       imageList.map(function(image, index){
            //         return(
            //           <SortableImage onclick={(x) => {this.openModal(x)}} url={image.url} order={index} key={index} sortData={image}/>
            //         )
            //       })
            //     }
            //   </Sortable>
                          // <button onClick={(x) => {this.saveOrder(x)}}>Save Order</button>


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