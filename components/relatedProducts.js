import React, {useState} from 'react';
import styles from '../styles/components/RelatedProducts.module.scss'
import shop from "../store/shop";
import Products from "./products";

const RelatedProducts = () => {
    const [products, setProducts] = useState(shop.products)

    return (
        <div className={styles['related-products']}>
            <h2 className={styles['related-products__title']}>Похожие товары</h2>

            <Products items={[...products].splice(0, 4)} pagination={false} />
        </div>
    );
};

export default RelatedProducts;