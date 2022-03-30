import React, {useState} from 'react';
import Field from "./Field";
import styles from "../../styles/components/Field.module.scss";

const AddressField = ({ address, setAddres }) => {
    const handleChangeAddress = (e) => {
        setAddress(e.target.value)
    }

    return (
        <Field title={'Адрес доставки'} editable>
            <textarea value={address} onChange={handleChangeAddress} placeholder={'96 Horsefair Green, Oldfield, United Kingdom'} className={styles.field__input}/>
        </Field>
    );
};

export default AddressField;