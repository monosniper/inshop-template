import React from 'react';
import styles from "../../styles/components/Checklist.module.scss";
import * as PropTypes from "prop-types";
import {useShop} from "../../hooks/useShop";
import {observer} from "mobx-react-lite";

function CheckListItem(props) {
    const count = props.count ?? 1;
    const shop = useShop()

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
            {props.price * count}{shop.currency}
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

export default observer(CheckList);