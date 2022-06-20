import React, {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import Header from "../../components/header";
import {Container} from "react-bootstrap";
import Footer from "../../components/footer";
import ProductHeader from "../../components/productHeader";
import ProductDetails from "../../components/productDetails";
import RelatedProducts from "../../components/relatedProducts";
import shop from "../../store/shop";
import {observer} from "mobx-react-lite";

const Product = () => {
    const router = useRouter()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const {id} = router.query

        setProduct(shop.getProduct(id))
    }, [router.query])

    return (
        <>
            <div className={'wrapper'}>
                <Header/>

                <Container>
                    <ProductHeader {...product} />
                    <ProductDetails {...product} />

                    <RelatedProducts {...product} />
                </Container>
            </div>

            <Footer/>
        </>
    );
};

export default observer(Product);