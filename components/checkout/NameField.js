import React, {useState} from 'react';
import Field from "./Field";
import styles from "../../styles/components/Field.module.scss";
import {useTranslation} from "react-i18next";

const NameField = ({ name, setName }) => {
    const { t, i18n } = useTranslation();

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    return (
        <Field title={t('name')} editable>
            <input value={name} onChange={handleChangeName} placeholder={'Фамилия Имя'} type="text" className={styles.field__input}/>
        </Field>
    );
};

export default NameField;