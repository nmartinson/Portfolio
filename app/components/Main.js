import React from 'react';
import NavHeader from './NavHeader';
import Featured from './FeaturedImages';
import Footer from './Footer';
import styler from 'react-styling'
import Radium from 'radium';


const Main = ({children, history}) => {
  if(children == null){
    return (
      <div className="main-container">
        <NavHeader />
        <div className="container">
          <Featured/>
        </div>
        <Footer/>
      </div>
    )
  }
  return (
    <div className="main-container" style={{height:"100%"}}>
      <NavHeader />
        <div className="container" style={[style.div, style.shadow]}>
          {children}
        </div>
      <Footer/>
    </div>
  )
}

export default Radium(Main);

const style = styler
`
div {
  height: auto;
  min-height: 75%;
  width: 75%;
  overflow: block;
}
shadow {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
`
