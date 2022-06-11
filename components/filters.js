import React, {useEffect, useRef, useState} from 'react';
import styles from '../styles/components/Filters.module.scss'
import SearchIcon from '../public/assets/icons/search.svg'
import CheckIcon from '../public/assets/icons/check.svg'
import FilterIcon from '../public/assets/icons/filter.svg'
import ReactModal from 'react-modal';
import {useRouter} from "next/router";

function FilterItems() {
    const router = useRouter()
    const [sort, setSort] = useState('')
    const [price_from, setPriceFrom] = useState(0)
    const [price_to, setPriceTo] = useState(0)
    const [inStock, setInStock] = useState(false)

    useEffect(() => {
        const { sort, price_from, price_to, inStock } = router.query

        setSort(sort)
        setPriceFrom(price_from)
        setPriceTo(price_to)
        setInStock(inStock === 'true')
    }, [router.query])

    const handleSortChange = (e) => {
        setSort(e.target.value)
        router.push({
            pathname: '/',
            query: {
                ...router.query,
                sort: e.target.value,
            }
        }, undefined, {scroll: false})
    }

    const handlePriceFromChange = (e) => {
        setPriceFrom(e.target.value)
        router.push({
            pathname: '/',
            query: {
                ...router.query,
                price_from: e.target.value,
            }
        }, undefined, {scroll: false})
    }

    const handlePriceToChange = (e) => {
        setPriceTo(e.target.value)
        router.push({
            pathname: '/',
            query: {
                ...router.query,
                price_to: e.target.value,
            }
        }, undefined, {scroll: false})
    }

    const handleInStockClick = () => {
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
                <span className={styles.filter__name}>Сортировка</span>
                <select value={sort} className={'input'} onChange={handleSortChange}>
                    <option value="newest">Сначала новые</option>
                    <option value="expensive">Дороже</option>
                    <option value="cheapest">Дешевле</option>
                    <option value="a-z">Алфавит [а-я]</option>
                    <option value="z-a">Алфавит [я-а]</option>
                </select>
            </div>
            <div className={styles.filter__item}>
                <span className={styles.filter__name}>Цена</span>
                <input value={price_from} placeholder={'От'} type="number" className={'input'}
                       onChange={handlePriceFromChange}/>
                <input value={price_to} placeholder={'До'} type="number" className={'input'}
                       onChange={handlePriceToChange}/>
            </div>
            <div className={styles.filter__item}>
                <span onClick={handleInStockClick} className={styles.filter__name}>В наличии</span>
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

    useEffect(() => {
        setSearchQuery(router.query.q)
    }, [router.query])

    const handleOpenFilterModal = () => {
        setShowFilterModal(true)
    }

    const handleCloseFilterModal = () => {
        setShowFilterModal(false)
    }

    const handleSearch = (e) => {
        setSearchQuery(e.target.value)

        router.push({
            pathname: '/',
            query: {
                ...router.query,
                q: e.target.value
            }
        }, undefined, {scroll: false})
    }

    return (
        <div className={styles.filter__container}>
            <div className={styles.filter__left}>
                <div className={styles.filter__sm}>
                    <button onClick={handleOpenFilterModal} className={styles.filter__button}>Фильтр <FilterIcon /></button>
                    <ReactModal
                        isOpen={showFilterModal}
                        contentLabel="Filter modal"
                        className={styles.filter__modal}
                        overlayClassName={styles.filter__overlay}
                    >
                        <FilterItems />

                        <button onClick={handleCloseFilterModal} className={styles.filter__button}>Ок</button>
                    </ReactModal>
                </div>
                <div className={styles.filter__lg}>
                    <FilterItems />
                </div>
            </div>
            <div className={styles.filter__right}>
                <div className={styles.search}>
                    <input className={styles.search__input} type="text" onChange={handleSearch} value={searchQuery} placeholder={'Поиск'}/>
                    <SearchIcon className={styles.search__icon}/>
                </div>
            </div>
        </div>
    );
};

export default Filters;