import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Header from "../../components/header";
import {Container} from "react-bootstrap";
import Footer from "../../components/footer";
import ProductHeader from "../../components/productHeader";
import ProductDetails from "../../components/productDetails";
import RelatedProducts from "../../components/relatedProducts";
import store from "../../store/store";
import Categories from "../../components/categories";
import Filters from "../../components/filters";
import Products from "../../components/products";

const Product = () => {
    const router = useRouter()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const {id} = router.query

        // setProduct(store.getProduct(id))
    }, [router.query])

    return (
        <>
            <div className={'wrapper'}>
                <Header/>

                <Container>
                    <ProductHeader/>
                    <ProductDetails/>

                    <RelatedProducts/>
                </Container>
            </div>

            <Footer/>
        </>
    );
};

export default Product;