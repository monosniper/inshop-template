import React, {useEffect, useState} from 'react';
import styles from '../styles/components/Products.module.scss'
import Product from "./product";
import Pagination from "./pagination";
import shop from "../store/shop";

const Products = () => {
    const [products, setProducts] = useState(shop.products)

    return (
        <>
            <div className={styles.products}>
                {products.map((product, i) => <Product key={'product-'+i} product={product} />)}
            </div>

            <Pagination />
        </>
    );
};

export default Products;