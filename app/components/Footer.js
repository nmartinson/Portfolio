var React  = require('react');
var Router = require('react-router');
var Link = Router.Link;
var Navigation = require('react-router').Navigation;
import styler from 'react-styling'
import Radium from 'radium';

var Footer = React.createClass({

  mixins: [Navigation],

  render: function () {

    return (
      <a href="https://www.instagram.com/nickmartinson986/">
        <div  style={[style.div_hover, style.div_image, style.shadow]}>
          <img height="35px" src="http://www.boundless-journey.com/portfolio/images/resources/instagram_icon.png"/>
           <b style={{paddingLeft:"15px"}}>Follow on Instagram</b>
        </div>
        </a>
      );
    }
  });

module.exports = Radium(Footer);


const style = styler
`
  div_image {
    background-image: url(http://www.boundless-journey.com/portfolio/images/resources/footer.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    vertical-align: middle;
    line-height: 200px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    width: 75%;
    height: 200px;
    z-index: 15;
    left: 50%;
    margin: 0 0 0 -37.5%;
    color: white; 
    font-size: 35px;
  }

  div_hover {
    &:hover {
      opacity: 0.7;
    }
  }
  shadow {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`