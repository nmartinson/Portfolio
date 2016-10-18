import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { ReactRpg } from 'react-rpg';
import Gallery from './Gallery';

class GalleriesContainer extends React.Component {
  constructor(){
    super();
    this.state = {
      galleries: "",
      primaryPhotos: [],
      loading:true
    }

  }
  componentDidMount(){
    const apiUrl = process.env.API_URL;
    const path = `${apiUrl}/galleries`
    axios.get(path)
      .then((response) => {
        console.log(response.data)
        var galleries = response.data;
        for(var i=0; i< galleries.length; i++){
          var photoHTML = "<div className='image transition'>";
          photoHTML += "<a href='photoset.html?id=" + galleries[i].id + "?title=" + galleries[i].name + "'><img style='overflow:hidden;' src='" + galleries[i].cover_image + "' id='image" + i + "' /></a>";
          photoHTML += "<h2 style='width:800px; max-width:" + window.innerWidth + ";'>" + galleries[i].name + "</h2></div>";

          this.setState({
            primaryPhotos: this.state.primaryPhotos.concat([{url:galleries[i].cover_image, id: galleries[i].id, title: galleries[i].name}]),
            galleries: this.state.galleries + photoHTML,
          })
        }
        this.setState({
          loading: false
        })
      })
      .catch((error) => {
        console.log("Error in Photoset:", error);
      });



    // axios.get("https://api.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=968c875599356c070d22b356129cd3e4&user_id=132620238%40N05&primary_photo_extras=geo&format=json&nojsoncallback=1")
    //   .then((response) => {
    //     var photoHTML = "";

    //     for(var i=0; i< response.data.photosets.photoset.length; i++){
    //       var set = response.data.photosets.photoset[i];
    //       //elements += "<a href='photoset.html?id=" + set.id + "?title=" + set.title._content + "' className='item'>" + set.title._content + "<span className='ui label'>" + set.photos + "</span></a>";
    //       var primaryPhoto = 'https://farm' + set.farm + '.staticflickr.com/' + set.server + '/' + set.primary + '_' + set.secret + '_c.jpg';
    //       // construct primary album photo URL
    //       var photoHTML = "<div className='image transition'>";
    //       photoHTML += "<a href='photoset.html?id=" + set.id + "?title=" + set.title._content + "'><img style='overflow:hidden;' src='" + primaryPhoto + "' id='image" + i + "' /></a>";
    //       photoHTML += "<h2 style='width:800px; max-width:" + window.innerWidth + ";'>" + set.title._content + "</h2></div>";
    //       // <Gallery primaryPhoto={primaryPhoto} id={set.id} title={set.title._content} count={i}></Gallery>
    //       this.setState({
    //         primaryPhotos: this.state.primaryPhotos.concat([{url:primaryPhoto, id: set.id, title: set.title._content}]),
    //         galleries: this.state.galleries + photoHTML,
    //       })
    //     }
    //     this.setState({
    //       loading:false
    //     })
    //   })
    //   .catch((error) => {
    //     console.log("Error ", error);
    //   })

        //   var elements = '';
        //   var photoHTML = '';
        //   $.each(data.photosets.photoset, function (i, set) {
        //     // get the primary photos location and other data
        //     locations.push({
        //       lat: set.primary_photo_extras.latitude,
        //       lon: set.primary_photo_extras.longitude,
        //       id: set.id,
        //       title: set.title._content,
        //       index: i
        //     });
        //     placeLocationMarkers(locations[i]);

        //       elements += "<a href='photoset.html?id=" + set.id + "?title=" + set.title._content + "' class='item'>" + set.title._content + "<span class='ui label'>" + set.photos + "</span></a>";
            
        //     var primaryPhoto = 'https://farm' + set.farm + '.staticflickr.com/' + set.server + '/' + set.primary + '_' + set.secret + '_c.jpg';

        //     // construct primary album photo URL
        //     var photoHTML = "<div class='image transition hidden'>";
        //     photoHTML += "<a href='photoset.html?id=" + set.id + "?title=" + set.title._content + "'><img style='overflow:hidden;' src='" + primaryPhoto + "' id='image" + i + "' /></a>";
        //     photoHTML += "<h2 style='width:800px; max-width:" + window.innerWidth + ";'>" + set.title._content + "</h2></div>";
        //     $('#page-wrap').append(photoHTML);
        //   });
        //   $('#photoMenu').append(elements);
        // $('.sequenced.images .image')
        //   .transition({
        //     animation: 'scale',
        //     interval: 250
        //   });
        // });
        // $('#image0').waitUntilExists(setUpSizes);
  }

  componentWillReceiveProps(nextProps){
    //handle new props
  }
  render(){
    const { galleries, primaryPhotos, loading } = this.state;
    function createMarkup() { return {__html: galleries}; };

    if(loading){
      return <p>Loading</p>
    } else {
      return (
        // <div className="content" dangerouslySetInnerHTML={createMarkup()}></div>
        <Gallery primaryPhotos={primaryPhotos}></Gallery>

      )
    }
  }
}

export default GalleriesContainer;
