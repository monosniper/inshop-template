import React, {useEffect, useState} from 'react';
import styles from '../styles/components/ProductDetails.module.scss'
import {useRouter} from "next/router";
import Link from 'next/link'
import BasketIcon from '../public/assets/icons/cart.svg';
import {ScrollingCarousel} from "@trendyol-js/react-carousel";
import * as PropTypes from "prop-types";
import {Col, Row} from "react-bootstrap";
import Carousel from 'react-elastic-carousel'
import basket from "../store/basket";
import {useTranslation} from "react-i18next";
import {useIsMobile} from "../hooks/useIsMobile";

const ProductImage = ({ handleImageClick, src, mainSrc }) => {
    const [itemClass, setItemClass] = useState(styles.product__image)
    
    useEffect(() => {
        if(src === mainSrc) {
            setItemClass(styles.product__image + ' ' + styles.active)
        } else {
            setItemClass(styles.product__image)
        }
    }, [mainSrc])
    
    return <div onClick={() => handleImageClick(src)}  className={itemClass}>
        <img src={src} alt="Item name"/>
    </div>;
}

ProductImage.propTypes = {src: PropTypes.string};

const PropertySelectorOption = ({ option, handleClick }) => {
    return <span onClick={() => handleClick(option.value)} className={styles['property-selector__option']}>{option.name}</span>;
}
const PropertySelector = ({ property }) => {
    const { t, i18n } = useTranslation();

    return <div className={styles['property-selector']}>
        <span className={styles['property-selector__name']}>{t('choose')} {property.name}</span>
        <div className={styles['property-selector__options']}>
            {property.options.map((option, i) => <PropertySelectorOption option={option} key={'property-option-'+i} />)}
        </div>
    </div>;
}
const ProductDetails = (product) => {
    const {
        id, title, price, subtitle, category, description
    } = product

    const router = useRouter()
    const isMobile = useIsMobile()
    const { t, i18n } = useTranslation();

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
    const [mainImage, setMainImage] = useState(images[0])
    const properties = [
        {
            name: '????????????',
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

    const handleImageClick = (src) => {
        setMainImage(src)
    }

    const handleBasketClick = () => {
        basket.addItem(id, product)
    }

    return (
        <div className={styles.product + ' white-block'}>
            <Row>
                <Col>
                    <div className={styles.product__left}>
                        <Carousel className={styles.product__slider} verticalMode={!isMobile} pagination={false} showArrows={false} itemsToShow={4}>
                            {images.map((src, i) => <ProductImage mainSrc={mainImage} handleImageClick={handleImageClick} key={'image-'+i} src={src} />)}
                        </Carousel>
                        <div className={styles.product__current}>
                            <img src={mainImage} alt="Item name"/>
                        </div>
                    </div>
                </Col>
                <Col>
                    <Link href={'/?category=category_name'}>
                        <div className={styles.product__category}>{category}</div>
                    </Link>
                    <div className={styles.product__header}>
                        <span className={styles.product__title}>{title}</span>
                        <span className={styles.product__price}>${price}</span>
                    </div>
                    <div className={styles.product__subtitle}>{subtitle}</div>
                    <div className={styles.product__description}>
                        {description}
                    </div>
                    <div className={styles.product__properties}>
                        {properties.map((property, i) => <PropertySelector property={property} key={'property-selector-'+i} />)}
                    </div>
                    <div className={styles.product__footer}>
                        <button onClick={handleBasketClick} className={styles.product__button}>
                            <BasketIcon /> {t('add to basket')}
                        </button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default ProductDetails;