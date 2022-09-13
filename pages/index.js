import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/pages/Home.module.scss'
import Header from "../components/header";
import Categories from "../components/categories";
import {Container} from "react-bootstrap";
import Footer from "../components/footer";
import Products from "../components/products";
import Filters from "../components/filters";
import {observer} from "mobx-react-lite";
import {useEffect, useMemo, useState} from "react";
import shop from "../store/shop";
import Carousel from "react-elastic-carousel";
import AwesomeSlider from 'react-awesome-slider';
import {$modules} from "../utils/config";
import {useModules} from "../hooks/useModules";
import Banner from "../components/Banner";

export default observer(() => {
    const [items, setItems] = useState(shop.products)
    const modules = useModules()

    useEffect(() => {
        setItems(shop.products)
    }, [shop.products])

    return (
        <>
           <div className={'wrapper'}>
               <Header/>

               <Container>
                   {modules.get($modules.banner) ? <Banner /> : null}

                   <Categories/>
                   <Filters/>

                   <Products items={items}/>
               </Container>
           </div>

            <Footer/>
        </>
    )
})