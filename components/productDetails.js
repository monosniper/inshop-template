import React, {useEffect, useMemo, useState} from 'react';
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
import {$modules} from "../utils/config";
import HeartIcon from "../public/assets/icons/heart.svg";
import HeartIconOutline from "../public/assets/icons/heart_outline.svg";
import {useModules} from "../hooks/useModules";
import CheckoutBtn from "./CheckoutBtn";
import auth from "../store/auth";
import {useShop} from "../hooks/useShop";
import {$routes} from "../http/routes";
import {observer} from "mobx-react-lite";
import ImageZoom from "./ImageZoom";
import shop from "../store/shop";

const ProductImage = ({ handleImageClick, src, mainSrc }) => {
    const [itemClass, setItemClass] = useState(styles.product__image)
    
    useEffect(() => {
        if(src === mainSrc) {
            setItemClass(styles.product__image + ' contrast_border ' + styles.active)
        } else {
            setItemClass(styles.product__image)
        }
    }, [mainSrc])
    
    return <div onClick={() => handleImageClick(src)}  className={itemClass}>
        <img src={src} alt="Item name"/>
    </div>;
}

ProductImage.propTypes = {src: PropTypes.string};

const PropertySelectorOption = ({ option, handleClick, title, selected }) => {
    return <span onClick={() => handleClick(title, option)} className={styles['property-selector__option'] + ' ' + (selected === option ? styles.active : '')}>{option}</span>;
}

const PropertySelector = ({ property, handleClick, selected }) => {
    const { t, i18n } = useTranslation();

    return <div style={{marginBottom: '.5rem'}}>
        <b>{property.title}:</b>
        <span style={{marginLeft: '10px'}}>
            {property.options.join(', ')}
        </span>
    </div>;

    return <div className={styles['property-selector']}>
        <span className={styles['property-selector__name']}>{t('choose')} {property.title}</span>
        <div className={styles['property-selector__options']}>
            {property.options.map((option, i) => <PropertySelectorOption
                handleClick={handleClick}
                title={property.title}
                option={option}
                key={'property-option-'+i}
                selected={selected}
            />)}
        </div>
    </div>;
}

const ProductDetails = (props) => {
    const {
        id,
        title,
        price,
        subtitle,
        category,
        description,
        images,
        discount,
        properties,
    } = props

    const router = useRouter()
    const modules = useModules()
    const isMobile = useIsMobile()
    const { t, i18n } = useTranslation();
    const shopData = useShop()
    const [mainImage, setMainImage] = useState(undefined)
    const [selectedProps, setSelectedProps] = useState([])

    useEffect(() => {
        if(properties) {
            setSelectedProps(properties.map(prop => {
                return {
                    title: prop.title,
                    value: null
                }
            }))
        }
    }, [properties])

    const handleImageClick = (src) => {
        setMainImage(src)
    }

    const handleBasketClick = () => {
        auth.isAuthorized ? basket.addItem(id, props, 1, selectedProps) : auth.openLogin()
    }

    const handleBuyClick = () => {
        shop.setSelectedProps({
            id,
            properties: selectedProps
        })
        router.push($routes.checkout + ('?product_id='+id))
    }

    const handleSelectProperty = (title, value) => {
        if(selectedProps) {
            setSelectedProps(selectedProps.map(prop => {
                if(prop.title === title) prop.value = value
                return prop;
            }))
        }
    }

    useEffect(() => {
        if(images) {
            setMainImage(images[0])
        }
    }, [images])

    function getSelected(title) {
        const prop = selectedProps.find(prop => prop.title === title);

        return prop ? prop.value : null;
    }

    return id ? (
        <div className={styles.product + ' white-block'}>
            <Row>
                <Col>
                    <div className={styles.product__left}>
                        {images && <Carousel className={styles.product__slider} verticalMode={!isMobile} pagination={false}
                                   showArrows={false} itemsToShow={4}>
                            {images.map((src, i) => <ProductImage mainSrc={mainImage}
                                                                  handleImageClick={handleImageClick} key={'image-' + i}
                                                                  src={src}/>)}
                        </Carousel>}
                        <div className={styles.product__current + ' zoom'}>
                            {modules.get($modules.image_zoom) ? (mainImage ? <ImageZoom
                                src={mainImage}
                                alt={'Item name'}
                            /> : null) : <img src={mainImage} alt="Item name"/>}
                        </div>
                    </div>
                </Col>
                <Col>
                    <Link href={'/?category=category_name'}>
                        <div className={styles.product__category}>{category}</div>
                    </Link>
                    <div className={styles.product__header}>
                        <span className={styles.product__title}>{title}</span>
                        <span className={styles.product__price + ' contrast'}>
                            {discount ? <span className={'discount contrast_bg'}>-{discount}%</span> : null}
                            {discount ? price - (price / 100 * discount) : price}{shopData.currency}
                        </span>
                    </div>
                    <div className={styles.product__subtitle}>{subtitle}</div>
                    <div className={styles.product__description}>
                        {description}
                    </div>
                    <div className={styles.product__properties}>
                        {properties.map((property, i) => <PropertySelector selected={getSelected(property.title)} handleClick={handleSelectProperty} property={property} key={'property-selector-'+i} />)}
                    </div>
                    <div className={styles.product__footer}>
                        {modules.get($modules.basket) && auth.isAuthorized ? (basket.hasItem(id) ? <Link href={$routes.basket}>
                            <button className={styles.product__button + ' contrast_bg'}>
                                {t('go to basket')}
                            </button>
                        </Link> : <button onClick={handleBasketClick} className={styles.product__button + ' contrast_bg'}>
                            <BasketIcon /> {t('add to basket')}
                        </button>) : <button onClick={handleBuyClick} className={'button button_lg'}>{t('buy')}</button>}
                    </div>
                </Col>
            </Row>
        </div>
    ) : null;
};

export default observer(ProductDetails);