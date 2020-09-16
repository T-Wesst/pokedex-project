import React, { useState, forwardRef, useImperativeHandle } from 'react';
import ReactDOM from 'react-dom';

const Modal = forwardRef((props, ref) => {
  const [display, setDisplay] = useState(false);
  useImperativeHandle(ref, () => {
    return {
      openModal: () => open(),
      closeModal: () => close(),
    };
  });
  const open = () => {
    setDisplay(true);
  };
  const close = () => {
    setDisplay(false);
  };
  const styles = {
    modalWrapper: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    modalBackdrop: {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalBox: {
      position: 'relative',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      minHeight: '30%',
      width: '60%',
      backgroundColor: 'white',
      boxShadow: '0,0,10px, rgba(0,0,0,0.25)',
      zIndex: 101,
      overflowY: 'auto',
      padding: '40px',
    },
  };

  if (display) {
    return ReactDOM.createPortal(
      <div className={styles.modalWrapper}>
        <div onClick={close} className={styles.modalBackdrop}>
          <div className={styles.modalBox}>{props.children}</div>
        </div>
      </div>,
      document.getElementById('modal-root')
    );
  }
  return null;
});

export default Modal;
