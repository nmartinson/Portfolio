import React from 'react';
import NavHeader from './NavHeader';
import Featured from './FeaturedImages';



const Main = ({children, history}) => {
  if(children == null){
    return (
      <div className="main-container">
        <NavHeader />
        <div className="container">
          <Featured/>
        </div>
      </div>
    )
  }
  return (
    <div className="main-container">
      <NavHeader />
      <div className="container">
        {children}
      </div>
    </div>
  )
}

export default Main;