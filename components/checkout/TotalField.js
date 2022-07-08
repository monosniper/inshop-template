import React, {useState} from 'react';
import Field from "./Field";
import styles from "../../styles/components/TotalField.module.scss";
import {observer} from "mobx-react-lite";
import {useTranslation} from "react-i18next";

const TotalField = ({ sum, delivery }) => {
    const { t, i18n } = useTranslation();

    return (
        <Field title={t('total')}>
            <div className={styles.row}>
                <span>{t('order sum')}:</span>
                <span className={styles.price}>${sum}</span>
            </div>
            <div className={styles.row}>
                <span>{t('delivery')}:</span>
                <span className={styles.price}>${delivery}</span>
            </div>
            <div className={styles.row + ' ' + styles.row_total}>
                <span>{t('all total')}:</span>
                <span className={styles.price}>${sum + delivery}</span>
            </div>
        </Field>
    );
};

export default observer(TotalField);