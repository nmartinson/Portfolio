import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { ReactRpg } from 'react-rpg';
import Gallery from './Gallery';
import Styles  from '../styles';
import styler from 'react-styling'
import Radium from 'radium';



function getIndex(value, arr, prop) {
    for(var i = 0; i < arr.length; i++) {
        if(arr[i][prop] === value) {
            return i;
        }
    }
    return -1; //to handle the case where the value doesn't exist
}


class GalleriesContainer extends React.Component {
  constructor(){
    super();
    this.state = {
      primaryPhotos: [],
      loading:true
    }
  }

  openModal(url) {
    var index = getIndex(url, this.state.primaryPhotos, 'url');
    var photo = this.state.primaryPhotos[index];
    window.location = `#/photoset/${photo.id}/title/${photo.title}`
  }

  componentDidMount(){
    const apiUrl = process.env.API_URL;
    const path = `${apiUrl}/galleries`
    axios.get(path)
      .then((response) => {
        var galleries = [];
        for(var i=0; i< response.data.length; i++){
          galleries[i] = {
            clickHandler: (x) => {this.openModal(x) },
            id: response.data[i].id,
            url: response.data[i].cover_image,
            title: response.data[i].name,
            cover_is_landscape: response.data[i].cover_is_landscape
            }
        }
          this.setState({
            primaryPhotos: galleries,
            loading: false
          })

      })
      .catch((error) => {
        console.log("Error in Galleries:", error);
      });
  }

  componentWillReceiveProps(nextProps){
    //handle new props
  }
  render(){
    const { primaryPhotos, loading } = this.state;

    if(loading){
      return <p>Loading</p>
    } else {
      return (
                  <ReactRpg  imagesArray={primaryPhotos} columns={[ 1, 2, 3 ]} padding={10} ></ReactRpg>            
      )
    }
  }
}

export default GalleriesContainer;


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


