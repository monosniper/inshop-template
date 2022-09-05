import React from 'react';
import styles from "../../styles/components/Checklist.module.scss";
import * as PropTypes from "prop-types";

function CheckListItem(props) {
    const count = props.count ?? 1;

    return <div className={styles.item}>
        <div className={styles.item__left}>
            <div className={styles.item__img}>
                <img src={props.preview_url} alt={props.title}/>
            </div>
            <span className={styles.item__title}>{props.title}</span>
            <span className={styles.item__count}>x{count}</span>
        </div>
        <span className={styles.item__price + ' contrast'}>
            {props.discount ? <span className={'discount contrast_bg'}>-{props.discount}%</span> : null}
            ${props.price * count}
        </span>
    </div>;
}

const CheckList = ({ items }) => {
    return (
        <div className={'white-block'}>
            {items.map((item, i) => item ? <CheckListItem key={'checklist-item-'+i} {...item} /> : null)}
        </div>
    );
};

export default CheckList;