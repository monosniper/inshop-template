import React from 'react';
import styles from '../styles/components/ProductHeader.module.scss'
import SubHeader from "./subHeader";
import {useShop} from "../hooks/useShop";

const ProductHeader = ({ title, price, discount }) => {
    const shop = useShop()
    return (
        <SubHeader>
            <span className={styles['product-header__title']}>{ title }</span>
            <span className={styles['product-header__price'] + ' contrast'}>
                {price}{shop.currency}
            </span>
        </SubHeader>
    );
};

export default ProductHeader;