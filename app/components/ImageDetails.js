import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Radium from 'radium';
import Styles  from '../styles';

const ImagePreview = ({ imageDetails, style }) => {
  console.log(imageDetails)
  
  function formatDate(dateString) {
    var date = new Date(dateString);
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear();
  }

  const handleEmailClick = (e) => {
    var params = e.target.dataset.message.split(",")
    window.location = `#/contact/${params[0]}/${params[1]}`
  }

  return (
    <div style={style.container}>
      <div style={style.sidebar}>
        <img src={imageDetails.url}  style={style.modalImage} alt={imageDetails.url}  />
        <p>sidebar content here</p>
      </div>
      <div style={style.content}>
        <p><b>{imageDetails.name}</b></p>
        <p>{imageDetails.description}</p>
        <div>
          <select className="form-control" id="price_tag">
            <option value="" style={{display: "none"}}>Prices and Sizes</option>
            {
              imageDetails.settings.map((setting, index) => {
                return <option key={index} value={setting.price}>{setting.size} - ${setting.price}</option>
              })                        
            }
          </select>   
          <button className={"hidden"}>Buy it!</button>               
          <button style={{marginTop: '10px'}} type={"button"} className={"btn btn-success"} data-message={[imageDetails.id, imageDetails.name]} onClick={handleEmailClick}>Contact me about this photo</button>
        </div>

        <br/>
        <br/>
        <p style={{fontSize: '20px'}}><b>Photo Info</b></p>
        <ul style={{listStyleType: 'none', textAlign: 'left', padding:'0'}}>
          <li><b>Copyright:</b> {imageDetails.copyright}</li>
          <li><b>Exposure Time:</b> {imageDetails.exposure_time}</li>
          <li><b>Focal Length:</b> {imageDetails.focal_length}</li>
          <li><b>Aperture:</b> f/{imageDetails.fstop}</li>
          <li><b>ISO:</b> {imageDetails.iso}</li>
          <li><b>Camera:</b> {imageDetails.model}</li>
          <li><b>Date Taken:</b> {formatDate(imageDetails.date)}</li>
        </ul>
      </div>
    </div>
  )
};

class ImageDetails extends React.Component {
  constructor(){
    super();
    this.state = {
      id: null,
      loading: true,
      imageDetails: {},
    }
  }

  componentDidMount(){
    const {id} = this.props.params;
    const apiUrl = process.env.API_URL;
    const path = `${apiUrl}/photos/${id}`
    axios.get(path)
      .then((response) => {
        console.log(response.data)
        this.setState({
          imageDetails: response.data,
          loading: false,
        })
      })
      .catch((error) => {
        console.log("Error in Image Details:", error);
      });
  }

  componentWillReceiveProps(nextProps){
    //handle new props
  }

  render(){
    const { imageDetails, loading} = this.state;

    if(loading){
      return <p>Loading</p>
    } else {
      return (
        <div>
          <ImagePreview style={Styles} imageDetails={imageDetails}/>
        </div>
      )
    }
  }
}

export default Radium(ImageDetails);