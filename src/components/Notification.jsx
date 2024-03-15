import React from 'react';

function Notification({ content, onClose }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{padding: '2rem'}}>
        <h1>Oops !</h1>
        <h3>{content}</h3>
        <button className="close-button" onClick={handleClose}>
          Okie nha !
        </button>
      </div>
    </div>
  );
}

export default Notification;