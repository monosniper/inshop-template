import React, {useState} from 'react';
import Field from "./Field";
import styles from "../../styles/components/TotalField.module.scss";
import {observer} from "mobx-react-lite";

const TotalField = ({ sum, delivery }) => {
    return (
        <Field title={'Итог'}>
            <div className={styles.row}>
                <span>Сумма заказа:</span>
                <span className={styles.price}>${sum}</span>
            </div>
            <div className={styles.row}>
                <span>Доставка:</span>
                <span className={styles.price}>${delivery}</span>
            </div>
            <div className={styles.row + ' ' + styles.row_total}>
                <span>Всего:</span>
                <span className={styles.price}>${sum + delivery}</span>
            </div>
        </Field>
    );
};

export default observer(TotalField);