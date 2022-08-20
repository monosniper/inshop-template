import React, {useMemo} from 'react';
import Head from "next/head";
import Header from "../components/header";
import {Container} from "react-bootstrap";
import PageLoader from "../components/PageLoader";
import Footer from "../components/footer";
import {observer} from "mobx-react-lite";
import shop from "../store/shop";
import Review from "../components/Review";
import {useTranslation} from "react-i18next";

const Reviews = () => {
    const reviews = useMemo(() => shop.reviews, [shop.reviews])

    return (
        <>
            <Head>
                <title>Отзывы</title>
            </Head>

            <div className={'wrapper'}>
                <Header/>

                <Container>
                    <div className={'white-block custom-page-block'}>
                        <h1 style={{marginBottom: '.5rem'}}>Отзывы</h1>
                        {reviews.map((review, i) => <Review key={'review-'+i} review={review} />)}
                    </div>
                </Container>
            </div>

            <Footer/>
        </>
    );
};

export default observer(Reviews);