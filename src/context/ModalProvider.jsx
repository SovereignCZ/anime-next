"use client"
import React, {createContext, useContext, useState, useCallback} from 'react';

const ModalContext = createContext(undefined);

export const ModalProvider = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [content, setContent] = useState(null);
    const [title, setTitle] = useState('');

    const openModal = useCallback((modalContent, options = {title: ''}) => {
        console.log('openModal')
        setContent(modalContent);
        setTitle(options.title);
        setIsOpen(true);
    }, []);

    const closeModal = useCallback(() => {
        setIsOpen(false);
        setContent(null);
    }, []);

    return (
        <ModalContext.Provider value={{isOpen, content, openModal, closeModal, title}}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    return useContext(ModalContext);
};
