import React from 'react';

import Modal from './Modal';

const GenericModal = (props) => {
  return (
    // A simpler modal that will take in an onCancel to clear the modal
    // displays a header, message and a footer that has a button to hide the modal
    <Modal
      onCancel={props.onClear}
      header={props.header}
      show={!!props.message}
      footer={
        <button data-cy='modal-footer' onClick={props.onClear}>
          Okay
        </button>
      }
    >
      <p>{props.message}</p>
    </Modal>
  );
};

export default GenericModal;
