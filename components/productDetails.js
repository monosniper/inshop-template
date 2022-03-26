import React from 'react';
import styles from '../styles/components/ProductDetails.module.scss'
import {useRouter} from "next/router";
import Link from 'next/link'
import BasketIcon from '../public/assets/icons/cart.svg';
import {ScrollingCarousel} from "@trendyol-js/react-carousel";
import * as PropTypes from "prop-types";
import {Col, Row} from "react-bootstrap";
import Carousel from 'react-elastic-carousel'

const ProductImage = ({ src }) => {
    return <div className={styles.product__image}>
        <img src={src} alt="Item name"/>
    </div>;
}

ProductImage.propTypes = {src: PropTypes.string};

const PropertySelectorOption = ({ option, handleClick }) => {
    return <span onClick={() => handleClick(option.value)} className={styles['property-selector__option']}>{option.name}</span>;
}
const PropertySelector = ({ property }) => {
    return <div className={styles['property-selector']}>
        <span className={styles['property-selector__name']}>Выберите {property.name}</span>
        <div className={styles['property-selector__options']}>
            {property.options.map((option, i) => <PropertySelectorOption option={option} key={'property-option-'+i} />)}
        </div>
    </div>;
}
const ProductDetails = () => {
    const router = useRouter()
    const images = [
        '/assets/images/products/1/1.png',
        '/assets/images/products/1/2.png',
        '/assets/images/products/1/3.png',
        '/assets/images/products/1/4.png',
        '/assets/images/products/1/1.png',
        '/assets/images/products/1/2.png',
        '/assets/images/products/1/3.png',
        '/assets/images/products/1/4.png',
        '/assets/images/products/1/1.png',
        '/assets/images/products/1/2.png',
        '/assets/images/products/1/3.png',
        '/assets/images/products/1/4.png',
    ]
    const properties = [
        {
            name: 'Размер',
            value: '8',
            options: [
                {
                    name: '8',
                    value: '8'
                },
                {
                    name: '8.5',
                    value: '8.5'
                },
                {
                    name: '9',
                    value: '9'
                },
                {
                    name: '9.5',
                    value: '9.5'
                },
                {
                    name: '10',
                    value: '10'
                }
            ]
        }
    ]

    return (
        <div className={styles.product + ' white-block'}>
            <Row>
                <Col>
                    <div className={styles.product__left}>
                        <Carousel className={styles.product__slider} verticalMode pagination={false} showArrows={false} itemsToShow={4}>
                            {images.map((src, i) => <ProductImage key={'image-'+i} src={src} />)}
                        </Carousel>
                        <div>
                            <img src={'/assets/images/products/1/main.png'} alt="Item name"/>
                        </div>
                    </div>
                </Col>
                <Col>
                    <Link href={'/?category=category_name'}>
                        <div className={styles.product__category}>Кроссовки</div>
                    </Link>
                    <div className={styles.product__header}>
                        <span className={styles.product__title}>AIR MAX PEGASUS 37</span>
                        <span className={styles.product__price}>$189</span>
                    </div>
                    <div className={styles.product__subtitle}>Men’s Running shoe</div>
                    <div className={styles.product__description}>
                        An athletic shoe is a name for a shoe designed for sporting and physical activities, and is different in style.
                    </div>
                    <div className={styles.product__properties}>
                        {properties.map((property, i) => <PropertySelector property={property} key={'property-selector-'+i} />)}
                    </div>
                    <div className={styles.product__footer}>
                        <button className={styles.product__button}>
                            <BasketIcon /> Добавить в корзину
                        </button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetails;