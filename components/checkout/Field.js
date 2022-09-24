import React from 'react';
import styles from "../../styles/components/Field.module.scss";
import EditIcon from '../../public/assets/icons/edit.svg'

const Field = ({ title, children, editable = false, subText=null }) => {
    return (
        <div className={styles.field}>
            <div className={styles.field__header}>
                <span className={styles.field__title}>{title}</span>
                {/*{editable ? <EditIcon /> : null}*/}
            </div>
            <div className={styles.field__content}>{children}</div>
            {subText ? <div className={styles.field__subtext}>
                {subText}
            </div> : null}
        </div>
    );
};

export default Field;