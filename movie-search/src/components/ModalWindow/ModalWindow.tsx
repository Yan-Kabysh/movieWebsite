// components/ModalWindow.tsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_MODAL } from "../../redux/actionTypes/modalActionTypes";
import { IStoreState } from "../../types";
import Modal from "react-modal";
import "./ModalWindow.css"

const ModalWindow = () => {
    const dispatch = useDispatch();
    const { isOpen, message, status } = useSelector((state: IStoreState) => state.modal.modal);

    const customStyles = {
        overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)"
        }
    };

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        // Cleanup function to reset the overflow style when the component is unmounted
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const closeModal = () => {
        dispatch({ type: HIDE_MODAL });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            contentLabel="Notification"
            ariaHideApp={false}
            style={customStyles}
            className={`modal ${status}`} // Можно использовать для добавления стилей успеха/ошибки
        >
            <h2>{message}</h2>
            <button className="settings-save-btm" style={{marginLeft: "0", width: "100%"}} onClick={closeModal}>Close</button>
        </Modal>
    );
};

export { ModalWindow };
