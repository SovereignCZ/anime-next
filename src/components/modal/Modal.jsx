"use client"
import React from 'react';
import {useModal} from "../../context/ModalProvider.jsx";
import "./modal.scss"

const Modal = () => {
    const {isOpen, content, closeModal, title} = useModal();

    if (!isOpen) return null;

    return (
        <div className="modal-overlay z-10" onClick={closeModal}>
            <div className="modal-content w-full sm:w-5/6 md:w-4/6 2xl:w-3/6 3xl:w-2/6"
                 onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>{title}</h2>
                    <button className="modal-close" onClick={closeModal}>×</button>
                </div>
                <div className="modal-body">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default Modal;
