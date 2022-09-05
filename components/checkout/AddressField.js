import React, {useState} from 'react';
import Field from "./Field";
import styles from "../../styles/components/Field.module.scss";
import {useTranslation} from "react-i18next";

const AddressField = ({ address, setAddress }) => {
    const { t, i18n } = useTranslation();

    const handleChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    return (
        <Field title={t('address')} editable>
            <textarea value={address} onChange={handleChangeAddress} placeholder={'96 Horsefair Green, Oldfield, United Kingdom'} className={styles.field__input}/>
        </Field>
    );
};

export default AddressField;