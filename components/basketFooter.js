import React from 'react';
import styles from "../styles/components/BasketFooter.module.scss";
import basket from "../store/basket";
import Link from "next/link";
import {observer} from "mobx-react-lite";
import {$routes} from "../http/routes";
import {useTranslation} from "react-i18next";
import CheckoutBtn from "./CheckoutBtn";

const BasketFooter = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className={styles['basket-footer'] + ' white-block'}>
            <div className={styles['basket-footer__left']}>
                <span className={styles['basket-footer__text']}>{t('total')}:</span>
            </div>
            <div className={styles['basket-footer__right']}>
                <span className={styles['basket-footer__price']}>${basket.getSum()}</span>
                <CheckoutBtn>{t('pay')}</CheckoutBtn>
            </div>
        </div>
    );
};

export default observer(BasketFooter);