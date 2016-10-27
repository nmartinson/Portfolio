import React from 'react';
import NavHeader from './NavHeader';



const Main = ({children, history}) => {

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