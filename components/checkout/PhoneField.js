import React, {useState} from 'react';
import Field from "./Field";
import styles from "../../styles/components/Field.module.scss";

const PhoneField = ({ phone, setPhone }) => {
    const handleChangePhone = (e) => {
        setPhone(e.target.value)
    }

    return (
        <Field title={'Номер телефона'} editable>
            <input value={phone} onChange={handleChangePhone} placeholder={'+__________'} type="text" className={styles.field__input}/>
        </Field>
    );
};

export default PhoneField;