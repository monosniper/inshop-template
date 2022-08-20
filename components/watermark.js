import React from 'react';
import WatermarkIcon from '../public/assets/icons/watermark.svg'
import Link from "next/link";
import {useTranslation} from "react-i18next";

const Watermark = () => {
    const { t, i18n } = useTranslation();

    return (
        <a target={'_blank'} href={process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL} rel="noreferrer">
            <span className={'watermark'}>
                {t('Made with')} <WatermarkIcon/>
            </span>
        </a>
    );
};

export default Watermark;