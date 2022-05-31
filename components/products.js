import React, {useEffect, useState} from 'react';
import styles from '../styles/components/Products.module.scss'
import Product from "./product";
import Pagination from "./pagination";
import shop from "../store/shop";
import {observer} from "mobx-react-lite";

const Products = ({ items, pagination = true }) => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        if(items) setProducts(items)
        else setProducts(shop.products)
    }, [items, shop.products])

    return (
        <>
            <div className={styles.products}>
                {products.map((product, i) => <Product key={'product-'+i} product={product} />)}
            </div>

            {pagination ? <Pagination /> : null}
        </>
    );
};

export default observer(Products);