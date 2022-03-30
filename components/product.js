import React, {useEffect, useState} from 'react';
import styles from '../styles/components/Products.module.scss'
import HeartIcon from "../public/assets/icons/heart.svg";
import Link from "next/link";
import {$routes} from "../http/routes";

const Product = ({className, product}) => {
    const [itemClass, setItemClass] = useState(styles.product)

    useEffect(() => {
        if(className) {
            setItemClass(itemClass + ' ' + className)
        }
    }, [])

    return (
        <div className={itemClass}>
                <span className={styles.product__wish}>
                    <HeartIcon/>
                </span>
            <div className={styles.product__image}>
                <img src="/assets/images/products/1.png" alt={product.name}/>
            </div>
            <div className={styles.product__footer}>
                <div className={styles.product__details}>
                    <Link href={$routes.product(product.id)}>
                        <div className={styles.product__title}>{product.title}</div>
                    </Link>
                    <div className={styles.product__subtitle}>{product.subtitle}</div>
                </div>
                <div className={styles.product__price}>${product.price}</div>
            </div>
        </div>
    );
};

export default Product;