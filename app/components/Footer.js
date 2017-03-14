var React  = require('react');
// var Router = require('react-router');
// var Link = Router.Link;
// var Navigation = require('react-router').Navigation;
//import styler from 'react-styling'
import Radium from 'radium';

var Footer = React.createClass({

  //mixins: [Navigation],

  render: function () {

    return (
      <div>
        <a href="https://www.instagram.com/nickmartinson986/">
          <div  style={[style.div_image]}>
            <img style={style.instagram} src="http://www.boundless-journey.com/portfolio/images/resources/instagram_icon.png"/>
             <b>Follow on Instagram</b>
          </div>
        </a>
        <div style={style.copyright}>
          <p style={{paddingTop:'10px'}}>© 2016 by Nick Martinson / Website by Nick Martinson</p>
        </div>
      </div>
      );
    }
  });

module.exports = Radium(Footer);


const style ={
  instagram: {
    '@media (max-width: 2000px) and (min-width: 641px)': {
      height: '25px',
      paddingRight: '15px',
      marginBottom: '5px'
    },
    '@media (max-width: 639px) and (min-width: 320px)': {
      height: '15px',
      paddingRight: '10px',
      marginBottom: '5px'
    },
  },
  copyright: {
    background: 'black',
    textAlign: 'center',
    color: 'white',
    height:'100%',
    verticalAlign: 'middle',
    fontSize: '12px',
    position: 'relative',
    width: '75%',
    left: '50%',
    margin: '0 0 0 -37.5%',
  },
  div_image: {
    backgroundImage: 'url(http://www.boundless-journey.com/portfolio/images/resources/footer.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '50% 50%',
    verticalAlign: 'middle',
    lineHeight: '100px',
    margin: '0 auto',
    textAlign: 'center',
    position: 'relative',
    width: '75%',
    left: '50%',
    margin: '0 0 0 -37.5%',
    color: 'white',

    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

    ':hover': {
      opacity: '0.7'
    },
    '@media (max-width: 2000px) and (min-width: 641px)': {
      height: '150px',
      lineHeight: '150px',
      fontSize: '25px'
    },
    '@media (max-width: 639px) and (min-width: 320px)': {
      height: '100px',
      lineHeight: '100px',
      fontSize: '15px'
    },
  }
}