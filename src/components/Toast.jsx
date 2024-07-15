import React, {useState} from 'react';
import {Toast} from "react-bootstrap";
import {useAppContext} from "../context/ContextProvider.jsx";

function Radka({data, klic, skryt}) {
    const delay = 3000;
    const [showToast, setShowToast] = useState(data.show);
    const [autohide, setAutohide] = useState(true);

    const handleMouseOver = () => {
        setAutohide(false); // Zastaví autohide když uživatel má myš nad Toastem
    };

    const handleMouseLeave = () => {
        setAutohide(true); // Restartuje autohide když uživatel odjede myší
    };

    const handleClose = () => {
        skryt({klic: klic, stav: false});
        setShowToast(false);
    };

    return <Toast
        show={showToast}
        delay={delay}
        bg={data.typ}
        autohide={autohide}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        onClose={handleClose}>
        <div className={"toast-body"}>
            {data.message}
        </div>
    </Toast>;
}

const ToastCust = () => {
    const {toast, showToast} = useAppContext()
    return (
        <div className="toast-container">
            {toast.map((c, key) => (
                <Radka key={key} klic={key} data={c} skryt={showToast}/>
            ))}
        </div>
    );
};

export default ToastCust;
