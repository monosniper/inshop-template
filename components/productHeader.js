import React from 'react';
import styles from '../styles/components/ProductHeader.module.scss'
import SubHeader from "./subHeader";

const ProductHeader = ({ title, price }) => {
    return (
        <SubHeader>
            <span className={styles['product-header__title']}>{ title }</span>
            <span className={styles['product-header__price']}>${price}</span>
        </SubHeader>
    );
};

export default ProductHeader;