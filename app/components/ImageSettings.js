import React from 'react';
import Radium, { Style, StyleRoot } from "radium";
import { LinkContainer } from 'react-router-bootstrap';
import { IndexLink, Link, History } from 'react-router';
import axios from 'axios';

var mediumSearch = '';

class ImageSettings extends React.Component {
  constructor() {
    super();

    this.state = {
      imageDetails: null,
      style: null,
      filterSettings: [],
      loading:true
    }

    this.handleMediumChange = this.handleMediumChange.bind(this);
  }

  componentDidMount(){
    const apiUrl =process.env.API_URL;
    const path = `${apiUrl}/mediums`
    var mediums = [];
    axios.get(path)
      .then((response) => {
        mediums = response.data;
        this.setState({
          imageDetails : this.props.imageDetails,
          mediums: mediums,
          loading: false
        });
      })
      .catch((error) => {
        console.log("Error in Image Settings:", error);
      });
  }

  handleMediumChange(e) {
    mediumSearch = e.target.value.toLowerCase();
    var filterSettings = [];
    if(mediumSearch != ""){
      filterSettings = this.state.imageDetails.settings.filter(function(el){
        return el.medium.toLowerCase() == mediumSearch
      });
    } else {
      filterSettings = this.state.imageDetails.settings;
    }   
    this.setState({
      medium: medium,
      filterSettings: filterSettings,
      settingsLoading: true,
      loading:false
    });

  }

  render() {
    const { style, imageDetails, filterSettings,mediums, loading} = this.state;

    if(loading)
    {
      return(<div>Loading</div>)
    } else {
      return (
        <div>
          <p style={{fontSize: '20px'}}><b>{imageDetails.name}</b></p>
          <p>{imageDetails.description}</p>
          <select className="form-control" id="medium" style={{width: "auto"}} onChange={this.handleMediumChange}>
            <option value="" style={{display: "none"}}>Medium</option>
            {
              mediums.map((medium, index) => {
                return <option key={index} value={medium}>{medium}</option>
              })                        
            }
          </select>  
          <select className="form-control" id="price_tag" style={{width: "auto"}}>
            <option value="" style={{display: "none"}}>Prices and Sizes</option>
            {
              filterSettings.map((setting, index) => {
                return <option key={index} value={setting.price}>{setting.size} - ${setting.price}</option>
              })                        
            }
          </select>   
          <button className={"hidden"}>Buy it!</button>    
          <LinkContainer to={`/contact/${imageDetails.id}/${imageDetails.name}`}>
            <button style={{marginTop: '10px', marginBottom: "10px", padding:"5px", fontSize:"12px"}} type={"button"} className={"btn btn-success"}>Contact me about this photo</button>
          </LinkContainer>          
        </div>
      )
    }
  }
}

export default Radium(ImageSettings);