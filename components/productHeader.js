import React from 'react';
import styles from '../styles/components/ProductHeader.module.scss'
import SubHeader from "./subHeader";

const ProductHeader = () => {
    return (
        <SubHeader>
            <span className={styles['product-header__title']}>Air Max pegasus 37</span>
            <span className={styles['product-header__price']}>$189</span>
        </SubHeader>
    );
};

export default ProductHeader;