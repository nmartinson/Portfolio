import React from 'react';

class HiddenImages extends React.Component {
  constructor(){
    super();
    this.state = {
      loading: true,
      images: []
    }
  }

  componentWillReceiveProps(nextProps){
    console.log('recieve props ')
    console.log(nextProps)
    this.setState({images:nextProps.images});
  }

  componentDidMount(){
  }

  render(){
    const images = this.state.images;
    console.log('RENDER')
    console.log(images)

    return(
      <div>
      {
        images.map(function(image,index){
          return (
            <img src={image.url} hidden alt={image.tags}/>
            )
        })
      }
      </div>
    )
  }
}

export default HiddenImages;


