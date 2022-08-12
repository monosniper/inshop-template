import React, {useState} from 'react';
import styles from '../styles/components/RelatedProducts.module.scss'
import shop from "../store/shop";
import Products from "./products";
import {useTranslation} from "react-i18next";

const RelatedProducts = () => {
    const [products, setProducts] = useState(shop.products)
    const { t, i18n } = useTranslation();

    return (
        <div className={styles['related-products']}>
            <h2 className={styles['related-products__title']}>{t('related products')}</h2>

            <Products items={[...products].splice(0, 4)} pagination={false} />
        </div>
    );
};

export default RelatedProducts;