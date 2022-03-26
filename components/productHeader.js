import React from 'react';
import styles from '../styles/components/ProductHeader.module.scss'
import BackIcon from '../public/assets/icons/prev.svg';
import {useRouter} from "next/router";

const ProductHeader = () => {
    const router = useRouter()

    return (
        <div className={styles['product-header'] + ' white-block'}>
            <div className={styles['product-header__left']}>
                <span onClick={router.back}><BackIcon /></span>
            </div>
            <div className={styles['product-header__right']}>
                <span className={styles['product-header__title']}>Air Max pegasus 37</span>
                <span className={styles['product-header__price']}>$189</span>
            </div>
        </div>
    );
};

export default ProductHeader;