import React, {useEffect, useMemo, useState} from 'react';
import styles from '../styles/components/Products.module.scss'
import Product from "./product";
import Pagination from "./pagination";
import shop from "../store/shop";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/router";

const PageSize = 12

const Products = ({ items, pagination = true }) => {
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1);

    const pageProducts = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return products.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, products]);

    useEffect(() => {
        if(items) setProducts(items)
        else setProducts(shop.products)
    }, [items, shop.products])

    useEffect(() => {
        console.log(shop.getFilteredProducts())
        setProducts(shop.getFilteredProducts())
    }, [shop.filters])

    return (
        <>
            <div className={styles.products}>
                {pageProducts.map((product, i) => <Product key={'product-'+i} product={product} />)}
            </div>

            {pagination ? <Pagination
                onPageChange={setCurrentPage}
                totalCount={products.length}
                currentPage={currentPage}
                pageSize={PageSize}
            /> : null}
        </>
    );
};

export default observer(Products);