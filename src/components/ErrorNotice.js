import React from 'react';
import './ErrorNotice.css';

const ErrorNotice = (props) => {
  // console.log(props.message);
  return (
    <div className='error-notice'>
      <span>{props.message}</span>
      <button onClick={props.clearError}>X</button>
    </div>
  );
};

export default ErrorNotice;
