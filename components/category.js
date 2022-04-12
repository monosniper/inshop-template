import React, {useEffect, useState} from 'react';
import styles from '../styles/components/Categories.module.scss'
import Image from "next/image";
import {useRouter} from "next/router";

const Category = (props) => {

    const router = useRouter()
    const [active, setActive] = useState(false)
    const [itemClass, setItemClass] = useState(styles.category)

    useEffect(() => {
        const {category} = router.query;

        if (category && category === props.category.id + '') {
            setActive(true)
        } else {
            setActive(false)
        }
    }, [router.query])

    useEffect(() => {
        if (active) {
            setItemClass(styles.category + ' ' + styles.category_active)
        } else {
            setItemClass(styles.category)
        }
    }, [active])

    const handleClick = () => {
        router.push({
            pathname: '/',
            query: {
                ...router.query,
                category: props.category.id,
            }
        })
    }

    return (
        <div onClick={handleClick} className={itemClass}>
            <div className={styles.category__icon}>
                <Image
                    src={'/assets/images/categories/' + props.category.id + '.png'}
                    width={40}
                    height={40}
                    alt={'Category name'}
                />
            </div>
            <div className={styles.category__name}>{props.category.name}</div>
        </div>
    );
};

export default Category;