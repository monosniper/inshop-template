import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/pages/Home.module.scss'
import Header from "../components/header";
import Categories from "../components/categories";
import {Container} from "react-bootstrap";
import Footer from "../components/footer";
import Products from "../components/products";
import Filters from "../components/filters";

export default function Home() {
    return (
        <>
            <Header/>

            <Container>
                <Categories/>
                <Filters/>

                <Products/>
            </Container>

            <Footer/>
        </>
    )
}
