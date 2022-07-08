import React, {useEffect, useRef, useState} from 'react';
import styles from '../styles/components/Filters.module.scss'
import SearchIcon from '../public/assets/icons/search.svg'
import CheckIcon from '../public/assets/icons/check.svg'
import FilterIcon from '../public/assets/icons/filter.svg'
import ReactModal from 'react-modal';
import {useRouter} from "next/router";
import shop from "../store/shop";
import {useTranslation} from "react-i18next";

function FilterItems() {
    const router = useRouter()
    const [sort, setSort] = useState('')
    const [price_from, setPriceFrom] = useState(0)
    const [price_to, setPriceTo] = useState(0)
    const [inStock, setInStock] = useState(false)
    const { t, i18n } = useTranslation();

    const sortOptions = [
        {
            value: 'newest',
            text: t('newest'),
        },
        {
            value: 'expensive',
            text: t('expensive'),
        },
        {
            value: 'cheaper',
            text: t('cheaper'),
        },
        {
            value: 'a-z',
            text: t('a-z'),
        },
        {
            value: 'z-a',
            text: t('z-a'),
        },
    ]

    // useEffect(() => {
    //     router.push({
    //         pathname: '/',
    //         query: {
    //             ...router.query,
    //             sort: e.target.value,
    //         }
    //     }, undefined, {scroll: false})
    // }, [])

    useEffect(() => {
        const { sort, price_from, price_to, inStock, category, q } = router.query
        if(sort) {
            setSort(sort)
        } else {
            shop.setFilter('sort', null)
        }
        if(price_from) {
            setPriceFrom(price_from)
        } else {
            shop.setFilter('price_from', null)
        }
        if(price_to) {
            setPriceTo(price_to)
        } else {
            shop.setFilter('price_to', null)
        }
        if(inStock) {
            setInStock(inStock === 'true')
        } else {
            shop.setFilter('inStock', null)
        }
        if(!q) {
            shop.setFilter('q', null)
        }
        if(!category) {
            shop.setFilter('category', null)
        }
    }, [router.query])

    const handleSortChange = (e) => {
        const value = e.target.value
        shop.setFilter('sort', value)
        setSort(value)
        router.push({
            pathname: '/',
            query: {
                ...router.query,
                sort: value,
            }
        }, undefined, {scroll: false})
    }

    const handlePriceFromChange = (e) => {
        const value = e.target.value
        shop.setFilter('price_from', value)
        setPriceFrom(value)
        router.push({
            pathname: '/',
            query: {
                ...router.query,
                price_from: value,
            }
        }, undefined, {scroll: false})
    }

    const handlePriceToChange = (e) => {
        const value = e.target.value
        shop.setFilter('price_to', value)
        setPriceTo(value)
        router.push({
            pathname: '/',
            query: {
                ...router.query,
                price_to: value,
            }
        }, undefined, {scroll: false})
    }

    const handleInStockClick = () => {
        shop.setFilter('inStock', !inStock)
        setInStock(!inStock)
        router.push({
            pathname: '/',
            query: {
                ...router.query,
                inStock: !inStock,
            }
        }, undefined, {scroll: false})
    }

    return (
        <div className={styles.filter__items}>
            <div className={styles.filter__item}>
                <span className={styles.filter__name}>{t('sorting')}</span>
                <select value={sort} className={'input'} onChange={handleSortChange}>
                    {sortOptions.map((option, i) => (
                        <option key={'sort-option-'+i} value={option.value}>{option.text}</option>
                    ))}
                </select>
            </div>
            <div className={styles.filter__item}>
                <span className={styles.filter__name}>{t('price')}</span>
                <input value={price_from} placeholder={t('from')} type="number" className={'input'}
                       onChange={handlePriceFromChange}/>
                <input value={price_to} placeholder={t('to')} type="number" className={'input'}
                       onChange={handlePriceToChange}/>
            </div>
            <div className={styles.filter__item}>
                <span onClick={handleInStockClick} className={styles.filter__name}>{t('in stock')}</span>
                <input
                    checked={inStock}
                    type="checkbox"
                    className={'input'}
                    onChange={handleInStockClick}
                />
                <span className={styles.filter__checkbox}><CheckIcon/></span>
            </div>
        </div>
    );
}

const Filters = () => {

    const router = useRouter()
    const [showFilterModal, setShowFilterModal] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const query = router.query.q;
        if(query) {
            setSearchQuery(query)
        } else {
            shop.setFilter('inStock', null)
        }
    }, [router.query])

    const handleOpenFilterModal = () => {
        setShowFilterModal(true)
    }

    const handleCloseFilterModal = () => {
        setShowFilterModal(false)
    }

    const handleSearch = (e) => {
        const value = e.target.value
        shop.setFilter('q', value)
        setSearchQuery(value)

        router.push({
            pathname: '/',
            query: {
                ...router.query,
                q: value
            }
        }, undefined, {scroll: false})
    }

    return (
        <div className={styles.filter__container}>
            <div className={styles.filter__left}>
                <div className={styles.filter__sm}>
                    <button onClick={handleOpenFilterModal} className={styles.filter__button + ' button'}>Фильтр <FilterIcon /></button>
                    <ReactModal
                        isOpen={showFilterModal}
                        contentLabel="Filter modal"
                        className={styles.filter__modal}
                        overlayClassName={styles.filter__overlay}
                    >
                        <br/>
                        <FilterItems />
                        <br/>

                        <button onClick={handleCloseFilterModal} className={styles.filter__button + ' button'}>Ок</button>
                    </ReactModal>
                </div>
                <div className={styles.filter__lg}>
                    <FilterItems />
                </div>
            </div>
            <div className={styles.filter__right}>
                <div className={styles.search}>
                    <input className={styles.search__input} type="text" onChange={handleSearch} value={searchQuery} placeholder={t('search')} />
                    <SearchIcon className={styles.search__icon}/>
                </div>
            </div>
        </div>
    );
};

export default Filters;