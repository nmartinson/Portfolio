import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { ReactRpg } from 'react-rpg';
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

class EditPhotoSettings extends React.Component {
  constructor(){
    super();
    this.state = {
      id: null,
      loading: true,
      settings: []
    }

  }

  handleSelectedSettingsChange(e){
    let selected = e.target.checked;
    var {settings} = this.state;
    if(selected){
      settings.push({
        size: settings[e.target.id].size,
        price: settings[e.target.id].price,
        medium: settings[e.target.id].medium,
        dealer: settings[e.target.id].dealer,
        dealer_cost: settings[e.target.id].dealer_cost,
        has_free_shipping : false,
        tempId: e.target.id
      })
    } else {
      settings.splice(e.target.tempId, 1);
    }

    settings[e.target.id].selected = selected;
    this.setState({ settings: settings });
   }

  handleShippingChange(e){
    let shipping = e.target.checked;
    var settings = this.state.settings;
    settings[e.target.id].has_free_shipping = shipping;
    this.setState({ settings: settings });
  }

  handleDealerChange(e){
    let dealerName = e.target.value;
    var settings = this.state.settings;
    settings[e.target.id].dealer = dealerName;
    this.setState({ settings: settings });
  }

  handlerDealerCostChange(e){
    let dealerCost = e.target.value;
    var settings = this.state.settings;
    settings[e.target.id].dealer_cost = dealerCost;
    this.setState({ settings: settings });
  }

  handleSettingPriceChange(e){
    let price = e.target.value;
    var settings = this.state.settings;
    console.log(price)
    settings[e.target.id].price = price;
    this.setState({ settings: settings });
  }

  handleSettingSizeChange(e){
    let size = e.target.value;
    var settings = this.state.settings;    
    settings[e.target.id].size = size;
    this.setState({ settings: settings });
  }
  
  handleMediumChange(e) {
    let medium = e.target.value;
    var settings = this.state.settings;
    settings[e.target.id].medium = medium;
    this.setState({ settings: settings });
  }

  handleAddSetting(e){
    var settings = this.state.settings; 
    var settingsLength = settings.length;
    //check if last setting is still null

    if(settingsLength == 0 || settings[settingsLength - 1].size != null)
    {
      settings.push({size: null, price:null, medium: null}); 
      this.setState({settings: settings})
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { files} = this.state;
    const { settings } = this.state;
    const apiUrl = API_URL;
    const path = `${apiUrl}/settings`

     axios.put(path, 
      {
        settings: settings
      })
      .then( function(names) {
        console.log('Success')
      })
      .catch((error) => {
        console.log("Error in Edit Photo Settings: ", error);
      });
  }

  componentDidMount(){
    const apiUrl = API_URL;
    var path = `${apiUrl}/mediums`
    var mediums = [];
    axios.get(path)
      .then((response) => {
        mediums = response.data;
        this.setState({
          mediums: mediums,
          loading: false
        });
      })
      .catch((error) => {
        console.log("Error in Image Settings:", error);
      });

    path = `${apiUrl}/settings`
    axios.get(path)
      .then((response) => {
        var settings = response.data;
        this.setState({
          loading: false,
          settings: settings
        })
      })
      .catch((error) => {
        console.log("Error in edit:", error);
      });
  }

  render(){
    const { loading,settings, mediums} = this.state;
    if(loading){
      return <p>Loading</p>
    } else {
      return (
        <div>
          <div >
            <form>
              <div>
                <div>
                {
                  settings.map(function(setting, index){
                    return(
                      <div key={"div_"+index}>
                        <label key={"label_size_" + index} name="size" htmlFor="size">Size</label>
                        <input key={"input_size_" + index} id={index} value={setting.size != null ? setting.size : null} type="text" onChange={(x) => {this.handleSettingSizeChange(x) }} title="Size"/>
                        <label key={"label_price_" + index} name="price" htmlFor="price">Price</label>
                        <input key={"input_price_"+index} id ={index} value={setting.price != null ? setting.price : null} type="decimal" onChange={(x) => {this.handleSettingPriceChange(x) }} title="Price"/>
                        <select value={setting.medium} className="form-control" style={{width: "auto"}} id={index} onChange={(x) => {this.handleMediumChange(x)}}>
                          <option value="" style={{display: "none"}}>Medium</option>
                          {
                            mediums.map((medium, index) => {
                              return <option key={index} value={medium}>{medium}</option>
                            })                        
                          }
                        </select> 
                        <label key={"label_has_free_shipping_" + index} name="shipping" htmlFor="shipping">Has Free Shipping</label>
                        <input checked={setting.has_free_shipping != null ? setting.has_free_shipping : false} key={"input_has_free_shipping_" + index} id={index} type="checkbox" onClick={(x) => {this.handleShippingChange(x) }}/>
                        <label key={"label_dealer_" + index} name="dealer" htmlFor="dealer">Dealer</label>
                        <input key={"input_dealer_" + index} id={index} value={setting.dealer != null ? setting.dealer : null} type="text" onChange={(x) => {this.handleDealerChange(x) }} title="dealer"/>
                        <label key={"label_dealer_cost" + index} name="size" htmlFor="size">Dealer Cost</label>
                        <input key={"input_dealer_cost" + index} id={index} value={setting.dealer_cost != null ? setting.dealer_cost : null} type="text" onChange={(x) => {this.handlerDealerCostChange(x) }} title="dealer_cost"/>
                        <br/>
                        <br/>
                        <br/>
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
        </div>
      )
    }
  }
}

export default Radium(EditPhotoSettings);