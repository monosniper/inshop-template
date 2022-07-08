import React, {useState} from 'react';
import Field from "./Field";
import styles from "../../styles/components/Field.module.scss";
import {useTranslation} from "react-i18next";

const EmailField = ({ email, setEmail }) => {
    const { t, i18n } = useTranslation();


    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    return (
        <Field title={t('email')} editable>
            <input value={email} onChange={handleChangeEmail} placeholder={'example@email.com'} type="email" className={styles.field__input}/>
        </Field>
    );
};

export default EmailField;