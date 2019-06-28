import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ isShowing, hide, children }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal" tabIndex={-1} role="dialog">
            <button
              style={{ position: 'absolute', top: 0, right: 0 }}
              type="button"
              onClick={hide}
            >
              X
            </button>
            {children}
          </div>
        </>,
        document.body
      )
    : null;
export default Modal;
