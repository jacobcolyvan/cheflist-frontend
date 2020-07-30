import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/Modal.css';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';

//portals allow us to render content wherever we specify

//style
//header
//onSubmit
//footer

//below function will take in props from Modal and render the appropriate header, message and footer, it'll be rendered on a different dom element then root
const ModalOverlay = (props) => {
  const content = (
    <div className={`modal`}>
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
      {/* displays a backdrop that blurs the screen as the modal pops up, this backdrop needs it's own div to render onto in index */}
      {/* allows css transitions on modal */}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames='modal'
      >
        {/* render ModalOverlay with all props passing from Modal down to ModalOverlay */}
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
