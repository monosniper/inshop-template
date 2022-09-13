import React, {useState} from 'react';
import Field from "./Field";
import styles from "../../styles/components/TotalField.module.scss";
import {observer} from "mobx-react-lite";
import {useTranslation} from "react-i18next";
import {useShop} from "../../hooks/useShop";

const TotalField = ({ sum }) => {
    const { t, i18n } = useTranslation();
    const shop = useShop()

    return (
        <Field title={t('total')}>
            <div className={styles.row}>
                <span>{t('order sum')}:</span>
                <span className={styles.price + ' contrast'}>{sum}{shop.currency}</span>
            </div>
            <div className={styles.row}>
                <span>{t('delivery')}:</span>
                <span className={styles.price + ' contrast'}>{shop.delivery || 0}{shop.currency}</span>
            </div>
            <div className={styles.row + ' ' + styles.row_total}>
                <span>{t('all total')}:</span>
                <span className={styles.price + ' contrast'}>{sum}{shop.currency}</span>
            </div>
        </Field>
    );
};

export default observer(TotalField);