import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';

//portals allow us to render content wherever we specify
// feed props into our modal that will be displayed by the overlay
//style
//header
//onSubmit
//footer
const ModalOverlay = (props) => {
  const content = (
    <div className={`modal`} style={props.style}>
      <header className={`modal__header`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content`}>{props.children}</div>
        {/* buttons go in footer */}
        <footer className={`modal__footer`}>{props.footer}</footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = (props) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames='modal'
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
