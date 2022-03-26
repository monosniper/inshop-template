import React, {useState} from 'react';
import Category from "./category";
import styles from '../styles/components/Categories.module.scss'
import {ScrollingCarousel} from "@trendyol-js/react-carousel";

const Categories = () => {

    const [categories, setCategories] = useState([
        {
            id: 1,
            name: 'Кроссовки'
        },
        {
            id: 2,
            name: 'Свитшоты'
        },
        {
            id: 3,
            name: 'Рубашки'
        },
        {
            id: 4,
            name: 'Футболки'
        },
        {
            id: 1,
            name: 'Кроссовки'
        },
        {
            id: 2,
            name: 'Свитшоты'
        },
        {
            id: 3,
            name: 'Рубашки'
        },
        {
            id: 4,
            name: 'Футболки'
        },
        {
            id: 1,
            name: 'Кроссовки'
        },
        {
            id: 2,
            name: 'Свитшоты'
        },
        {
            id: 3,
            name: 'Рубашки'
        },
        {
            id: 4,
            name: 'Футболки'
        },
        {
            id: 1,
            name: 'Кроссовки'
        },
        {
            id: 2,
            name: 'Свитшоты'
        },
        {
            id: 3,
            name: 'Рубашки'
        },
        {
            id: 4,
            name: 'Футболки'
        },
    ])

    return (
        <ScrollingCarousel className={styles.categories}>
            {categories.map((category, i) => <Category key={'category-'+i} category={category} />)}
        </ScrollingCarousel>
    );
};

export default Categories;