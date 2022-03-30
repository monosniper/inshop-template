import React, {useState} from 'react';
import Field from "./Field";
import styles from "../../styles/components/Field.module.scss";

const NameField = ({ name, setName }) => {
    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    return (
        <Field title={'Имя'} editable>
            <input value={name} onChange={handleChangeName} placeholder={'Фамилия Имя'} type="text" className={styles.field__input}/>
        </Field>
    );
};

export default NameField;