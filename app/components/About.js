import React from 'react';
import ReactGA from 'react-ga';


const About = () => {
  var photos = [];
  ReactGA.pageview('/about');

  return (
    <div className="col-md-6 col-md-offset-1">
      <Helmet
        htmlAttributes={{"lang": "en"}} // amp takes no value
        title="Landscape & Nature Photography | About | Boundless Journey"
        titleTemplate="Landscape & Nature Photography | Boundless Journey"
        defaultTitle="Landscape & Nature Photography | Boundless Journey"
        meta={[
            {"name": "twitter:image", "content": "http://www.boundless-journey.com/portfolio/images/features/DSC_6429-Pano-Edit-2.jpg"},
            {"name": "thumbnail", "content": "http://www.boundless-journey.com/portfolio/images/features/thumbnails/DSC_6429-Pano-Edit-2_thumb.jpg"},
            {"property": "og:image", "content": "http://www.boundless-journey.com/portfolio/images/features/DSC_6429-Pano-Edit-2.jpg"},
            {"property": "og:title", "content": "About Me | Landscape & Nature Photography | Boundless Journey"},
            {"property": "og:url", "content": `www.portfolio.boundless-journey.com/about`},
            {"property": "og:description", "content": "About Me | Landscape & Nature Photography | Boundless Journey"},
            {"property": "og:type", "content": "website"}
        ]}
      />
      <h1>About Me!</h1>
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

export default About;

const styles = {
  outerDiv: {
    paddingTop:'25px'
  }
}