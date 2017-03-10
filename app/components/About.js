import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import Radium from 'radium';
import Helmet from 'react-helmet';


const About = () => {
  var photos = [];


  return (
    <div className="col-md-6 col-md-offset-1">
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
            {"property": "og:title", "content": "Photoset title - boundless-journey"},
            {"property": "og:description", "content": "boundless-journey"},
            {"property": "og:type", "content": "website"}
        ]}
      />
      <h1>About Me</h1>
      <p>
        Nice to meet you! I was born and raised in Bettendorf, Iowa, and lived in Iowa until I graduated college as a Hawkeye.  Chicago 
        was the next step to start my career as a Software consultant. After a year it was determined that Chicago wasn't a great fit, 
        so the cars were packed up and I headed out west to Seattle, where I currently live.
      </p>
      <p>
        I've always had a passion for creating content.  From a young age when I was racing motocross I always loved making videos from 
        the races I attended.  Eventually I also did videos for other sports my family was involved in: wakeboarding, snowboarding, skateboarding, 
        basically anthing on wheels or a board that could be done in the midwest.
      </p>
      <p>
        Over time my passion evolved more towards photography and I grew to appreciate the beauty of the world more.  I really enjoy being out 
        in nature and having new experiences, and I love being able to capture that feeling and share it with others.
      </p>
      <p>Enjoy the journey!</p>
      <p>Nick Martinson</p>
    </div>
  )
}

export default Radium(About);

const styles = {
  outerDiv: {
    paddingTop:'25px'
  }
}