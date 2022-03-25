import React from 'react';
import WatermarkIcon from '../public/assets/icons/watermark.svg'
import Link from "next/link";

const Watermark = () => {
    return (
        <a target={'_blank'} href={process.env.NEXT_PUBLIC_REACT_APP_SERVER_URL} rel="noreferrer">
            <span className={'watermark'}>
                made with <WatermarkIcon/>
            </span>
        </a>
    );
};

export default Watermark;