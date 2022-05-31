import React, {useEffect, useState} from 'react';
import Category from "./category";
import styles from '../styles/components/Categories.module.scss'
import {ScrollingCarousel} from "@trendyol-js/react-carousel";
import {useCategories} from "../hooks/useCategories";
import ContentLoader from "react-content-loader";
import {observer} from "mobx-react-lite";

function LoaderBoxes() {
    const rects_count = 16
    const rects = []

    for(let i=1;i<rects_count;i++) {
        rects.push(<rect x={(70+10)*i} y="0" rx="5" ry="5" width="70" height="48" />)
    }

    return <ContentLoader
        height={70}
        viewBox="0 0 2000 70"
        backgroundColor={'#e9e9e9'}
        foregroundColor={'#d5d5d5'}
    >
        <rect x="0" y="0" rx="5" ry="5" width="70" height="48"/>
        {rects}
    </ContentLoader>;
}

const Categories = () => {

    const categories = useCategories()

    return (
        <ScrollingCarousel className={styles.categories}>
            {categories ? categories.map((category, i) => <Category key={'category-'+i} category={category} />) : <LoaderBoxes />}
        </ScrollingCarousel>
    );
};

export default observer(Categories);