import React from 'react';
import styles from "../../styles/components/Checklist.module.scss";
import * as PropTypes from "prop-types";

function CheckListItem({ title, count, price }) {
    return <div className={styles.item}>
        <div className={styles.item__left}>
            <div className={styles.item__img}>
                <img src={'/assets/images/products/1.png'} alt={title}/>
            </div>
            <span className={styles.item__title}>{title}</span>
            <span className={styles.item__count}>x{count}</span>
        </div>
        <span className={styles.item__price}>${price * count}</span>
    </div>;
}

CheckListItem.propTypes = {
    img: String,
    title: String,
    count: Number,
    price: Number,
};

const CheckList = ({ items }) => {
    return (
        <div className={'white-block'}>
            {items.map((item, i) => <CheckListItem key={'checklist-item-'+i} {...item} />)}
        </div>
    );
};

export default CheckList;