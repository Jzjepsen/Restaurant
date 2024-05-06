import React, { useEffect } from 'react';
import Modal from 'react-modal';
import './Modal.css';


const CustomModal = ({ isOpen, onRequestClose, title, children }) => {
    useEffect(() => {
        let timer;
        if (isOpen) {
          timer = setTimeout(onRequestClose, 15000);
        }
        return () => {
          clearTimeout(timer);
        };
      }, [isOpen, onRequestClose]);
     
    return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel={title}
      ariaHideApp={false}
      className="modalContent"
      shouldCloseOnOverlayClick={true} 
    >
      <h2>{title}</h2>
      {children}
      <button className="closeButton" onClick={onRequestClose}>x</button> 

    </Modal>
  );
};

export default CustomModal;