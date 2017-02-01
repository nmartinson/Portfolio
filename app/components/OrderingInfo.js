import React from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap';
import Radium from 'radium';


const OrderingInfo = () => {
  var photos = [];


  return (
    <div className="col-md-6 col-md-offset-1">
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
