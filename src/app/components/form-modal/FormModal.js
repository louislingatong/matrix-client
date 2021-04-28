import React from 'react';
import PropTypes from 'prop-types';
import {Modal} from 'react-bootstrap';

FormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired
};

function FormModal({open, title, body, handleClose}) {
  return (
    <Modal show={open} onHide={handleClose} centered animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {body}
      </Modal.Body>
    </Modal>
  )
}

export default FormModal;