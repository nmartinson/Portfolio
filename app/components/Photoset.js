import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { ReactRpg } from 'react-rpg';
import Modal from 'react-modal';


const previewStyles = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position: 'fixed',
  border: 'solid #1a1a1a 10px',
  zIndex: '3',
};

const ImagePreview = ({ url }) => <img src={url}  alt={url} width="50%" height="auto" />;

class Photoset extends React.Component {
  constructor(){
    super();
    this.state = {
      imageURLs: [],
      id: null,
      title: "",
      loading: true,
      imageDetails: [],
      imageList: {}
    }

  }
  componentDidMount(){
    const { id, title } = this.props.params;
    const apiUrl = process.env.API_URL;
    console.log(this.props.params)
    const path = `${apiUrl}/gallery?gallery_id=${id}`
    console.log(path)
    axios.get(path)
      .then((response) => {
        console.log(response.data)
        this.setState({
          imageList: response.data,
          loading: false,
          id: id,
          title: title,
          modalIsOpen: false,
        })
      })
      .catch((error) => {
        console.log("Error in Photoset:", error);
      });

    //     const images = [
    //   {
    //     url: "https://farm3.staticflickr.com/2937/14197491985_58036d5b0e_z.jpg",
    //     prices: [{price: 10.00, size:"10x15"},{price: 100.00, size:"20x30"}],
    //     clickHandler: (x) => {this.openModal(x) }
    //   },
    //   {
    //     url: "http://www.mountainprofessor.com/images/Mountain-Ranges-Colorado-2.jpg",
    //     prices: [{price: 1.00, size:"10x15"},{price: 1000.00, size:"20x30"}],
    //     clickHandler: ( x) => { this.openModal(x) }
    //   }
    // ];

    // this.setState({
    //   imageURLs: [],
    //   id: id,
    //   title: title,
    //   modalIsOpen: false,
    //   imageList: images
    // })

    // var path = " https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=0412d3495604ac32c3ada71d433053f7&photoset_id=" + id + "&user_id=132620238%40N05&format=json&nojsoncallback=1&auth_token=72157671780663984-a1ac7df6408647c8&api_sig=1a88b277098875c5704163ac757adf01"
    // axios.get(path)
    //   .then((response) => {
    //     console.log(response)
    //     var photos = response.data.photoset.photo;
    //     for(var i = 0; i < photos.length; i++){
    //       console.log(photos[i].id)

    //       var photoPath = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=0412d3495604ac32c3ada71d433053f7&photo_id=" + photos[i].id + "&format=json&nojsoncallback=1&auth_token=72157671780663984-a1ac7df6408647c8&api_sig=53f15d4b5436a810276635c006003dbb"
    //       axios.get(photoPath)
    //         .then((response) => {
    //           console.log(response)
    //         })
    //     }
    //     //console.log(response)
    //       this.setState({
    //         imageURLs: response,
    //         loading: false
    //       })
    //   })
    //   .catch((error) => {
    //     console.log("Error ", error);
    //   })
  }

  componentWillReceiveProps(nextProps){
    //handle new props
  }

  openModal() {
    this.setState({modalIsOpen: true, imageDetails: this.state.imageList[0]});
        //console.log(this.state.imageList)

  }

  afterOpenModal() {
    this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render(){
    const {imageURLs, id, title, count, loading, imageDetails, imageList} = this.state;
    if(loading){
      return(<p>Loading</p>)
    } else {

      console.log("details")
      console.log(imageList)
          console.log(this.state)

      // const images = imageURLs.map(function(url, idx){
      //   return url;
      // }.bind(this));
        return (
          <div>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={(x) => this.afterOpenModal(x)}
              onRequestClose={(x) => this.closeModal(x)}
              contentLabel="Example Modal" 
            >
              <h2 ref="subtitle">Image Title</h2>
              <div>
                <ImagePreview url={imageDetails != null ? imageDetails.url : "" } />
                <form>
                  <div className="form-group">
                    <label name="price_tag" htmlFor="price_tag">Gear Tag</label>
                    <select className="form-control"  id="price_tag">
                      <option hidden></option>
                      {

                        imageDetails.map((image, index1) => {
                          image.settings.map((setting, index) => {
                            return <option key={index} value={setting.price}>{setting.size} - {setting.price}</option>
                          })
                        })
                        
                      }
                    </select>                  
                    <button>Buy it!</button>
                  </div>
                </form>
              </div>
            </Modal>

            <ReactRpg imagesArray={imageList} columns={[ 1, 2, 3 ]} padding={10} />
          </div>
        )
      }
  }
}

export default Photoset;
