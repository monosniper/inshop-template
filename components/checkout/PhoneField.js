import React, {useState} from 'react';
import Field from "./Field";
import styles from "../../styles/components/Field.module.scss";
import {useTranslation} from "react-i18next";

const PhoneField = ({ phone, setPhone }) => {
    const { t, i18n } = useTranslation();

    const handleChangePhone = (e) => {
        setPhone(e.target.value)
    }

    return (
        <Field title={t('phone')} editable>
            <input value={phone} onChange={handleChangePhone} placeholder={'+__________'} type="text" className={styles.field__input}/>
        </Field>
    );
};

export default PhoneField;