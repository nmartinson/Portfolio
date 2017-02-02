import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Radium, { Style, StyleRoot } from "radium";
import Styles  from '../styles';
import Helmet from "react-helmet";
import styler from 'react-styling'
import { Grid, Cell } from 'radium-grid';
import ImageMeta from './ImageMeta';
import ImageSettings from './ImageSettings';
import Social from './SocialComponent';
var MediaQuery = require('react-responsive');

const styles = {
  cell:{
    paddingBottom: "10px"
  },
  outerDiv: {
    paddingTop:'25px'
  }
}

const ImagePreview = ({ imageDetails, style }) => {
  if(imageDetails.is_landscape == true){
    return (
      <div style={styles.outerDiv}>
        <StyleRoot>
          <Grid>
            <Cell align="left" width="1" mediumWidth="1" smallWidth="1" style={styles.cell}>
              <div>
                <img id="image" src={imageDetails.url}  style={[style.landscapeImage]} alt={imageDetails.url}/>
              </div>
            </Cell>
            <Grid>
              <Cell mediumWidth="1/2" smallWidth="1" align="left">
                <ImageSettings imageDetails={imageDetails}/>
              </Cell>
              <Cell mediumWidth="1/2" smallWidth="1" align="left">
                <div>
                  <ImageMeta imageDetails={imageDetails}/>
                  <Social url={String(window.location)} title={imageDetails.name} imageUrl={imageDetails.url}/>
                </div>
              </Cell>
            </Grid>
          </Grid>
        </StyleRoot>
       </div> 
    )
  } else {
    return (
      <div  style={styles.outerDiv}>
      <StyleRoot>
          <MediaQuery query='(orientation: portrait)'>
            <StyleRoot>
              <Grid>
                <Cell align="left" width="1" mediumWidth="1" smallWidth="1" style={styles.cell}>
                  <div>
                    <img id="image" src={imageDetails.url}  style={style.landscapeImage} alt={imageDetails.url}/>
                  </div>
                </Cell>
              <Grid>
                <Cell mediumWidth="1" smallWidth="1" align="left">
                  <ImageSettings imageDetails={imageDetails}/>
                  </Cell>
                  <Cell mediumWidth="1" smallWidth="1" align="left">
                  <div>
                    <ImageMeta imageDetails={imageDetails}/>
                    <Social url={String(window.location)} title={imageDetails.name} imageUrl={imageDetails.url}/>                  
                  </div>
                </Cell>
              </Grid>
              </Grid>
            </StyleRoot>
          </MediaQuery>
          <MediaQuery query='(orientation: landscape)'>
            <StyleRoot>
              <Cell>
                <Grid smallCellWidth="1">
                  <Cell smallWidth="1" mediumWidth="1/2" largeWidth="1/2" xlargeWidth="1/2" style={styles.cell}>
                    <img id="image" src={imageDetails.url}  style={style.portraitImage} alt={imageDetails.url}/>
                  </Cell>
                  <Cell smallWidth="1" mediumWidth="1/4" largeWidth="1/4" xlargeWidth="1/4" style={{paddingRight:"5px"}}>
                    <ImageSettings imageDetails={imageDetails}/>
                  </Cell>
                  <Cell smallWidth="1" mediumWidth="1/4" largeWidth="1/4" xlargeWidth="1/4" style={{paddingLeft:"5px"}}>
                    <ImageMeta imageDetails={imageDetails}/>
                    <Social url={String(window.location)} title={imageDetails.name} imageUrl={imageDetails.url}/>                  
                  </Cell>
                </Grid>
              </Cell>
            </StyleRoot>
            </MediaQuery>
            <MediaQuery query='(min-resolution: 2dppx)'>
            </MediaQuery>
         </StyleRoot>   
       </div> 
    )
  }
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
        this.setState({
          imageDetails: response.data,
          loading: false,
        })
      })
      .catch((error) => {
        console.log("Error in Image Details:", error);
      });

  }

  render(){
    const { imageDetails, loading} = this.state;

    if(loading){
      return <p>loading</p>
    } else {
      imageDetails.location = String(window.location);
      return (
        <div>
          <Helmet
            htmlAttributes={{"lang": "en",
              "xmlns":"http://www.w3.org/1999/xhtml",
              "xmlns:fb":"http://ogp.me/ns/fb#"}} // amp takes no value
            title="Photoset"
            titleTemplate="Portfolio"
            defaultTitle="Portfolio"
            base={{"target": "_blank", "href": "http://boundless-journey.com/portfolio"}}
            meta={[
                {"name": "twitter:image", "content": "http://i1.wp.com/www.boundless-journey.com/wp-content/uploads/2016/09/DSC_5325.jpg"},
                {"property": "og:image", "content": `${imageDetails.url}`},
                {"property": "og:title", "content": "Photoset title - boundless-journey"},
                {"property": "og:url", "content": window.location},
                {"property": "og:description", "content": "boundless-journey"},
                {"property": "og:type", "content": "website"}
            ]}
          />
          <ImagePreview style={Styles} imageDetails={imageDetails}/>
        </div>
      )
    }
  }
}

export default Radium(ImageDetails);
