import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

function Modal(props) {
    if(!props.isModalOpen){
        return null;
    }
    return ReactDOM.createPortal(
        <section className="Modal">
            <div className="Modal--container">
                <button onClick={props.onCloseModal} className="Modal--close-button">
                    X
                </button>
                {props.children}
            </div>
        </section>,
        document.getElementById('modal')
    )
}

export default Modal;