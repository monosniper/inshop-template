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
import auth from "../store/auth";
import {useTranslation} from "react-i18next";
import {useShop} from "../hooks/useShop";

const Product = ({className, product}) => {
    const [itemClass, setItemClass] = useState(styles.product)
    const modules = useModules();
    const shop = useShop()

    const handleWishToggle = () => {
        basket.toggleItem(product)
    }

    useEffect(() => {
        if(className) {
            setItemClass(itemClass + ' ' + className)
        }
    }, [])

    const getDiscountPrice = () => {
        const _discount = product.price / 100 * product.discount

        return product.price - _discount;
    }

    const { t, i18n } = useTranslation();

    return (
        <div className={itemClass + ' product'}>
            {modules.get($modules.basket) && auth.isAuthorized ? <span onClick={handleWishToggle} className={styles.product__wish + ' contrast_path'}>
                {basket.hasItem(product.id) ? <HeartIcon /> : <HeartIconOutline />}
            </span> : null}

            {modules.get($modules.discounts) && product.discount
                ? <span className={styles.product__term + ' contrast_bg'}>-{product.discount}%</span>
                : null}

            <Link href={$routes.product(product.id)}>
                <div className={styles.product__image}>
                    <img src={product.images[0]} alt={product.name}/>
                </div>
            </Link>
            <div className={styles.product__footer}>
                <div className={styles.product__details}>
                    <Link href={$routes.product(product.id)}>
                        <div className={styles.product__title + ' contrast_hover product__title'}>{product.title}</div>
                    </Link>
                    <div className={styles.product__subtitle}>{product.subtitle}</div>
                </div>
                <div className={styles.product__price + ' contrast'}>
                    {modules.get($modules.discounts) && product.discount ? <div className={styles.product__discount}>
                        <p className={styles.product__old_price}>{product.price}{shop.currency}</p>
                        <p className={styles.product__new_price + ' contrast'}>{getDiscountPrice()}{shop.currency}</p>
                    </div> : product.price + shop.currency}
                </div>
            </div>
        </div>
    );
};

export default observer(Product);