import React, {useEffect} from 'react';
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
import {useTranslation} from "react-i18next";
import {useModules} from "../hooks/useModules";
import {$modules} from "../utils/config";
import {$routes} from "../http/routes";
import {useRouter} from "next/router";
import {observer} from "mobx-react-lite";

const Basket = () => {
    const { t, i18n } = useTranslation();
    const modules = useModules()
    const router = useRouter()

    useEffect(() => {
        if(!modules.get($modules.basket)) router.push($routes.index)
    }, [])

    return (
        <>
            <div className={'wrapper'}>
                <Header/>

                <Container>
                    <SubHeader text={t('basket')} />

                    <Products items={basket.items.map(item => item.product)} />

                    <BasketFooter/>
                </Container>
            </div>

            <Footer/>
        </>
    );
};

export default observer(Basket);