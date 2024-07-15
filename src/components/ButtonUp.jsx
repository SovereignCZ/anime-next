import React, {useEffect, useState} from 'react';

const ButtonUp = () => {
    const [visible, setVisible] = useState(false);
    const toggleVisibility = () => {
        if (window.scrollY > 50) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);
    return (
        <button
            className={"fixed bottom-6 right-6 w-10 h-10 text-white dark:text-black bg-black dark:bg-white border-0 rounded-xl cursor-pointer"}
            style={{display: visible ? 'block' : 'none'}} onClick={scrollToTop}>
            <i className={"far fa-arrow-from-bottom"}/>
        </button>
    );
};

export default ButtonUp;