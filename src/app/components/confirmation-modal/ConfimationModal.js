import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal} from "react-bootstrap";

ConfirmationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  subMessage: PropTypes.string,
  handleConfirm: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired
};

function ConfirmationModal({open, message, subMessage, handleConfirm, handleClose}) {
  return (
    <Modal show={open} onHide={handleClose} centered animation={false}>
      <Modal.Body className="text-center">
        <h4>{message}</h4>
        <p>{subMessage}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="light" onClick={handleClose}>
          Close
        </Button>
        <Button variant="dark" onClick={handleConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ConfirmationModal;