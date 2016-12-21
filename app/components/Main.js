import React from 'react';
import NavHeader from './NavHeader';
import Featured from './FeaturedImages';
import Footer from './Footer';
import styler from 'react-styling'
import Radium from 'radium';
import {StyleRoot} from 'radium';



const Main = ({children, history}) => {
  if(children == null){
    return (
      <StyleRoot>
      <div className="main-container"  style={{height:"100%"}}>
        <NavHeader history={history}/>
        <div className="container" style={[style.div, style.shadow]}>
          <Featured/>
        </div>
        <Footer/>
      </div>
      </StyleRoot>
    )
  }
  return (
    <StyleRoot>
    <div className="main-container" style={{height:"100%"}}>
      <NavHeader history={history} />
        <div className="container" style={[style.div, style.shadow]}>
          {children}
        </div>
      <Footer/>
    </div>
    </StyleRoot>
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
  padding-bottom: 20px;
}
shadow {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
`
