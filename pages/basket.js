import React from 'react';
import Header from "../components/header";
import {Container} from "react-bootstrap";
import Categories from "../components/categories";
import Filters from "../components/filters";
import Products from "../components/products";
import Footer from "../components/footer";
import SubHeader from "../components/subHeader";
import BasketFooter from "../components/basketFooter";
import basket from "../store/basket";
import shop from "../store/shop";

const Basket = () => {
    return (
        <>
            <div className={'wrapper'}>
                <Header/>

                <Container>
                    <SubHeader text={'Корзина'} />

                    <Products items={basket.items.map(item => item.product)} />

                    <BasketFooter/>
                </Container>
            </div>

            <Footer/>
        </>
    );
};

export default Basket;