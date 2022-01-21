import React from "react";

import closeButtonIcon from "../../assets/cancelIcon.png";

const Modal = ({ id = "modal", onClose = () => {}, children }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  return (
    <div id={id} className="modal" onClick={handleOutsideClick}>
      <div className="modalContainer">
        <img
          className="closeButton"
          src={closeButtonIcon}
          alt="closeButton"
          onClick={onClose}
        />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
