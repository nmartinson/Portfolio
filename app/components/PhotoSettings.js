import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { ReactRpg } from 'react-rpg';
import Gallery from './Gallery';

class PhotoSettings extends React.Component {
  constructor(){
    super();
    this.state = {
      primaryPhotos: [],
      loading:true
    }

  }
  componentDidMount(){
    const apiUrl = process.env.API_URL;
    const path = `${apiUrl}/galleries`
    axios.get(path)
      .then((response) => {
        var galleries = response.data;
        for(var i=0; i< galleries.length; i++){
          this.setState({
            primaryPhotos: this.state.primaryPhotos.concat([{url:galleries[i].cover_image, id: galleries[i].id, title: galleries[i].name}]),
          })
        }
        this.setState({ loading: false })
      })
      .catch((error) => {
        console.log("Error in Photoset:", error);
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
        <div>
          <label name="size" htmlFor="size">Size</label>
          <input id={idx} type="text" onChange={(x) => {this.handleSettingSizeChange(x) }} title="Size"/>
          <label name="price" htmlFor="price">Price</label>
          <input id={idx} type="decimal" onChange={(x) => {this.handleSettingPriceChange(x) }} title="Price"/>
          <button className="btn btn-default" type="button" onClick={(x) => {this.handleAddSetting(x)}}>Add Setting</button>
        </div>
      )
    }
  }
}

export default PhotoSettings;
