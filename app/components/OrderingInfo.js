import React from 'react';
// import axios from 'axios';
import { Link } from 'react-router';
// import { LinkContainer } from 'react-router-bootstrap';
import Radium from 'radium';
import ReactGA from 'react-ga';
import Helmet from "react-helmet";



const OrderingInfo = () => {
  var photos = [];
  ReactGA.pageview('/orderingInfo');

  return (
    <div className="col-md-6 col-md-offset-1">
      <Helmet
        htmlAttributes={{"lang": "en"}} // amp takes no value
        title="Landscape & Nature Photography | Ordering Info | Boundless Journey"
        titleTemplate="Landscape & Nature Photography | Boundless Journey"
        defaultTitle="Landscape & Nature Photography | Boundless Journey"
        meta={[
            {"name": "twitter:image", "content": "http://www.boundless-journey.com/portfolio/images/features/DSC_6429-Pano-Edit-2.jpg"},
            {"name": "thumbnail", "content": "http://www.boundless-journey.com/portfolio/images/features/thumbnails/DSC_6429-Pano-Edit-2_thumb.jpg"},
            {"property": "og:image", "content": "http://www.boundless-journey.com/portfolio/images/features/DSC_6429-Pano-Edit-2.jpg"},
            {"property": "og:title", "content": "Ordering Info | Landscape & Nature Photography | Boundless Journey"},
            {"property": "og:url", "content": `www.portfolio.boundless-journey.com/orderingInfo`},
            {"property": "og:description", "content": "Ordering Info | Landscape & Nature Photography | Boundless Journey"},
            {"property": "og:type", "content": "website"}
        ]}
      />
      <h1>Ordering Info</h1>
      <p>
        All of my images are professionally printed, using only archival quality materials and inks, then shipped directly to you. 
      </p>
      <p>
        If you're looking for something that comes ready to hang without the need for framing, I recommend a stretched canvas gallery wrap. 
        Or for something a little different, a beautiful metal print that appears to float from your wall. This is a particularly great option for 
        vibrant images!
      </p>
      <p>
        All paper prints come mounted and matted, all that is left for you to do is pop it in the frame! If you simply prefer a printed photo,
        contact me and we can make it happen.
      </p>
      <p>
        <span>Also, my images are available for licensing, so please </span>
          <Link to={"/contact"}>Contact</Link>
        <span> me to inquire about fees and terms.</span>
      </p>

      <p>Enjoy the journey!</p>
      <p>Nick Martinson</p>
    </div>
  )
}

export default Radium(OrderingInfo);

const styles = {
  outerDiv: {
    paddingTop:'25px'
  }
}
