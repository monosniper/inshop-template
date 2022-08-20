import React, {useEffect, useState} from 'react';
import styles from '../styles/components/BasketButton.module.scss'
import BasketIcon from "../public/assets/icons/cart.svg";
import basket from "../store/basket";
import Link from "next/link";
import {observer} from "mobx-react-lite";
import {$routes} from "../http/routes";

const BasketButton = observer(() => {
    const [itemClass, setItemClass] = useState(styles.button)

    useEffect(() => {
        if(!basket.isEmpty()) {
            setItemClass(styles.button + ' ' + styles.active)

            setTimeout(() => {
                setItemClass(styles.button)
            }, 300)
        }
    }, [basket.items])

    return (
        <Link href={$routes.basket}>
            <button className={itemClass}>
                <BasketIcon />
                <span className={styles.button__count + ' contrast_bg'}>{basket.getItemsCount()}</span>
            </button>
        </Link>
    );
});

export default BasketButton;