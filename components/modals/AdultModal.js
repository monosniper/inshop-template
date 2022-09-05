import React, {useState} from 'react';
import ReactModal from "react-modal";
import {useTranslation} from "react-i18next";
import { getCookie, setCookie } from 'cookies-next';

const AdultModal = () => {
    const { t, i18n } = useTranslation();
    const [showModal, setShowModal] = useState(!getCookie('adult_content_confirmed'))

    const handleCloseModal = () => {
        setCookie('adult_content_confirmed', 'true');
        setShowModal(false)
    }

    return (
        <ReactModal
            isOpen={showModal}
            className={'modal'}
            overlayClassName={'modal-overlay modal-overlay_adult'}
        >
            <div className="modal__title">18+ {t('content')}</div>

            <p className="modal__text">{t('adult_text')}</p>

            <div className="modal__footer">
                <button onClick={handleCloseModal} className={'modal__button button'}>{t('ok')}</button>
            </div>
        </ReactModal>
    );
};

export default AdultModal;