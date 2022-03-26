import React, {useEffect, useState} from 'react';
import PrevIcon from '../public/assets/icons/prev.svg';
import NextIcon from '../public/assets/icons/next.svg';
import styles from '../styles/components/Pagination.module.scss'
import {useRouter} from "next/router";


const Page = (props) => {
    let text = ''
    let itemClass = styles.pagination__item + ' ' + styles.pagination__page

    if(props.page) {
        itemClass += ' ' + styles.pagination__page
        if (props.page === props.currentPage) itemClass += ' ' + styles.pagination__page_active

        text = props.page
    } else if(props.text) {
        text = props.text
    }

    const handleClick = () => {
        if(props.page) props.handlePageClick(props.page)
    }

    return (
        <span onClick={handleClick} className={itemClass}>{text}</span>
    );
};

function Pages({pages, currentPage, handlePageClick}) {
    const content = []
    let startDots = false
    let endDots = false

    content.push(
        <Page handlePageClick={handlePageClick} page={1} currentPage={currentPage} />
    )

    for (let i = 2; i < pages; i++) {
        if (i >= currentPage - 2 && i <= currentPage + 2) {
            content.push(
                <Page handlePageClick={handlePageClick} page={i} currentPage={currentPage} />
            )
        } else {
            if(i < currentPage - 2) {
                if(!startDots) {
                    content.push(
                        <Page handlePageClick={handlePageClick} text={'...'} currentPage={currentPage} />
                    )
                    startDots = true
                }
            } else {
                if(!endDots) {
                    content.push(
                        <Page handlePageClick={handlePageClick} text={'...'} currentPage={currentPage} />
                    )

                    endDots = true
                }
            }
        }
    }

    if (pages > 1) {
        content.push(
            <Page handlePageClick={handlePageClick} page={pages} currentPage={currentPage} />
        )
    }

    return content;
}

const Pagination = () => {
    
    const router = useRouter()
    const [pages, setPages] = useState(9)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const { page } = router.query

        page && setCurrentPage(parseInt(page))
    }, [router.query])

    const updateQuery = (page) => {
        router.push({
            pathname: '/',
            query: {
                ...router.query,
                page,
            }
        }, undefined, {scroll: false})
    }

    const updateCurrentPage = (page) => {
        setCurrentPage(page)
        updateQuery(page)
    }

    const handlePrevClick = () => {
        currentPage > 1 && updateCurrentPage(currentPage - 1)
    }

    const handleNextClick = () => {
        currentPage < pages && updateCurrentPage(currentPage + 1)
    }

    const handlePageClick = (page) => {
        updateCurrentPage(page)
    }

    return (
        <div className={styles.pagination__wrapper}>
            <div className={styles.pagination__items}>
                <span onClick={handlePrevClick}
                      className={styles.pagination__prev + ' ' + styles.pagination__item + ' ' + styles.pagination__arrow}><PrevIcon/></span>
                <Pages handlePageClick={handlePageClick} pages={pages} currentPage={currentPage}/>
                <span onClick={handleNextClick}
                      className={styles.pagination__next + ' ' + styles.pagination__item + ' ' + styles.pagination__arrow}><NextIcon/></span>
            </div>
        </div>
    );
};

export default Pagination;