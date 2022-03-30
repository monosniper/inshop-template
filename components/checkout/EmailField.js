import React, {useState} from 'react';
import Field from "./Field";
import styles from "../../styles/components/Field.module.scss";

const EmailField = ({ email, setEmail }) => {
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    return (
        <Field title={'Почта'} editable>
            <input value={email} onChange={handleChangeEmail} placeholder={'example@email.com'} type="email" className={styles.field__input}/>
        </Field>
    );
};

export default EmailField;