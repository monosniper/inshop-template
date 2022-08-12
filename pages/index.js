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
import {useEffect, useState} from "react";
import shop from "../store/shop";

export default observer(() => {
    const [items, setItems] = useState(shop.products)

    // useEffect(() => {
    //     shop.requestProducts().then(() => {
    //         setItems(shop.products)
    //     })
    // }, [])

    useEffect(() => {
        setItems(shop.products)
    }, [shop.products])

    return (
        <>
           <div className={'wrapper'}>
               <Header/>

               <Container>
                   <Categories/>
                   <Filters/>

                   <Products items={items}/>
               </Container>
           </div>

            <Footer/>
        </>
    )
})