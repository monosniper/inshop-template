import React, {useEffect, useState} from 'react';
import styles from '../styles/components/Products.module.scss'
import HeartIcon from "../public/assets/icons/heart.svg";
import HeartIconOutline from "../public/assets/icons/heart_outline.svg";
import Link from "next/link";
import {$routes} from "../http/routes";
import basket from "../store/basket";
import {observer} from "mobx-react-lite";
import {$modules} from "../utils/config";
import AuthModals from "./AuthModals";
import {useModules} from "../hooks/useModules";

const Product = ({className, product}) => {
    const [itemClass, setItemClass] = useState(styles.product)
    const modules = useModules();

    const handleWishToggle = () => {
        basket.toggleItem(product)
    }

    useEffect(() => {
        if(className) {
            setItemClass(itemClass + ' ' + className)
        }
    }, [])

    return (
        <div className={itemClass}>
            {modules.get($modules.basket) ?<span onClick={handleWishToggle} className={styles.product__wish}>
                {basket.hasItem(product.id) ? <HeartIcon /> : <HeartIconOutline />}
            </span> : null}

            <Link href={$routes.product(product.id)}>
                <div className={styles.product__image}>
                    <img src={product.images[0]} alt={product.name}/>
                </div>
            </Link>
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

export default observer(Product);