import React from 'react';
import ReactDOM from 'react-dom';

import '../styles/Backdrop.css';

const Backdrop = (props) => {
  // using a portal to render a backdrop
  //needed for the modal
  return ReactDOM.createPortal(
    <div className='backdrop' onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook')
  );
};

export default Backdrop;
