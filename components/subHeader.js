import React from 'react';
import styles from "../styles/components/SubHeader.module.scss";
import BackIcon from "../public/assets/icons/prev.svg";
import {useRouter} from "next/router";

const SubHeader = ({ children, text, centerEl=null }) => {
    const router = useRouter()

    return (
        <div className={styles['sub-header'] + ' white-block'}>
            <div className={styles['sub-header__left']}>
                <span onClick={router.back}><BackIcon /></span>
            </div>
            {centerEl}
            <div className={styles['sub-header__right']}>
                {children ? children : <span className={styles['sub-header__text']}>{text}</span>}
            </div>
        </div>
    );
};

export default SubHeader;