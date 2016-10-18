import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { ReactRpg } from 'react-rpg';

const previewStyles = {
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  position: 'fixed',
  border: 'solid #1a1a1a 10px',
  zIndex: '3',
};

const ImagePreview = ({ url }) => <img src={url} style={previewStyles} alt={url} width="50%" height="auto" />;

const Gallery = ({primaryPhotos}) => {
  var photos = [];

  console.log(primaryPhotos)

  return (
    <div className='image transition'>
    {
      primaryPhotos.map(function(photo, idx) {
            return (<div><Link key={idx} to={`/photoset/${photo.id}/title/${photo.title}`}>
                    <img src={photo.url}/>
                  </Link></div>)
        }.bind(this))
    }
    </div>
  )
}

export default Gallery;

// class Gallery extends React.Component {
//   constructor(){
//     super();
//     this.state = {
//       primaryPhotos: this.props.primaryPhotos,
//       loading:true
//     }

//   }
//   componentDidMount(){
//     const { id, title } = this.props.params;
//     console.log("props " + this.props)
//     this.setState({
//       loading:false
//     })
//   }

//   componentWillReceiveProps(nextProps){
//     //handle new props
//   }

//   imagePopup(url, obj) {
//     this.setState({ popUp: url });
//     console.log(obj);
//     setTimeout(() => this.setState({ popUp: false }), 1000);
//   }

//   // render(){
//   //   var photoHTML = "<div className='image transition'>";
//   //   photoHTML += "<a href='photoset.html?id=" + set.id + "?title=" + set.title._content + "'><img style='overflow:hidden;' src='" + primaryPhoto + "' id='image" + i + "' /></a>";
//   //   photoHTML += "<h2 style='width:800px; max-width:" + window.innerWidth + ";'>" + set.title._content + "</h2></div>";
//   //   const images = [
//   //     {
//   //       url: "https://farm3.staticflickr.com/2937/14197491985_58036d5b0e_z.jpg",
//   //       clickHandler: this.imagePopup.bind(this) 
//   //     },
//   //     {
//   //       url: "https://farm3.staticflickr.com/2937/14197491985_58036d5b0e_z.jpg",
//   //       clickHandler: (url, obj) => { console.log(obj) }
//   //     }
//   //   ];
//   //   return (
//   //     <div>
//   //       { this.state.popUp !== false ? <ImagePreview url={this.state.popUp} /> : null }

//   //       <ReactRpg imagesArray={images} columns={[ 1, 2, 3 ]} padding={10} />
//   //     </div>
//   //   )
//   // }

//   render(){
//       const { primaryPhotos, loading} = this.state;
//       var photos = [];
//       if(loading){
//       return <p>Loading</p>
//     } else {
//       for (var i = 0; i < primaryPhotos.length; i++) {
//         photos.push(<Link to={`/photoset/${primaryPhotos[i].id}/title/${primaryPhotos[i].title}`}>
//                       <img style='overflow:hidden;' src={primaryPhotos[i].url}/>
//                     </Link>);
//       }
//       // photoHTML += "<a href='photoset.html?id=" + set.id + "?title=" + set.title._content + "'><img style='overflow:hidden;' src='" + primaryPhoto + "' id='image" + i + "' /></a>";
//       // photoHTML += "<h2 style='width:800px; max-width:" + window.innerWidth + ";'>" + set.title._content + "</h2></div>";

//       return (
//         <div className='image transition'>
//         {indents}
//           // <Link to={`/photoset/${id}/title/${title}`}>
//           //   <img style='overflow:hidden;' src={primaryPhotoSRC}/>
//           // </Link>
//         </div>
//       )
//     }
//   }
// }

// export default Gallery;
