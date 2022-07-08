import React from 'react';
import styles from "../styles/components/BasketFooter.module.scss";
import basket from "../store/basket";
import Link from "next/link";
import {observer} from "mobx-react-lite";
import {$routes} from "../http/routes";
import {useTranslation} from "react-i18next";

const BasketFooter = () => {
    const { t, i18n } = useTranslation();

    return (
        <div className={styles['basket-footer'] + ' white-block'}>
            <div className={styles['basket-footer__left']}>
                <span className={styles['basket-footer__text']}>{t('total')}:</span>
            </div>
            <div className={styles['basket-footer__right']}>
                <span className={styles['basket-footer__price']}>${basket.getSum()}</span>
                <Link href={$routes.checkout}>
                    <button className="button">{t('pay')}</button>
                </Link>
            </div>
        </div>
    );
};

export default observer(BasketFooter);